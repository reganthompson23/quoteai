import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize OpenAI client
let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error);
}

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// CORS Configuration
const corsOptions = {
  origin: ['https://pricepilot.chat', 'http://localhost:5173'],  // Allow your domain and localhost
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
};

// Apply CORS before any routes
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
}

// Auth middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the JWT with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error('Auth error:', error.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    // Get user's profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // Add profile data to the user object
    req.user = {
      ...user,
      profile
    };
    
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Quote generation endpoint
app.post('/quote/generate', authenticateToken, async (req, res) => {
  try {
    const { description, isPreview } = req.body;
    const businessId = req.user.id;

    if (!description) {
      console.error('No description provided in request body:', req.body);
      return res.status(400).json({ message: 'No description provided' });
    }

    // Get active pricing rules
    const { data: rules, error: rulesError } = await supabase
      .from('pricing_rules')
      .select('*')
      .eq('business_id', businessId)
      .eq('is_active', true);

    if (rulesError) {
      console.error('Error fetching rules:', rulesError);
      throw rulesError;
    }

    // Get past jobs
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (jobsError) {
      console.error('Error fetching jobs:', jobsError);
      throw jobsError;
    }

    // Format context for AI
    const context = {
      business: {
        name: req.user.profile.businessName,
        industry: req.user.profile.industry,
      },
      rules: rules.map(rule => ({
        title: rule.title,
        description: rule.description,
      })),
      recentJobs: jobs.map(job => ({
        title: job.title,
        description: job.description,
        price: job.price,
      })),
    };

    console.log('Generating quote with context:', {
      businessName: context.business.name,
      industry: context.business.industry,
      rulesCount: context.rules.length,
      jobsCount: context.recentJobs.length,
      description,
      isPreview
    });

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional estimator for ${context.business.name}, a ${context.business.industry} business. Use the following pricing rules and recent job history to provide accurate quotes:

Rules:
${context.rules.map(r => `- ${r.title}: ${r.description}`).join('\n')}

Recent Jobs:
${context.recentJobs.map(j => `- ${j.title} ($${j.price}): ${j.description}`).join('\n')}

Be friendly and professional. Ask clarifying questions if needed. Focus on understanding the customer's needs before providing estimates.`
        },
        {
          role: "user",
          content: description
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content;
    console.log('Generated response:', aiResponse);

    let chatId = null;

    // Only save chat if it's not from the preview widget
    if (!isPreview) {
      // Save chat to Supabase
      const { data: chat, error: chatError } = await supabase
        .from('chats')
        .insert([
          {
            business_id: businessId,
            messages: [
              { role: 'user', content: description },
              { role: 'assistant', content: aiResponse }
            ],
            summary: description.slice(0, 100) + (description.length > 100 ? '...' : ''),
            contact_name: null,
            contact_email: null,
            contact_phone: null,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (chatError) {
        console.error('Error saving chat:', chatError);
        throw chatError;
      }

      chatId = chat.id;
    }

    res.json({
      message: aiResponse,
      role: "assistant",
      chatId
    });

  } catch (error) {
    console.error('Quote generation error:', error);
    res.status(500).json({ 
      message: 'Failed to generate quote',
      error: error.message 
    });
  }
});

// Get all chats for a business
app.get('/chats', authenticateToken, async (req, res) => {
  try {
    const businessId = req.user.id;

    const { data: chats, error } = await supabase
      .from('chats')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }

    res.json(chats);
  } catch (error) {
    console.error('Failed to fetch chats:', error);
    res.status(500).json({ message: 'Failed to fetch chats' });
  }
});

// Get a single chat
app.get('/chats/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.id;

    const { data: chat, error } = await supabase
      .from('chats')
      .select('*')
      .eq('id', id)
      .eq('business_id', businessId)
      .single();

    if (error) {
      console.error('Error fetching chat:', error);
      throw error;
    }

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json(chat);
  } catch (error) {
    console.error('Failed to fetch chat:', error);
    res.status(500).json({ message: 'Failed to fetch chat' });
  }
});

// Update chat contact info
app.put('/chats/:id/contact', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.id;
    const { contactName, contactEmail, contactPhone } = req.body;

    const { data: chat, error } = await supabase
      .from('chats')
      .update({
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('business_id', businessId)
      .select()
      .single();

    if (error) {
      console.error('Error updating chat:', error);
      throw error;
    }

    res.json(chat);
  } catch (error) {
    console.error('Failed to update chat:', error);
    res.status(500).json({ message: 'Failed to update chat' });
  }
});

// Delete a chat
app.delete('/chats/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.id;

    const { error } = await supabase
      .from('chats')
      .delete()
      .eq('id', id)
      .eq('business_id', businessId);

    if (error) {
      console.error('Error deleting chat:', error);
      throw error;
    }

    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Failed to delete chat:', error);
    res.status(500).json({ message: 'Failed to delete chat' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});