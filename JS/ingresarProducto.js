import { conexionAPI } from "./conexionAPI.js";

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("taskForm");

    async function ingresarProducto(evento) {
        evento.preventDefault();

        // Verificación de la existencia de los elementos
        const nombreElem = document.getElementById("nombre");
        const precioElem = document.getElementById("precio");
        const imagenElem = document.getElementById("file-upload");

        if (!nombreElem || !precioElem || !imagenElem) {
            console.error("Uno o más elementos del formulario no se encontraron");
            return;
        }

        const nombre = nombreElem.value;
        const precio = precioElem.value;
        const imagen = imagenElem.value;

        try {
            await conexionAPI.enviarProducto(nombre, precio, imagen);
            formulario.reset();
            console.log("Formulario enviado y reseteado");
        } catch (error) {
            console.error("Error al enviar el producto:", error);
        }
    }

    if (formulario) {
        formulario.addEventListener("submit", ingresarProducto);
    } else {
        console.error("No se encontró el formulario");
    }
});