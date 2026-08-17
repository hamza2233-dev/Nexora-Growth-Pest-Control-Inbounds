export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { CallerId, InboundZipCode } = req.body;

  if (!CallerId || !InboundZipCode) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const gridId = 'cmrxs3a8t00w007iarb1sno0w';
  const targetUrl = `https://bid.callgrid.com/api/bid/${gridId}`;

  const payload = {
    CallerId: CallerId,
    InboundZipCode: InboundZipCode,
    pstn: true
  };

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const resultText = await response.text();
    return res.status(200).send(resultText);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
