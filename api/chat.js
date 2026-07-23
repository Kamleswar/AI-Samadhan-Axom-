module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${API_KEY}
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

    console.log("Gemini Response:", JSON.stringify(data));

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    let reply = "Koi response nahi mila.";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      reply = data.candidates[0].content.parts[0].text;
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
}