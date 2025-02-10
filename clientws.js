const ws = new WebSocket("ws://localhost:3000");

let nom = ""

ws.addEventListener("message", (event) => {
    document.getElementById("messages").innerHTML += event.data + "<br>";
})

function envoyerMessage() {
    if (nom == "") {
        nom = window.prompt("Entrez votre nom : ");
        ws.send("nom=" + nom)
    } else {
        const msg = document.getElementById("message").value;
        ws.send(msg);
        document.getElementById("message").value = "";
    }
}