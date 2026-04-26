export default function handler(req, res) {
  // Required by Meta for privacy compliance
  console.log('Data deletion request received');
  
  // For a private app, we just confirm we don't store persistent PII outside of your control
  res.status(200).json({
    url: 'https://www.asemnet.com/privacy-policy',
    confirmation_code: 'del_' + Date.now()
  });
}
