import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Missing image data' });
    }

    // Check if it's base64
    if (image.startsWith('data:')) {
      const blob = await put(`custom-orders/${Date.now()}.png`, Buffer.from(image.split(',')[1], 'base64'), {
        access: 'public',
      });
      return res.status(200).json({ url: blob.url });
    } else {
      return res.status(400).json({ error: 'Invalid image format. Expected Base64 data URI.' });
    }
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
