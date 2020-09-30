var socket = io.connect("http://localhost:4000");

var message = document.getElementById("message");
var header = document.getElementById("header");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

btn.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
    header: header.value,
  });
  message.value="";
});

socket.on("chat", function(data) {
    output.innerHTML += `<p><strong> ${data.header} :</strong>${data.message}</p>`;
    feedback.innerHTML = "";
});

message.addEventListener("keypress", function() {
    socket.emit("typing", header.value);
})

socket.on("typing", function(data) {
    feedback.innerHTML = `<p><em> ${data} typing...</em></p>`;
});