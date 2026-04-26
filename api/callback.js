export default function handler(req, res) {
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined' && !req) return;
  // Handle GET requests (OAuth Redirect URI callback)
  if (req.method === 'GET') {
    // You can parse the code query parameter here if your frontend needs it:
    // const code = req.query.code;
    
    // Redirect back to a friendly page with a success message
    res.writeHead(302, { Location: '/admin/integrations?status=oauth_success' });
    res.end();
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
