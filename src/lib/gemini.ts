import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async generateProjectDescription(data: {
    title: string;
    category: string;
    address: string;
    unitTypes?: string[];
    amenities?: string[];
  }): Promise<string> {
    const prompt = `
Generate a compelling and professional project description for a real estate development with the following details:

Project Name: ${data.title}
Category: ${data.category}
Location: ${data.address}
Unit Types: ${data.unitTypes?.join(', ') || 'Mixed use'}
Amenities: ${data.amenities?.join(', ') || 'Premium facilities'}

Please write a 150-200 word description that:
1. Highlights the project's unique features
2. Mentions the prime location advantages
3. Appeals to potential buyers/investors
4. Uses professional real estate language
5. Includes mention of amenities and unit types

Format as a single paragraph with natural flow.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'Premium development offering modern living spaces with world-class amenities in a prime location.';
    }
  }

  async generateHighlights(data: {
    category: string;
    location: string;
    unitTypes?: string[];
    amenities?: string[];
  }): Promise<Array<{ label: string; icon: string }>> {
    const prompt = `
Generate 6-8 key highlights for a ${data.category} real estate project located at ${data.location}.

Consider:
- Unit types: ${data.unitTypes?.join(', ') || 'Mixed use'}
- Amenities: ${data.amenities?.join(', ') || 'Premium facilities'}

Return the response as JSON array with objects containing:
- label: Short highlight text (max 4 words)
- icon: Appropriate emoji icon

Example format:
[
  {"label": "Prime Location", "icon": "📍"},
  {"label": "Metro Connectivity", "icon": "🚇"}
]

Focus on location advantages, connectivity, amenities, and investment potential.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback highlights
      return [
        { label: "Prime Location", icon: "📍" },
        { label: "Modern Design", icon: "🏢" },
        { label: "Premium Amenities", icon: "⭐" },
        { label: "Great Connectivity", icon: "🚇" }
      ];
    } catch (error) {
      console.error('Gemini API error:', error);
      return [
        { label: "Prime Location", icon: "📍" },
        { label: "Modern Design", icon: "🏢" },
        { label: "Premium Amenities", icon: "⭐" },
        { label: "Great Connectivity", icon: "🚇" }
      ];
    }
  }

  async generateFAQs(data: {
    title: string;
    category: string;
    unitTypes?: string[];
  }): Promise<Array<{ question: string; answer: string }>> {
    const prompt = `
Generate 8-10 frequently asked questions and answers for a ${data.category} real estate project named "${data.title}".

Consider these unit types: ${data.unitTypes?.join(', ') || 'Mixed use'}

Cover topics like:
- Pricing and payment plans
- Possession timeline
- Amenities and facilities
- Location advantages
- Investment potential
- Legal documentation
- Construction quality
- Maintenance and charges

Return as JSON array:
[
  {"question": "What are the payment plans available?", "answer": "We offer flexible payment plans..."}
]

Keep answers professional, informative, and 2-3 sentences each.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback FAQs
      return [
        {
          question: "What are the payment plans available?",
          answer: "We offer flexible payment plans including construction linked plans and down payment schemes. Our team can customize a plan based on your requirements."
        },
        {
          question: "When is the expected possession?",
          answer: "The project is expected to be ready for possession as per the timeline mentioned in the agreement. Regular updates are provided to all buyers."
        }
      ];
    } catch (error) {
      console.error('Gemini API error:', error);
      return [
        {
          question: "What are the payment plans available?",
          answer: "We offer flexible payment plans including construction linked plans and down payment schemes."
        }
      ];
    }
  }

  async generateAmenities(category: string): Promise<Array<{ category: string; name: string; details: string }>> {
    const prompt = `
Generate 10-12 amenities for a ${category} real estate project.

Return as JSON array:
[
  {"category": "Recreation", "name": "Swimming Pool", "details": "Olympic-size swimming pool with separate kids section"}
]

Categories to use: Recreation, Security, Parking, Lifestyle, Business, Wellness, Convenience, Technology

Make amenities relevant to ${category} projects.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback amenities
      return [
        { category: "Security", name: "24x7 Security", details: "Round-the-clock security with CCTV surveillance" },
        { category: "Parking", name: "Ample Parking", details: "Dedicated parking spaces for all units" }
      ];
    } catch (error) {
      console.error('Gemini API error:', error);
      return [
        { category: "Security", name: "24x7 Security", details: "Round-the-clock security with CCTV surveillance" }
      ];
    }
  }
}

export const geminiService = new GeminiService();
