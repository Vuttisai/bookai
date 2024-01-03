
const WEBSITE_HOST_URL = process.env.SITE_URL || 'https://book-ai-pro.vercel.app/'


const changeFrequency = [
    'always',
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'yearly'
  ];

export default function sitemap() {

    const changeFrequency = 'daily';

    const routes = ['', '/dashboard'].map((route) => ({
        url: `${WEBSITE_HOST_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency,
      }))
    return [...routes]
  }