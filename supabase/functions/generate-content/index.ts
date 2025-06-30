
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = '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';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type = 'content', industry, jobTitle, experience } = await req.json();
    
    console.log('Request received:', { prompt, type, industry, jobTitle, experience });

    let systemPrompt = '';
    
    if (type === 'ideas') {
      systemPrompt = `You are a LinkedIn content strategist. Generate 5-7 engaging post ideas based on the user's profile and prompt. Consider their industry (${industry || 'general'}), job title (${jobTitle || 'professional'}), and experience level (${experience || 'general'}).

Format your response as a JSON array of objects with this structure:
[
  {
    "title": "Post title here",
    "description": "Brief description of the post idea",
    "contentType": "Article/Poll/Story/Tips",
    "engagement": "High/Medium/Low"
  }
]

Make the ideas specific, actionable, and relevant to their field.`;
    } else {
      systemPrompt = `You are a professional LinkedIn content creator. Create engaging, professional LinkedIn posts that drive engagement and provide value. Consider the user's background: industry (${industry || 'general'}), job title (${jobTitle || 'professional'}), experience (${experience || 'general'}).

Guidelines:
- Keep posts between 150-300 words for optimal engagement
- Use a conversational yet professional tone
- Include relevant hashtags (3-5 maximum)
- Structure with clear paragraphs or bullet points
- Add a call-to-action when appropriate
- Make it authentic and valuable to the audience`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenAI');
    }

    const generatedContent = data.choices[0].message.content;

    if (type === 'ideas') {
      try {
        const ideas = JSON.parse(generatedContent);
        return new Response(JSON.stringify({ ideas }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Failed to parse ideas JSON:', parseError);
        return new Response(JSON.stringify({ 
          ideas: [{ 
            title: "Content Ideas", 
            description: generatedContent, 
            contentType: "General", 
            engagement: "Medium" 
          }] 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new Response(JSON.stringify({ content: generatedContent }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate content. Please try again.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
