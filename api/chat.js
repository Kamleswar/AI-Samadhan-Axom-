export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Koi response nahi mila.";

    return res.status(200).json({ reply });

  } } catch (err) {
  console.error(err);

  return res.status(200).json({
    reply: "⚠️ AI service abhi uplabdh nahi hai ya daily free limit khatam ho gayi hai. Kripya baad me phir try karein."
  });
}
}