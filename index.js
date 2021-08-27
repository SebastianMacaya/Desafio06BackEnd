const express = require("express");
const morgan = require("morgan");
const emoji = require("node-emoji");
/* -------------------------------- socket io ------------------------------- */
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Products = require("./products");
const products = require("./products");
const PORT = 8080;

//middleware
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/static", express.static(__dirname + "/public"));
app.use(express.static("public"));
const mensajes = Products.getAllMessages();

io.on("connection", (socket) => {
  console.log(
    emoji.get("white_check_mark"),
    "Nuevo usuario conectado",
    socket.id
  );
  socket.on("disconnect", () => {
    console.log(emoji.get("poop"), "usuario desconectado", socket.id);
  });
  //Enviar desde el back end al front
  socket.emit("mensajes", mensajes);
  //recibo nuevo mensaje desde el front
  socket.on("nuevoMensaje", async (msg) => {
    msg.fyh = new Date().toLocaleString();
    // console.log(msg);

    await products.saveMessage(msg);
    io.sockets.emit("mensajes", mensajes);
  });
});

httpServer.listen(PORT, () =>
  console.log(emoji.get("computer"), `Server on port ${PORT}`)
);
