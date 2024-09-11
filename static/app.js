const socket = io("http://localhost:3000");
const msgBox = document.getElementById("exampleFormControlTextarea1");
const msgCont = document.getElementById("data-container");
const email = document.getElementById("email");
const button = document.getElementById("send");
//Получаем старые сообщения с сервера
const messages = [];
function getMessages() {
  fetch("http://localhost:3000/websocket")
    .then((response) => response.json())
    .then((data) => {
      loadDate(data);
      data.forEach((el) => {
        messages.push(el);
      });
    })
    .catch((err) => console.error(err));
}
getMessages();

//Когда пользователь нажимает клавишу enter key, отправляем сообщение.
msgBox.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    sendMessage({ user: email.value, message: e.target.value });
    e.target.value = "";
  }
});

button.addEventListener("click", () => {
  sendMessage({ user: email.value, message: msgBox.value });
  msgBox.value = "";
});

//Отображаем сообщения пользователям
function loadDate(data) {
  let messages = "";
  console.log(data);
  data.map((a) => {
    messages += ` <li class="bg-primary p-2 rounded mb-2 text-light">
      <span class="fw-bolder">${a.user}</span>
      ${a.message}
    </li>`;
  });
  msgCont.innerHTML = messages;
}

//socket.io
//Создаём событие sendMessage, чтобы передать сообщение
function sendMessage(message) {
  socket.emit("sendMessage", message);
}
//Слушаем событие recMessage, чтобы получать сообщения, отправленные пользователями
socket.on("recMessage", (message) => {
  messages.push(message);
  loadDate(messages);
});
