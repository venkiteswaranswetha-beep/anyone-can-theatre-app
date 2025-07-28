import OpenAI from 'openai';

// Note: In production, use environment variables and secure API key management
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || 'your-openai-api-key-here';

export class SceneGenerator {
  static openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  static sceneDatabase = {
    solo: [
      {
        id: 'solo_1',
        title: 'The Phone Call',
        prompt: 'You just received a life-changing phone call. React to the news and show us your emotional journey.',
        duration: 90,
        difficulty: 'beginner',
        theme: 'drama',
        emotion: 'surprise'
      },
      {
        id: 'solo_2',
        title: 'Mirror Monologue',
        prompt: 'Look in the mirror and give yourself a pep talk before the biggest day of your life.',
        duration: 120,
        difficulty: 'beginner',
        theme: 'motivational',
        emotion: 'determination'
      },
      {
        id: 'solo_3',
        title: 'The Confession',
        prompt: 'You need to confess something important to someone you care about. Practice what you would say.',
        duration: 150,
        difficulty: 'intermediate',
        theme: 'relationship',
        emotion: 'vulnerability'
      }
    ],
    duo: [
      {
        id: 'duo_1',
        title: 'First Meeting',
        prompt: 'Two strangers meet in an unusual place. One has a secret that changes everything.',
        characters: ['Character A: Curious newcomer', 'Character B: Local with a secret'],
        duration: 180,
        difficulty: 'beginner',
        theme: 'mystery'
      },
      {
        id: 'duo_2',
        title: 'The Argument',
        prompt: 'Old friends disagree about a major life decision. Both believe they are right.',
        characters: ['Character A: The risk-taker', 'Character B: The cautious one'],
        duration: 200,
        difficulty: 'intermediate',
        theme: 'conflict'
      }
    ],
    group: [
      {
        id: 'group_1',
        title: 'The Heist Planning',
        prompt: 'Plan to steal something unusual and harmless (like stealing the show, or someone\\'s heart).',
        characters: ['The Mastermind', 'The Skeptic', 'The Enthusiast', 'The Wildcard'],
        duration: 300,
        difficulty: 'advanced',
        theme: 'comedy'
      }
    ]
  };

  static emotions = [
    'joy', 'anger', 'sadness', 'fear', 'surprise', 'disgust', 
    'love', 'excitement', 'nervousness', 'confidence', 'curiosity', 'frustration'
  ];

  static themes = [
    'family', 'work', 'romance', 'mystery', 'comedy', 'drama', 
    'adventure', 'friendship', 'conflict', 'celebration', 'loss', 'discovery'
  ];

  static characterTypes = [
    'hero', 'villain', 'mentor', 'comic relief', 'mysterious stranger', 
    'best friend', 'rival', 'wise elder', 'rebel', 'innocent'
  ];

  static async generateScene(mode = 'solo', theme = null, emotion = null, customPrompt = null) {
    try {
      if (customPrompt) {
        return await this.generateCustomScene(mode, customPrompt);
      }

      if (theme || emotion) {
        return await this.generateAIScene(mode, theme, emotion);
      }

      // Return random scene from database
      const availableScenes = this.sceneDatabase[mode] || this.sceneDatabase.solo;
      const randomScene = availableScenes[Math.floor(Math.random() * availableScenes.length)];
      
      return {
        ...randomScene,
        id: `${mode}_${Date.now()}`,
        generated: false,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Scene generation error:', error);
      return this.getFallbackScene(mode);
    }
  }

  static async generateAIScene(mode, theme, emotion) {
    const prompt = this.buildAIPrompt(mode, theme, emotion);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a creative theatre director helping people create engaging, accessible performance scenes. 
            Generate scenes that are fun, emotionally engaging, and suitable for all skill levels. 
            Always respond with a JSON object containing: title, prompt, duration, characters (if applicable), difficulty, theme, emotion.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 400,
        temperature: 0.8,
      });

      const aiResponse = response.choices[0].message.content;
      return this.parseAIResponse(aiResponse, mode);
    } catch (error) {
      console.error('AI generation error:', error);
      return this.createCustomScene(mode, theme, emotion);
    }
  }

  static async generateCustomScene(mode, customPrompt) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Create a ${mode} theatre scene based on the user's custom prompt. 
            Make it engaging and performable. Respond with JSON containing: title, prompt, duration, characters (if applicable), difficulty.`
          },
          {
            role: 'user',
            content: `Create a scene: ${customPrompt}`
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0].message.content;
      return this.parseAIResponse(aiResponse, mode, true);
    } catch (error) {
      console.error('Custom scene generation error:', error);
      return this.createSimpleCustomScene(mode, customPrompt);
    }
  }

  static buildAIPrompt(mode, theme, emotion) {
    let prompt = `Create a ${mode} theatre scene`;
    
    if (theme) prompt += ` with a ${theme} theme`;
    if (emotion) prompt += ` that explores the emotion of ${emotion}`;
    
    prompt += `. Requirements:
    - Compelling title (2-4 words)
    - Clear, engaging prompt (2-3 sentences)
    - Appropriate duration (${this.getDurationRange(mode)} seconds)
    - Difficulty level (beginner/intermediate/advanced)`;
    
    if (mode !== 'solo') {
      prompt += `\n- Character descriptions for each performer`;
    }
    
    prompt += `\n- Make it accessible for beginners but engaging for experienced performers
    - Focus on emotional truth and authentic moments
    - Provide specific actions or moments to focus on`;
    
    return prompt;
  }

  static parseAIResponse(response, mode, isCustom = false) {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(response);
      return {
        id: `ai_${Date.now()}`,
        ...parsed,
        mode,
        generated: true,
        custom: isCustom,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      // Fallback parsing for non-JSON responses
      return this.parseTextResponse(response, mode, isCustom);
    }
  }

  static parseTextResponse(response, mode, isCustom = false) {
    const lines = response.split('\\n').filter(line => line.trim());
    
    return {
      id: `ai_${Date.now()}`,
      title: this.extractTitle(lines) || `Custom ${mode} Scene`,
      prompt: this.extractPrompt(lines) || response.substring(0, 200),
      duration: this.getDefaultDuration(mode),
      difficulty: 'intermediate',
      mode,
      generated: true,
      custom: isCustom,
      createdAt: new Date().toISOString()
    };
  }

  static extractTitle(lines) {
    const titleLine = lines.find(line => 
      line.toLowerCase().includes('title') || 
      line.match(/^[A-Z][^.!?]*$/)
    );
    return titleLine ? titleLine.replace(/title:?/i, '').trim() : null;
  }

  static extractPrompt(lines) {
    const promptLine = lines.find(line => 
      line.toLowerCase().includes('prompt') || 
      line.length > 50
    );
    return promptLine ? promptLine.replace(/prompt:?/i, '').trim() : null;
  }

  static createCustomScene(mode, theme, emotion) {
    const themes = {
      family: 'involving family dynamics and relationships',
      work: 'set in a workplace environment',
      romance: 'with romantic tension and connection',
      mystery: 'with mysterious and intriguing elements',
      comedy: 'that\\'s humorous and light-hearted',
      drama: 'with emotional depth and intensity'
    };

    const emotions = {
      joy: 'celebrating something wonderful',
      anger: 'dealing with frustration or injustice',
      sadness: 'processing loss or disappointment',
      fear: 'facing something scary or unknown',
      love: 'expressing deep affection and connection',
      excitement: 'anticipating something amazing'
    };

    const basePrompt = `Create a scene ${themes[theme] || ''} where characters are ${emotions[emotion] || 'experiencing strong emotions'}.`;

    return {
      id: `custom_${Date.now()}`,
      title: `Custom ${theme || emotion || 'Scene'}`,
      prompt: basePrompt,
      duration: this.getDefaultDuration(mode),
      mode,
      difficulty: 'custom',
      theme,
      emotion,
      generated: true,
      createdAt: new Date().toISOString()
    };
  }

  static createSimpleCustomScene(mode, customPrompt) {
    return {
      id: `simple_${Date.now()}`,
      title: 'Custom Scene',
      prompt: customPrompt,
      duration: this.getDefaultDuration(mode),
      mode,
      difficulty: 'custom',
      generated: false,
      custom: true,
      createdAt: new Date().toISOString()
    };
  }

  static getFallbackScene(mode) {
    const fallbacks = {
      solo: {
        title: 'The Moment',
        prompt: 'You\\'ve just experienced something that changed your perspective. Share that moment with us.',
        duration: 90
      },
      duo: {
        title: 'The Conversation',
        prompt: 'Two people need to have an important conversation they\\'ve been avoiding.',
        duration: 150
      },
      group: {
        title: 'The Decision',
        prompt: 'A group must make an important choice together, but everyone has different opinions.',
        duration: 240
      }
    };

    return {
      id: `fallback_${Date.now()}`,
      ...fallbacks[mode],
      mode,
      difficulty: 'beginner',
      generated: false,
      fallback: true,
      createdAt: new Date().toISOString()
    };
  }

  static getDurationRange(mode) {
    switch (mode) {
      case 'solo': return '60-120';
      case 'duo': return '120-200';
      case 'group': return '180-300';
      default: return '60-120';
    }
  }

  static getDefaultDuration(mode) {
    switch (mode) {
      case 'solo': return 90;
      case 'duo': return 150;
      case 'group': return 240;
      default: return 90;
    }
  }

  static async getDailyChallenge() {
    const challenges = [
      {
        id: 'monday_monologue',
        title: 'Monologue Monday',
        description: 'Perform a 60-second monologue about your morning routine',
        hashtag: '#ACTMon',
        duration: 60,
        difficulty: 'beginner'
      },
      {
        id: 'two_line_tuesday',
        title: 'Two-Line Tuesday',
        description: 'Create a complete scene using only two lines of dialogue',
        hashtag: '#ACTTue',
        duration: 90,
        difficulty: 'intermediate'
      },
      {
        id: 'wordless_wednesday',
        title: 'Wordless Wednesday',
        description: 'Tell a story without speaking - use only gestures and expressions',
        hashtag: '#ACTWed',
        duration: 120,
        difficulty: 'advanced'
      },
      {
        id: 'throwback_thursday',
        title: 'Throwback Thursday',
        description: 'Recreate a scene from your favorite movie or show',
        hashtag: '#ACTThu',
        duration: 150,
        difficulty: 'intermediate'
      },
      {
        id: 'freestyle_friday',
        title: 'Freestyle Friday',
        description: 'Improvise based on three random words: Dream, Bicycle, Storm',
        hashtag: '#ACTFri',
        duration: 120,
        difficulty: 'advanced'
      },
      {
        id: 'story_saturday',
        title: 'Story Saturday',
        description: 'Collaborate on a group story - each person adds one sentence',
        hashtag: '#ACTSat',
        duration: 180,
        difficulty: 'beginner'
      },
      {
        id: 'silly_sunday',
        title: 'Silly Sunday',
        description: 'Make us laugh with your best comedy bit or funny character',
        hashtag: '#ACTSun',
        duration: 90,
        difficulty: 'beginner'
      }
    ];

    const today = new Date().getDay();
    const todayChallenge = challenges[today];

    return {
      ...todayChallenge,
      date: new Date().toISOString().split('T')[0],
      participantCount: Math.floor(Math.random() * 500) + 50,
      reward: 'Featured in community showcase'
    };
  }

  static getVoiceExercise() {
    const exercises = [
      {
        id: 'emotion_spectrum',
        name: 'Emotion Spectrum',
        instruction: 'Say "Hello, how are you?" in 5 different emotions',
        emotions: this.emotions.slice(0, 5),
        duration: 60,
        difficulty: 'beginner'
      },
      {
        id: 'volume_control',
        name: 'Volume Control',
        instruction: 'Deliver this line from whisper to shout: "I can\\'t believe this is happening"',
        levels: ['whisper', 'normal', 'loud', 'shout'],
        duration: 45,
        difficulty: 'beginner'
      },
      {
        id: 'character_voice',
        name: 'Character Voice',
        instruction: 'Say this line as different character types',
        line: 'The treasure is hidden behind the old oak tree',
        characters: this.characterTypes.slice(0, 3),
        duration: 90,
        difficulty: 'intermediate'
      }
    ];

    return exercises[Math.floor(Math.random() * exercises.length)];
  }
}