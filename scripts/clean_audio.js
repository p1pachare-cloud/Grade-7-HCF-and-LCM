// scripts/clean_audio.js
// Scans public/assets/audio/ and removes orphaned .mp3 files not in audioMap.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { audioMap } from '../src/utils/audioMap.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIO_DIR = path.join(__dirname, '../public/assets/audio');

function clean() {
  if (!fs.existsSync(AUDIO_DIR)) return;

  const validFiles = new Set(Object.values(audioMap).map((p) => path.basename(p)));
  const files = fs.readdirSync(AUDIO_DIR);

  let removed = 0;
  for (const file of files) {
    if (file.endsWith('.mp3') && !validFiles.has(file)) {
      fs.unlinkSync(path.join(AUDIO_DIR, file));
      console.log(`Removed orphaned audio: ${file}`);
      removed++;
    }
  }

  console.log(`Cleanup complete. Removed ${removed} unused audio files.`);
}

clean();
