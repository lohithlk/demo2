import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.join(__dirname, '../public');
const destDir = path.join(__dirname, '../dist');

async function copyPublic() {
  try {
    console.log(`Copying public folder from ${sourceDir} to ${destDir}...`);
    
    // Copy entire public folder to dist
    await fs.copy(sourceDir, destDir, {
      overwrite: true,
      recursive: true
    });
    
    console.log('✓ Public files copied successfully to dist');
  } catch (err) {
    console.error('Error copying public folder:', err);
    process.exit(1);
  }
}

copyPublic();
