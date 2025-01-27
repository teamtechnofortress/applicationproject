import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { del } from '@vercel/blob'; // Import del method directly

export const runtime = 'edge';

export default async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get('url');
  
  
  if (!urlToDelete) {
    return new Response(JSON.stringify({ error: 'URL not provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    await del(urlToDelete);
    return new Response(JSON.stringify({ success: true,message: 'Blob deleted successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error deleting blob:', error);
    return new Response(JSON.stringify({ success: false,error: 'Error deleting blob' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
