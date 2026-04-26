export default function handler(req, res) {
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined' && !req) return;
  // Meta calls this when someone removes the app from their business integrations
  console.log('Deauthorization request received from Meta');
  res.status(200).json({ status: 'success', message: 'Deauthorization recorded' });
}
