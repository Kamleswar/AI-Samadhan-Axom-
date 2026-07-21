const API_KEY = "AQ.Ab8RN6J6ZYb61y4ToIGMk_I48v44z9rZuWeqQ77Jlt4uHvNg";

function addMessage(text, type) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.className = type;
  div.innerHTML = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {

  const input = document.getElementById("msg");
  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY,
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

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Koi jawab nahi mila.";

    addMessage(reply, "ai");

    speechSynthesis.speak(new SpeechSynthesisUtterance(reply));

  } catch (e) {
    addMessage("Error: " + e.message, "ai");
  }
}

document.getElementById("msg").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});