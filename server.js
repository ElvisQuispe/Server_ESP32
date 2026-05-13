const express = require("express");

const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

/* ===== CARPETA PUBLIC ===== */

app.use(express.static(path.join(__dirname, "public")));

/* ===== RUTA PRINCIPAL ===== */

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});

/* ===== INICIAR SERVIDOR ===== */

app.listen(PORT, () => {

    console.log(
        `Servidor funcionando en puerto ${PORT}`
    );

});