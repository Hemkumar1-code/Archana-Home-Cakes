import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';

export default async function handler(req, res) {
  // 1. Initial Table Creation (One-time check)
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS cakes (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('Table creation error:', error);
  }

  // 2. GET: Fetch all cakes
  if (req.method === 'GET') {
    try {
      const { rows } = await sql`SELECT * FROM cakes ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // 3. POST: Add a new cake
  if (req.method === 'POST') {
    try {
      const { name, price, description, image } = req.body;

      if (!name || !price || !description || !image) {
        return res.status(400).json({ error: 'Missing fields' });
      }

      // If image is Base64, we should convert it to a Blob and upload to Vercel Blob
      // For simplicity in this demo, we assume the frontend sends a Base64 string if it's small, 
      // but ideally, we should use a Multipart form for larger files.
      // However, Vercel Blob works great if we send the file correctly.
      
      // For this implementation, we'll store the provided image URL or string.
      // If image starts with 'data:', it's a Base64.
      let finalImageUrl = image;
      if (image.startsWith('data:')) {
         // This is a Base64 string from the frontend.
         // In a real app, we'd use @vercel/blob's client-side upload or server-side put.
         // Let's use a server-side put for now (note: there are body size limits).
         const blob = await put(`cakes/${Date.now()}.png`, Buffer.from(image.split(',')[1], 'base64'), {
            access: 'public',
         });
         finalImageUrl = blob.url;
      }

      const result = await sql`
        INSERT INTO cakes (name, price, description, image_url)
        VALUES (${name}, ${price}, ${description}, ${finalImageUrl})
        RETURNING *;
      `;

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('POST Error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // 4. DELETE: Remove a cake (Optional but useful)
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await sql`DELETE FROM cakes WHERE id = ${id}`;
      return res.status(200).json({ message: 'Cake deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
