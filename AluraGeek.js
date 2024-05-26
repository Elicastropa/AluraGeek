document.addEventListener("DOMContentLoaded", function () {
  async function obtenerYRenderizarProductos() {
    try {
      const response = await fetch("http://localhost:3000/productos");
      const productos = await response.json();
      const tarjetasProductos = document.getElementById("cardContainer");
      tarjetasProductos.innerHTML = "";

      for (let i = 0; i < Math.min(productos.length); i++) {
        const producto = productos[i];
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                    <img class="fotoProduct" src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $ ${producto.precio}</p>                  
                    <img src="./img/🦆 icon _trash 2_.png" alt="Basurero" class="basurero" data-id="${producto.id}">
                `;
        tarjetasProductos.insertBefore(card, tarjetasProductos.firstChild);
      }

      const basureros = document.querySelectorAll(".basurero");
      basureros.forEach((basurero) => {
        basurero.addEventListener("click", async () => {
          const id = basurero.dataset.id;
          await eliminarProducto(id);
          obtenerYRenderizarProductos();
        });
      });
    } catch (error) {
      console.error("Hubo un error al obtener los productos:", error);
    }
  }

  obtenerYRenderizarProductos();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").value;

    if (!nombre || !precio || !imagen) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const producto = {
        nombre,
        precio,
        imagen,
      };

      await agregarProducto(producto);
      limpiarFormulario();
      obtenerYRenderizarProductos();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Error al agregar el producto.");
    }
  });
});

async function agregarProducto(producto) {
  try {
    const response = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el producto");
    }
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw error;
  }
}

async function eliminarProducto(id) {
  try {
    const response = await fetch(`http://localhost:3000/productos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}

function limpiarFormulario() {
  document.getElementById("taskForm").reset();
}

function ocultarLabel() {
  document.getElementById("nombre").classList.add("hidden");
}
