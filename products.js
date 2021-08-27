const fs = require("fs");
const archivo = JSON.parse(fs.readFileSync("./data.json", (encoding = "utf8")));
const archivoMensajes = JSON.parse(
  fs.readFileSync("./dataMensajes.json", (encoding = "utf8"))
);

class Product {
  async create(req, res) {
    const dataTemporal = archivo;
    const newProduct = req.body;
    newProduct.id = dataTemporal.length + 1;
    dataTemporal.push(newProduct);
    await fs.promises.writeFile("./data.json", JSON.stringify(dataTemporal));
    res.json({ data: newProduct, status: "Fue creado el producto" });
  }

  async createNew(req, res) {
    const dataTemporal = archivo;
    const newProduct = req.body;
    newProduct.id = dataTemporal.length + 1;
    dataTemporal.push(newProduct);
    await fs.promises.writeFile("./data.json", JSON.stringify(dataTemporal));
    res.redirect("/");
  }

  async saveMessage(msg) {
    const dataTemporal = archivoMensajes;
    const newMensaje = msg;
    dataTemporal.push(newMensaje);
    await fs.promises.writeFile(
      "./dataMensajes.json",
      JSON.stringify(dataTemporal)
    );
  }

  async updateById(req, res) {
    const dataTemporal = archivo;
    const id = req.params.id;
    const temporal = req.body;
    temporal.id = id;
    if (id <= dataTemporal.length) {
      dataTemporal[id - 1] = temporal;
      await fs.promises.writeFile("./data.json", JSON.stringify(dataTemporal));
      res.json({ nota: "Fue modificado el producto" });
    } else {
      res.json({ nota: "No existe ese producto" });
    }
  }
  async deleteById(req, res) {
    const dataTemporal = archivo;
    const id = req.params.id;
    const temporal = {
      id: id,
    };
    dataTemporal[id - 1] = temporal;
    await fs.promises.writeFile("./data.json", JSON.stringify(dataTemporal));
    res.json({ nota: "Fue borrado el producto" });
  }

  async getAll(req, res) {
    const dataTemporal = archivo;
    res.json(dataTemporal);
  }

  getAllMessages(req, res) {
    const dataTemporal = archivoMensajes;
    return dataTemporal;
  }

  async findById(req, res) {
    const dataTemporal = archivo;
    let id = req.params.id;
    let text = dataTemporal.find((val) => id == val.id);
    return res.json(text ? text : { error: "Producto no encontrado" });
  }

  traerTodos() {
    const dataTemporal = archivo;
    return dataTemporal;
  }
}

module.exports = new Product();
