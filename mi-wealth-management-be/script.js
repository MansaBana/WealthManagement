const fs = require('fs');
const path = require('path');

// Define the folder structure
const folders = [
  'src/config',
  'src/controllers',
  'src/middleware',
  'src/models',
  'src/routes',
  'src/services',
  'src/utils',
  'src/validations',
  'tests/unit',
  'tests/integration',
  'tests/fixtures',
  'logs',
  'docs',
];

// Define the files to create
const files = {
  '.env': '',
  '.gitignore': 'node_modules/\n.env\nlogs/\n',
  'package.json': JSON.stringify(
    {
      name: 'my-express-app',
      version: '1.0.0',
      description: 'A basic Express.js application',
      main: 'src/server.js',
      scripts: {
        start: 'node src/server.js',
        dev: 'nodemon src/server.js',
        test: 'jest',
      },
      keywords: [],
      author: '',
      license: 'ISC',
      dependencies: {
        express: '^4.18.2',
      },
      devDependencies: {
        nodemon: '^3.0.2',
        jest: '^29.7.0',
      },
    },
    null,
    2
  ),
  'README.md': '# My Express.js Application\n\nA basic Express.js application.',
  'src/app.js': `const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;`,
  'src/server.js': `const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});`,
  'src/config/db.js': `module.exports = {
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/myapp',
};`,
  'src/controllers/userController.js': `exports.getUsers = (req, res) => {
  res.json({ message: 'Get all users' });
};`,
  'src/middleware/errorHandler.js': `module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};`,
  'src/routes/userRoutes.js': `const express = require('express');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);

module.exports = router;`,
  'tests/unit/userController.test.js': `const { getUsers } = require('../../src/controllers/userController');

describe('User Controller', () => {
  it('should return all users', () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    getUsers(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Get all users' });
  });
});`,
};

// Create folders
folders.forEach((folder) => {
  const dir = path.join(__dirname, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created folder: ${folder}`);
  }
});

// Create files
Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  fs.writeFileSync(fullPath, content);
  console.log(`Created file: ${filePath}`);
});

console.log('Express.js application generated successfully!');