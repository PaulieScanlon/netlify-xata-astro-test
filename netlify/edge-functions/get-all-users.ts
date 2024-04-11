import { XataClient } from '../../src/xata';

const xata = new XataClient({
  apiKey: Netlify.env.get('XATA_API_KEY'),
  branch: Netlify.env.get('XATA_BRANCH'),
});

export default async function handler() {
  try {
    const { records } = await xata.sql`SELECT * FROM users`;

    return new Response(JSON.stringify({ message: 'A-Ok!', data: records }, null, 2), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    return new Response({
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export const config = { path: '/get-all-users' };
