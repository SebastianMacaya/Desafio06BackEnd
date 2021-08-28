const socket = io.connect();
//productos

const title = document.getElementById("title");
const price = document.getElementById("price");
const url = document.getElementById("url");
const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const producto = {
    title: title.value,
    price: price.value,
    url: url.value,
  };

  //emitir msg hacia el back

  socket.emit("nuevoProducto", producto);

  productForm.reset();
});

socket.on("productos", (products) => {
  const html = tableRows(products);
  document.getElementById("listaProductos").innerHTML = html;
});

const tableRows = (products) =>
  products
    .map(
      (prod) =>
        `
        <tr>
            <td><h3>${prod.title}</h3></td>
            <td><h4>$${prod.price}</h4></td>
            <td><img class="img-thumbnail" src=${prod.url}></td>        
        </tr>
    `
    )
    .reverse();

// Mensajes :

//Leer valores por Id :

const user = document.getElementById("user");
const message = document.getElementById("msg");
const send = document.getElementById("send");

const messageForm = document.getElementById("messageForm");

//agregar evento

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = {
    author: user.value,
    text: message.value,
  };

  //emitir msg hacia el back

  socket.emit("nuevoMensaje", msg);

  messageForm.reset();
  message.focus();
});

socket.on("mensajes", (msg) => {
  const html = listaMensajes(msg);
  document.getElementById("mensajes").innerHTML = html;
});
const listaMensajes = (mensajes) =>
  mensajes
    .map(
      (msg) =>
        `
            <div>
                [<span style="color:brown;">${msg.fyh}</span>]
                 <i style="color:blue;">${msg.author}<i/>
                 <i style="color:green;">${msg.text}<i/>
            </div>    
    `
    )
    .join(" ");
