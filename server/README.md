# QuoteAI Backend Server

This is the backend server for QuoteAI that handles:
- OpenAI API integration for quote generation
- Chat history management with Supabase
- Authentication via Supabase

## Environment Variables Required
- `OPENAI_API_KEY`: Your OpenAI API key
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key
- `PORT`: Server port (defaults to 3001)

## Deployment
1. Install dependencies: `npm install`
2. Start server: `npm start` 