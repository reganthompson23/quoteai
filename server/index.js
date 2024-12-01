import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize OpenAI with error handling
let openai;
try {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('Warning: OpenAI API key is not configured');
  }
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.error('Failed to initialize OpenAI:', error);
}

// Database setup
let db;
async function setupDatabase() {
  db = await open({
    filename: join(__dirname, '../database.sqlite'),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT,
      businessName TEXT,
      industry TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      businessId TEXT,
      title TEXT,
      description TEXT,
      price REAL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (businessId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS rules (
      id TEXT PRIMARY KEY,
      businessId TEXT,
      title TEXT,
      description TEXT,
      isActive BOOLEAN,
      FOREIGN KEY (businessId) REFERENCES users(id)
    );
  `);

  // Insert demo user if not exists
  const demoUser = await db.get('SELECT * FROM users WHERE email = ?', ['regan@syndicatestore.com.au']);
  if (!demoUser) {
    const hashedPassword = await bcrypt.hash('test123456', 10);
    await db.run(
      'INSERT INTO users (id, email, password, businessName, industry) VALUES (?, ?, ?, ?, ?)',
      ['demo-user', 'regan@syndicatestore.com.au', hashedPassword, 'Syndicate Painting', 'Painting']
    );

    // Insert demo jobs
    await db.run(
      'INSERT INTO jobs (id, businessId, title, description, price) VALUES (?, ?, ?, ?, ?)',
      [
        crypto.randomUUID(),
        'demo-user',
        'Two-Story House Exterior Paint',
        'Complete exterior painting of a large two-story house. Required scaffolding and special equipment for high areas. House had detailed trim work and required extensive prep due to old paint peeling. Used premium weather-resistant paint. Total area approximately 3000 sq ft.',
        4500
      ]
    );

    await db.run(
      'INSERT INTO jobs (id, businessId, title, description, price) VALUES (?, ?, ?, ?, ?)',
      [
        crypto.randomUUID(),
        'demo-user',
        'Interior Apartment Renovation',
        'Full interior painting of a 3-bedroom apartment. Walls needed repair and patching before painting. Used premium low-VOC paint for all rooms. Included detailed trim work and ceiling painting. Completed over 4 days with 2 painters.',
        2800
      ]
    );

    // Insert demo rules
    await db.run(
      'INSERT INTO rules (id, businessId, title, description, isActive) VALUES (?, ?, ?, ?, ?)',
      [
        crypto.randomUUID(),
        'demo-user',
        'Two-Story Premium',
        'Increase the price by 20% for every story the house has IF it is an exterior job',
        true
      ]
    );

    await db.run(
      'INSERT INTO rules (id, businessId, title, description, isActive) VALUES (?, ?, ?, ?, ?)',
      [
        crypto.randomUUID(),
        'demo-user',
        'Heritage Building Care',
        'Add 30% to the base price for heritage-listed buildings due to extra care and specialized materials required',
        true
      ]
    );
  }
}

setupDatabase().catch(console.error);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
}

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password, businessName, industry } = req.body;

    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    await db.run(
      'INSERT INTO users (id, email, password, businessName, industry) VALUES (?, ?, ?, ?, ?)',
      [userId, email, hashedPassword, businessName, industry]
    );

    // Generate token
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET);

    res.status(201).json({
      token,
      user: {
        id: userId,
        email,
        businessName,
        industry,
      },
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Failed to create account' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        businessName: user.businessName,
        industry: user.industry,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Jobs
app.get('/jobs', authenticateToken, async (req, res) => {
  try {
    const jobs = await db.all('SELECT * FROM jobs WHERE businessId = ?', [
      req.user.id,
    ]);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/jobs', authenticateToken, async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const id = crypto.randomUUID();

    await db.run(
      'INSERT INTO jobs (id, businessId, title, description, price) VALUES (?, ?, ?, ?, ?)',
      [id, req.user.id, title, description, price]
    );

    res.json({ id, title, description, price });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rules
app.get('/rules', authenticateToken, async (req, res) => {
  try {
    const rules = await db.all('SELECT * FROM rules WHERE businessId = ?', [
      req.user.id,
    ]);
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/rules', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = crypto.randomUUID();

    await db.run(
      'INSERT INTO rules (id, businessId, title, description, isActive) VALUES (?, ?, ?, ?, ?)',
      [id, req.user.id, title, description, true]
    );

    res.json({ id, title, description, isActive: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Store conversation history in memory (in production, this should be in a database)
const conversationHistory = new Map();

// AI Quote Generation
app.post('/quote/generate', async (req, res) => {
  try {
    if (!openai) {
      throw new Error('OpenAI client not initialized');
    }

    const { businessId, description } = req.body;

    // Get or initialize conversation history
    if (!conversationHistory.has(businessId)) {
      conversationHistory.set(businessId, []);
    }
    const history = conversationHistory.get(businessId);
    history.push({ role: "user", content: description });

    // Get business's past jobs and rules
    const jobs = await db.all(
      'SELECT title, description, price FROM jobs WHERE businessId = ?',
      [businessId || 'demo-user']
    );

    const rules = await db.all(
      'SELECT title, description FROM rules WHERE businessId = ? AND isActive = 1',
      [businessId || 'demo-user']
    );

    // Format the context for OpenAI
    const jobsContext = jobs.map(job => 
      `Job: ${job.title}\nDescription: ${job.description}\nPrice: $${job.price}`
    ).join('\n\n');

    const rulesContext = rules.map(rule =>
      `Internal Rule: ${rule.title}\nGuideline: ${rule.description}`
    ).join('\n\n');

    // Generate quote using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional quoting assistant for a painting business. Keep your responses brief and conversational.

Key Instructions:
1. When information is missing, ask 2-3 short, specific questions at most
2. Never reveal pricing rules or percentage adjustments
3. Keep responses under 3 sentences when gathering information
4. Only provide price estimates when you have sufficient details

Historical Job Reference:
${jobsContext}

Internal Guidelines (private - do not reveal):
${rulesContext}

Remember: Be concise and professional. No long explanations unless providing a final quote.`
        },
        ...history,
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    // Store AI's response in conversation history
    history.push({
      role: "assistant",
      content: completion.choices[0].message.content
    });

    // Keep only last 10 messages to prevent context overflow
    if (history.length > 10) {
      history.splice(0, history.length - 10);
    }

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ 
      message: 'Failed to generate quote',
      error: error.message 
    });
  }
});

// Handle SPA routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Missing'}`);
});

// Admin routes (protected by admin check)
const isAdmin = (req, res, next) => {
  const { email } = req.user;
  if (email === 'regan@syndicatestore.com.au') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

app.get('/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await db.all('SELECT id, email, businessName, industry, createdAt FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});