const API_KEY = "YAHAN_APNI_API_KEY";

function addMessage(text, type) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerHTML = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}