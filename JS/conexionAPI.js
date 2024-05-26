async function listarProductos() {
  const conexion = await fetch("http://localhost:3000/productos");
  const conexionConvertida = await conexion.json();
  return conexionConvertida;
}

async function enviarProducto(nombre, precio, imagen) {
  const conexion = await fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: { "Contect-Type": "application/json" },
    body: JSON.stringify({
      nombre: nombre,
      precio: precio,
      imagen: imagen,
    }),
  });
  const conexionConvertida = await conexion.json();
  console.log("Producto enviado:", conexionConvertida);
  return conexionConvertida;
}

export const conexionAPI = {
  listarProductos,
  enviarProducto,
};
