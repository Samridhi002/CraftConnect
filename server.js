// Install required packages:
// npm install express dotenv openai

const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/ai-match', async (req, res) => {
  try {
    const { userPreferences } = req.body;

    const prompt = `Based on the following user preferences, suggest handmade products:
Category: ${userPreferences.category}
Price Range: ${userPreferences.priceRange}
Style: ${userPreferences.style}

Please provide 3 product suggestions in the following format:
1. [Product Name] - [Brief Description] - [Estimated Price]
2. [Product Name] - [Brief Description] - [Estimated Price]
3. [Product Name] - [Brief Description] - [Estimated Price]`;

    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const suggestions = response.data.choices[0].text.trim();
    res.json({ suggestions });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});