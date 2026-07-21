<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Samadhan Axom</title>

<style>
body{
  font-family:Arial,sans-serif;
  background:#f5f5f5;
  margin:0;
  padding:20px;
}

h1{
  text-align:center;
  color:#0b57d0;
}

#chat{
  height:350px;
  background:#fff;
  border:1px solid #ccc;
  padding:10px;
  overflow-y:auto;
  margin-bottom:10px;
}

#msg{
  width:70%;
  padding:10px;
  font-size:16px;
}

button{
  padding:10px 15px;
  font-size:16px;
  cursor:pointer;
}
</style>
</head>

<body>

<h1>🤖 AI Samadhan Axom</h1>

<div id="chat">
<b>AI:</b> Namaste! Main AI Samadhan Axom hoon.<br><br>
</div>

<input type="text" id="msg" placeholder="Apna message likhiye...">
<button onclick="sendMessage()">Send</button>

<script>
async function sendMessage() {

  const input = document.getElementById("msg");
  const message = input.value.trim();

  if (!message) return;

  const chat = document.getElementById("chat");

  chat.innerHTML += "<b>You:</b> " + message + "<br>";

  input.value = "";

  try {

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    chat.innerHTML += "<b>AI:</b> " + (data.reply || data.error) + "<br><br>";

  } catch (e) {

    chat.innerHTML += "<b>AI:</b> Server se connect nahi ho paaya.<br><br>";

  }

  chat.scrollTop = chat.scrollHeight;
}
</script>

</body>
</html>