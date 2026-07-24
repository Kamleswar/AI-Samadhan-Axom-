export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed"
    });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      reply: "API Key configure nahi hui."
    });
  }

  const { message } = req.body;

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {

      if (response.status === 429) {
        return res.status(200).json({
          reply: "⚠️ Aaj ki free AI limit khatam ho gayi hai. Kal phir try karein."
        });
      }

      if (response.status === 401) {
        return res.status(200).json({
          reply: "⚠️ API Key invalid hai."
        });
      }

      return res.status(200).json({
        reply: "⚠️ AI service temporary unavailable hai."
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Koi response nahi mila.";

    return res.status(200).json({
      reply
    });

  } catch (err) {

    return res.status(200).json({
      reply: "⚠️ Server se connect nahi ho paaya."
    });

  }
}