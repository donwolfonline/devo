const fs = require('fs');
const { createCanvas } = require('canvas');

const templates = [
  { id: 'minimal', color: '#F3F4F6' },
  { id: 'modern', color: '#E5E7EB' },
  { id: 'creative', color: '#D1D5DB' },
  { id: 'developer', color: '#9CA3AF' },
  { id: 'portfolioplus', color: '#6B7280' }
];

// Create a 1600x900 canvas (16:9 aspect ratio)
const width = 1600;
const height = 900;

templates.forEach(template => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = template.color;
  ctx.fillRect(0, 0, width, height);

  // Add template name
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(template.id.charAt(0).toUpperCase() + template.id.slice(1) + ' Template', width/2, height/2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(`public/templates/${template.id}-preview.jpg`, buffer);
  console.log(`Generated ${template.id}-preview.jpg`);
});
