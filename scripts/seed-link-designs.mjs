import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const linkDesigns = [
  {
    id: 'link_design_minimal_modern',
    name: 'Minimal Modern',
    description: 'Clean and minimalist link design',
    previewImage: '/link-designs/minimal-modern.png',
    cssTemplate: `
      .link-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        margin: 0 auto;
        padding: 2rem;
        background-color: #f4f4f4;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .link-item {
        width: 100%;
        text-align: center;
        padding: 12px 24px;
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        color: #333;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      .link-item:hover {
        background-color: #f0f0f0;
        transform: translateY(-3px);
      }
    `,
    htmlTemplate: `
      <div class="link-container">
        {{#each links}}
        <a href="{{url}}" class="link-item" target="_blank">{{title}}</a>
        {{/each}}
      </div>
    `
  },
  {
    id: 'link_design_cyberpunk_neon',
    name: 'Cyberpunk Neon',
    description: 'Futuristic and vibrant link design',
    previewImage: '/link-designs/cyberpunk-neon.png',
    cssTemplate: `
      .link-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        margin: 0 auto;
        padding: 2rem;
        background-color: #0a0a1a;
        border-radius: 12px;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
      }
      .link-item {
        width: 100%;
        text-align: center;
        padding: 12px 24px;
        background-color: #1a1a2e;
        border: 2px solid #00ffff;
        border-radius: 8px;
        color: #00ffff;
        text-decoration: none;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .link-item:hover {
        background-color: #00ffff;
        color: #0a0a1a;
        transform: translateY(-3px);
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
      }
    `,
    htmlTemplate: `
      <div class="link-container">
        {{#each links}}
        <a href="{{url}}" class="link-item" target="_blank">{{title}}</a>
        {{/each}}
      </div>
    `
  },
  {
    id: 'link_design_pastel_gradient',
    name: 'Pastel Gradient',
    description: 'Soft and elegant link design',
    previewImage: '/link-designs/pastel-gradient.png',
    cssTemplate: `
      .link-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        margin: 0 auto;
        padding: 2rem;
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .link-item {
        width: 100%;
        text-align: center;
        padding: 12px 24px;
        background-color: rgba(255,255,255,0.8);
        border: 1px solid rgba(255,255,255,0.5);
        border-radius: 8px;
        color: #6a5acd;
        text-decoration: none;
        transition: all 0.3s ease;
        font-weight: 500;
      }
      .link-item:hover {
        background-color: rgba(255,255,255,1);
        transform: translateY(-3px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    `,
    htmlTemplate: `
      <div class="link-container">
        {{#each links}}
        <a href="{{url}}" class="link-item" target="_blank">{{title}}</a>
        {{/each}}
      </div>
    `
  }
]

async function seedLinkDesigns() {
  try {
    for (const design of linkDesigns) {
      await prisma.linkDesign.upsert({
        where: { id: design.id },
        update: design,
        create: design
      })
    }
    console.log('Link designs seeded successfully')
  } catch (error) {
    console.error('Error seeding link designs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedLinkDesigns()
