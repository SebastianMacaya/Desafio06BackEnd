const express = require("express");
const morgan = require("morgan");
const routes = require("./src/routes/routes");
const emoji = require("node-emoji");
/* -------------------------------- socket io ------------------------------- */
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

//cargo modulo handlebars
const handlebars = require("express-handlebars");
const PORT = 8080;
//instancio produtctos
const Products = require("./products");

//middleware
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// HANDLEBARS

// Settear el engine que voy a usar y la extensión (hbs):
app.set("view engine", "hbs");

// Configurar el layout que voy a usar:
app.engine(
  "hbs",

  handlebars({
    layoutsDir: __dirname + "/views",
    extname: "hbs",

    defaultLayout: "layoutFrame",
  })
);

// Formulario en la ruta raíz:
app.get("/", (req, res) => {
  // Renderiza el archivo bodyForm.hbs dentro del layout llamado 'layoutFrame'.
  res.render("bodyForm", { layout: "layoutFrame" });
});

//Post
app.post("/productos", Products.createNew);

// Vista de productos:

app.get("/productos", (req, res) => {
  const productos = Products.traerTodos();
  // Renderiza el archivo 'bodyProducts.hbs' dentro del layout, junto con la información incluída en el objeto 'productos':
  res.render("bodyProducts", {
    layout: "layoutFrame",
    productos,
  });
});
httpServer.listen(PORT, () =>
  console.log(emoji.get("computer"), `Server on port ${PORT}`)
);
//Avisamos por consola del servidor que se conecta un usuario
io.on("connection", (socket) => {
  console.log(emoji.get("white_check_mark"), "Nuevo usuario conectado");
  //Avisamos por consola  del servidor que se desconecta un usuario
  socket.on("disconnect", () => {
    console.log(emoji.get("poop"), "usuario desconectado");
  });
});
