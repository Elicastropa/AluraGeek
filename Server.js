const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
    // Lee la base de datos JSON
    fs.readFile(path.join(__dirname, 'productos.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al leer la base de datos.' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para agregar un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;

    // Lee la base de datos JSON
    fs.readFile(path.join(__dirname, 'productos.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al leer la base de datos.' });
            return;
        }

        // Parsea el archivo JSON a un array de objetos
        const productos = JSON.parse(data);

        // Agrega el nuevo producto al array
        productos.push(nuevoProducto);

        // Escribe el array de productos de nuevo en el archivo JSON
        fs.writeFile(path.join(__dirname, 'productos.json'), JSON.stringify(productos, null, 4), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al escribir en la base de datos.' });
                return;
            }
            res.status(201).json(nuevoProducto);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

document.querySelector('.custom-file-label').addEventListener('click', function() {
    document.getElementById('file-upload').click();
});

function limpiarFormulario() {
    document.getElementById('taskForm').reset();
}