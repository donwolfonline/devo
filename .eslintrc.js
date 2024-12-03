const fs = require('fs');
const path = require('path');

const customDictionary = fs.readFileSync(path.resolve(__dirname, '.custom-dictionary.txt'), 'utf8')
  .split('\n')
  .map(word => word.trim())
  .filter(Boolean);

export default {
  extends: ['next/core-web-vitals'],
  rules: {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
    '@next/next/no-html-link-for-pages': 'off',
  },
  settings: {
    next: {
      rootDir: ['./'],
    },
  },
  // Add custom words to dictionary
  globals: Object.fromEntries(customDictionary.map(word => [word, true]))
};
