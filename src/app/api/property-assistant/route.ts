import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { setTimeout } from 'timers/promises';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const PROPERTY_ASSISTANT_PROMPT = `You are a real estate expert assistant helping users create compelling property listings. You should:

1. Generate engaging property descriptions based on basic property details
2. Suggest relevant property highlights with appropriate emoji icons
3. Provide professional, marketing-focused content
4. Keep descriptions concise but compelling
5. Focus on benefits and unique selling points

When suggesting highlights, always include an appropriate emoji icon that matches the highlight content. Use emojis like:
- 🏠 for home/property related
- 📍 for location/area related  
- 🌟 for premium/luxury features
- 🏢 for modern/contemporary
- 🔒 for security features
- 🚗 for parking/transport
- 🏊 for amenities like pool
- 🏋️ for fitness facilities
- 🌳 for green spaces
- 💰 for investment potential
- 🔗 for connectivity
- 🏆 for awards/recognition

Respond in JSON format for structured data.`;

export async function POST(request: NextRequest) {
  try {
    const { type, propertyData, highlightTitle, highlightIndex } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    let prompt = PROPERTY_ASSISTANT_PROMPT;

    switch (type) {
      case 'generate_description':
        prompt += `\n\nGenerate a compelling property description for:
        - Title: ${propertyData.title}
        - Price: ${propertyData.price}
        - Location: ${propertyData.address}
        - Beds: ${propertyData.beds}
        - Baths: ${propertyData.baths}
        - Area: ${propertyData.area} sq ft
        
        Create a marketing-focused description that highlights the key benefits and appeals to potential buyers. Keep it between 100-200 words.`;
        break;

      case 'generate_highlights':
        prompt += `\n\nBased on this property information, suggest 5-7 compelling highlights:
        - Title: ${propertyData.title}
        - Price: ${propertyData.price}
        - Location: ${propertyData.address}
        - Beds: ${propertyData.beds}
        - Baths: ${propertyData.baths}
        - Area: ${propertyData.area} sq ft
        
        For each highlight, provide:
        - An appropriate emoji icon
        - A catchy title (2-4 words)
        - A brief description (1-2 sentences)
        
        Focus on unique selling points, amenities, location benefits, and investment potential.`;
        break;

      case 'generate_highlight_title':
        prompt += `\n\nGenerate a catchy highlight title (2-4 words) for highlight #${highlightIndex + 1} based on this property:
        - Title: ${propertyData.title}
        - Price: ${propertyData.price}
        - Location: ${propertyData.address}
        - Beds: ${propertyData.beds}
        - Baths: ${propertyData.baths}
        - Area: ${propertyData.area} sq ft
        
        The title should be:
        - Catchy and memorable (2-4 words)
        - Focus on a unique selling point
        - Appeal to potential buyers
        - Professional and marketing-focused
        
        Respond with just the title, no quotes or extra text.`;
        break;

      case 'generate_highlight_description':
        prompt += `\n\nGenerate a compelling description for a property highlight titled "${highlightTitle}" based on this property:
        - Title: ${propertyData.title}
        - Price: ${propertyData.price}
        - Location: ${propertyData.address}
        - Beds: ${propertyData.beds}
        - Baths: ${propertyData.baths}
        - Area: ${propertyData.area} sq ft
        
        The description should:
        - Be 1-2 sentences long
        - Explain the benefit of the highlight
        - Be compelling and marketing-focused
        - Appeal to potential buyers
        
        Respond with just the description, no quotes or extra text.`;
        break;

      case 'suggest_icon':
        prompt += `\n\nFor the highlight title "${highlightTitle}", suggest the most appropriate emoji icon from this list:
        🏠 (Home/Property), 📍 (Location), 🌟 (Premium), 🏢 (Modern), 🔒 (Secure), 🚗 (Parking), 🏊 (Pool), 🏋️ (Gym), 🌳 (Garden), 💰 (Investment), 🔗 (Connectivity), 🏆 (Award)
        
        Choose the icon that best represents the highlight title. Respond with just the emoji.`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }

    // Implement retry logic with exponential backoff
    let result;
    let retries = 0;
    const maxRetries = 3;
    const baseDelay = 2000; // Start with 2 seconds
    
    while (retries <= maxRetries) {
      try {
        result = await model.generateContent(prompt);
        break; // Success, exit the loop
      } catch (error: any) {
        // Check if it's a rate limit error (429)
        if (error.status === 429) {
          retries++;
          if (retries > maxRetries) {
            throw error; // Max retries reached, rethrow the error
          }
          
          // Get retry delay from error if available, or use exponential backoff
          let delay = baseDelay * Math.pow(2, retries - 1); // Exponential backoff
          
          // Try to extract retry delay from error if available
          const retryDelayMatch = error.message?.match(/retryDelay:"(\d+)s"/i);
          if (retryDelayMatch && retryDelayMatch[1]) {
            delay = parseInt(retryDelayMatch[1]) * 1000; // Convert seconds to milliseconds
          }
          
          console.log(`Rate limit hit. Retrying in ${delay/1000} seconds... (Attempt ${retries}/${maxRetries})`);
          await setTimeout(delay);
        } else {
          throw error; // Not a rate limit error, rethrow
        }
      }
    }
    
    if (!result) {
      throw new Error('Failed to generate content after multiple retries');
    }
    
    const response = await result.response;
    const text = response.text();

    // For icon suggestions, return just the emoji
    if (type === 'suggest_icon') {
      const emojiMatch = text.match(/[🏠📍🌟🏢🔒🚗🏊🏋️🌳💰🔗🏆]/);
      return NextResponse.json({ 
        icon: emojiMatch ? emojiMatch[0] : '🏠',
        fullResponse: text 
      });
    }

    // For title and description generation, return the text directly
    if (type === 'generate_highlight_title') {
      return NextResponse.json({ 
        title: text.trim().replace(/^["']|["']$/g, '') // Remove quotes if present
      });
    }

    if (type === 'generate_highlight_description') {
      return NextResponse.json({ 
        description: text.trim().replace(/^["']|["']$/g, '') // Remove quotes if present
      });
    }

    // For other types, try to parse as JSON if possible
    try {
      const jsonResponse = JSON.parse(text);
      return NextResponse.json(jsonResponse);
    } catch {
      // If not valid JSON, return as plain text
      return NextResponse.json({ 
        content: text,
        type: type 
      });
    }

  } catch (error: any) {
    console.error('Property Assistant API error:', error);
    
    // Handle rate limit errors specifically
    if (error.status === 429) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again in a few moments.',
          retryAfter: error.message?.match(/retryDelay:"(\d+)s"/i)?.[1] || '10'
        },
        { status: 429 }
      );
    }
    
    // Handle other API errors
    return NextResponse.json(
      { 
        error: 'Sorry, I encountered an error. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: error.status || 500 }
    );
  }
}