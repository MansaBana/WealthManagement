const fs = require('fs');
const path = require('path');

// Define the base directory for the atomic structure (inside src)
const baseDir = path.join(__dirname, 'src', 'components');

// Define the atomic design folders
const folders = [
  'atoms',
  'molecules',
  'organisms',
  'templates',
  'pages',
];

// Create the base components directory if it doesn't exist
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// Create each atomic design folder
folders.forEach((folder) => {
  const folderPath = path.join(baseDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Created folder: ${folderPath}`);
  } else {
    console.log(`Folder already exists: ${folderPath}`);
  }
});

console.log('Atomic Design folder structure created successfully inside src!');