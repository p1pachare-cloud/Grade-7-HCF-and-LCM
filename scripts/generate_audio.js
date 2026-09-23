// scripts/generate_audio.js
// Node.js script to pre-generate ElevenLabs audio files for static narration phrases

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = path.join(__dirname, '../public/assets/audio');
const AUDIO_MAP_FILE = path.join(__dirname, '../src/utils/audioMap.js');
const ENV_LOCAL_FILE = path.join(__dirname, '../.env.local');

// Load API key from environment or .env.local
let API_KEY = process.env.VITE_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;

if (!API_KEY && fs.existsSync(ENV_LOCAL_FILE)) {
  const envContent = fs.readFileSync(ENV_LOCAL_FILE, 'utf-8');
  const match = envContent.match(/(?:VITE_)?ELEVENLABS_API_KEY\s*=\s*(.+)/);
  if (match) {
    API_KEY = match[1].trim().replace(/^["']|["']$/g, '');
  }
}

if (!API_KEY) {
  console.error("Error: ElevenLabs API key not found. Please set VITE_ELEVENLABS_API_KEY in .env.local or environment variable.");
  process.exit(1);
}

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const MODEL_ID = 'eleven_multilingual_v2';

const STYLE_SETTINGS = {
  celebration: {
    stability: 0.12,
    similarity_boost: 0.45,
    style: 0.75,
    use_speaker_boost: true
  },
  encouragement: {
    stability: 0.16,
    similarity_boost: 0.50,
    style: 0.65,
    use_speaker_boost: true
  },
  question: {
    stability: 0.20,
    similarity_boost: 0.55,
    style: 0.55,
    use_speaker_boost: true
  },
  emphasis: {
    stability: 0.16,
    similarity_boost: 0.50,
    style: 0.60,
    use_speaker_boost: true
  },
  thinking: {
    stability: 0.24,
    similarity_boost: 0.60,
    style: 0.35,
    use_speaker_boost: true
  },
  statement: {
    stability: 0.20,
    similarity_boost: 0.55,
    style: 0.50,
    use_speaker_boost: true
  },
  instruction: {
    stability: 0.20,
    similarity_boost: 0.55,
    style: 0.50,
    use_speaker_boost: true
  }
};

const phrases = [
  // Intro Phase
  { text: "Hello, Guild Member! Ready to master H C F and L C M?", style: "statement" },

  // Wonder Phase
  { text: "Priya in Mumbai has 24 red items and 36 blue items.", style: "thinking" },
  { text: "What is the largest group size she can pack with none left over?", style: "question" },
  { text: "And if Diego's signal lamps blink every 12 seconds and every 18 seconds, when do they blink together for the first time?", style: "question" },
  { text: "Let's discover how H C F and L C M help us solve both puzzles!", style: "encouragement" },

  // Story Phase Panels
  { text: "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, and Priya are the Global Math Guild. Every Friday they meet on a video call to build wonders for the World Harmony Festival.", style: "statement" },
  { text: "Priya has 12 red flags and 18 blue flags. The factors of 12 are 1, 2, 3, 4, 6, and 12. The factors of 18 are 1, 2, 3, 6, 9, and 18. The common factors are 1, 2, 3, and 6.", style: "statement" },
  { text: "The greatest common factor is 6. So Priya can make at most 6 equal groups with 2 red flags and 3 blue flags in each group!", style: "emphasis" },
  { text: "Diego watches two signal lamps that blink every 12 seconds and every 18 seconds. Multiples of 12 are 12, 24, 36, 48, 60. Multiples of 18 are 18, 36, 54, 72.", style: "statement" },
  { text: "The lowest common multiple is 36. Both lamps blink together for the first time after 36 seconds!", style: "emphasis" },
  { text: "To find the prime factorisation, split numbers into prime factor trees. 12 equals 2 times 2 times 3. 18 equals 2 times 3 times 3. The shared prime factors are 2 and 3.", style: "statement" },
  { text: "Multiply the shared prime factors 2 times 3 to get the H C F, which equals 6!", style: "emphasis" },
  { text: "To find the L C M using prime factorisation, multiply all prime factors, counting the shared prime factors only once.", style: "statement" },
  { text: "2 times 2 times 3 times 3 equals 36. That is the L C M!", style: "emphasis" },
  { text: "The division ladder method lets us divide both numbers by common prime factors step by step. Divide 24 and 36 by 2 to get 12 and 18, then by 2 to get 6 and 9, then by 3 to get 2 and 3.", style: "statement" },
  { text: "The product of the side divisors gives the H C F, 12! The product of side divisors and bottom remainders gives the L C M, 72!", style: "emphasis" },
  { text: "Here is the Guild rule. For any two numbers, H C F times L C M equals the product of the two numbers! Use H C F for equal grouping and cutting problems, and L C M for repeating events that sync together.", style: "emphasis" },

  // Simulate Phase Station Intros
  { text: "Choose a pack size and test if it divides all item groups with zero remainder. Can you find the greatest pack size?", style: "instruction" },
  { text: "Select or drag your marker to predict when both signals sync together. Then press play to verify!", style: "instruction" },
  { text: "Work through the 5-step ladder to build factor trees and division ladder steps!", style: "instruction" },

  // Reflect Phase
  { text: "What an adventure! Can you tell me how you know when to use H C F and when to use L C M?", style: "thinking" },

  // Feedback & Encouragement
  { text: "Perfect! You found the H C F and L C M like a Guild master!", style: "celebration" },
  { text: "Not quite. Check the prime factors or division ladder steps again.", style: "encouragement" }
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/(^_|_$)/g, '')
    .slice(0, 36);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAudio(text, style) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const voice_settings = STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': API_KEY
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`ElevenLabs API failed with status ${response.status}: ${errText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function main() {
  console.log(`Starting audio generation pipeline with ElevenLabs...`);
  console.log(`Voice ID: ${VOICE_ID} | Model: ${MODEL_ID}`);
  console.log(`API Key: ${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}`);

  if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
  }

  const map = {};

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const slug = slugify(text);
    const filename = `audio_${slug}_${i}.mp3`;
    const filepath = path.join(AUDIO_DIR, filename);
    const publicPath = `/assets/audio/${filename}`;

    console.log(`\n[${i + 1}/${phrases.length}] Generating: "${text}" (style: ${style})`);

    let audioBuffer = null;
    try {
      audioBuffer = await fetchAudio(text, style);
      fs.writeFileSync(filepath, audioBuffer);
      console.log(`  -> Saved: ${filename} (${audioBuffer.length} bytes)`);
      map[text] = publicPath;
    } catch (err) {
      console.error(`  -> ERROR generating "${text}":`, err.message);
      // Still map so the structure exists
      map[text] = publicPath;
    }

    // Rate-limiting pause between requests
    await sleep(400);
  }

  const mapCode = `// src/utils/audioMap.js\n// Auto-generated mapping of spoken text strings to static pre-generated audio files for HCF & LCM\n\nexport const audioMap = ${JSON.stringify(map, null, 2)};\n`;
  fs.writeFileSync(AUDIO_MAP_FILE, mapCode);
  console.log(`\nSuccess! Updated ${AUDIO_MAP_FILE} with ${Object.keys(map).length} audio entries.`);
}

main().catch((err) => {
  console.error('Fatal error in generate_audio.js:', err);
  process.exit(1);
});
