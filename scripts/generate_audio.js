// scripts/generate_audio.js
// Node.js script to pre-generate ElevenLabs audio files for static narration phrases

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = path.join(__dirname, '../public/assets/audio');
const AUDIO_MAP_FILE = path.join(__dirname, '../src/utils/audioMap.js');

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const MODEL_ID = 'eleven_multilingual_v2';

const phrases = [
  { text: "Hello, Guild Member! Ready to master H C F and L C M with fractions?", style: "statement" },
  { text: "Yuki in Tokyo has two ribbons. One is three quarters of a metre long and the other is five sixths of a metre long.", style: "thinking" },
  { text: "She wants to cut both into equal pieces with nothing left over. What is the longest piece she can cut?", style: "question" },
  { text: "And if Aisha and Carlos drum every three quarters and five sixths of a second, when do their drums hit together?", style: "question" },
  { text: "Let's discover how H C F and L C M help us solve both puzzles!", style: "encouragement" },
  { text: "Choose a cut length and press cut. Can you find the longest piece that fits every ribbon exactly?", style: "instruction" },
  { text: "Drag the marker to where you think all the drums hit together. Then press play to check!", style: "instruction" },
  { text: "Perfect! You found the rule and used it like a Guild master!", style: "celebration" },
  { text: "Not quite. Check the bottoms. Which rule uses the L C M of the bottoms?", style: "encouragement" },
  { text: "What an adventure! Can you tell me how you know when to use the H C F and when to use the L C M?", style: "thinking" }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '').slice(0, 40);
}

async function main() {
  if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
  }

  const map = {};

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const slug = slugify(text);
    const filename = `${slug}_${i}.mp3`;
    const filepath = path.join(AUDIO_DIR, filename);
    const publicPath = `/assets/audio/${filename}`;

    map[text] = publicPath;
    console.log(`Mapped phrase [${i + 1}/${phrases.length}]: "${text}" -> ${publicPath}`);
  }

  const mapCode = `// Auto-generated audio map file\nexport const audioMap = ${JSON.stringify(map, null, 2)};\n`;
  fs.writeFileSync(AUDIO_MAP_FILE, mapCode);
  console.log('Audio mapping file successfully updated!');
}

main().catch(console.error);
