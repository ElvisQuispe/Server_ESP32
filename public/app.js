/* ================= LOGIN ================= */

const formulario = document.getElementById("formulario");

if(formulario){

    verificarSesion();

    formulario.addEventListener("submit", function(event){

        event.preventDefault();

        const usuario = document.getElementById("usuario").value;

        const clave = document.getElementById("clave").value;

        const mensaje = document.getElementById("mensaje");

        const usuarioEncontrado = usuarios.find(user =>

            user.usuario === usuario &&
            user.clave === clave

        );

        if(usuarioEncontrado){

            mensaje.style.color = "lime";

            mensaje.textContent = "Acceso correcto";

            localStorage.setItem("sesionActiva", usuario);

            setTimeout(() => {

                window.location.href = "panel.html";

            }, 1000);

        }else{

            mensaje.style.color = "red";

            mensaje.textContent = "Usuario o contraseña incorrectos";
        }

    });

}

/* ================= MOSTRAR REGISTRO ================= */

function mostrarRegistro(){

    const box = document.getElementById("registroBox");

    box.classList.toggle("activo");
}

/* ================= MOSTRAR CONTRASEÑA ================= */

function mostrarClave(id){

    const input = document.getElementById(id);

    if(input.type === "password"){

        input.type = "text";

    }else{

        input.type = "password";
    }
}

/* ================= REGISTRO ================= */

function registrarUsuario(){

    const nuevoUsuario =
    document.getElementById("nuevoUsuario").value;

    const nuevaClave =
    document.getElementById("nuevaClave").value;

    if(nuevoUsuario === "" || nuevaClave === ""){

        alert("Completa todos los campos");

        return;
    }

    const existe = usuarios.find(user =>

        user.usuario === nuevoUsuario
    );

    if(existe){

        alert("Ese usuario ya existe");

        return;
    }

    usuarios.push({

        usuario: nuevoUsuario,
        clave: nuevaClave
    });

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    alert("Usuario registrado correctamente");

    /* ===== LIMPIAR CAMPOS ===== */

    document.getElementById("nuevoUsuario").value = "";

    document.getElementById("nuevaClave").value = "";

    /* ===== CERRAR PANEL ===== */

    document.getElementById("registroBox")
    .classList.remove("activo");
}

/* ================= RECORDAR SESIÓN ================= */

function verificarSesion(){

    const sesion =
    localStorage.getItem("sesionActiva");

    if(sesion){

        window.location.href = "panel.html";
    }
}

/* ================= CERRAR SESIÓN ================= */

function cerrarSesion(){

    localStorage.removeItem("sesionActiva");

    window.location.href = "index.html";
}

/* ================= RELÉS ================= */

function encender(numero){

    const estado =
    document.getElementById("estado" + numero);

    if(estado){

        estado.textContent = "ENCENDIDO";

        estado.classList.add("activo");
    }
}

function apagar(numero){

    const estado =
    document.getElementById("estado" + numero);

    if(estado){

        estado.textContent = "APAGADO";

        estado.classList.remove("activo");
    }
}

/* ================= TEMPORIZADOR ================= */

function temporizador(numero, segundos){

    encender(numero);

    setTimeout(() => {

        apagar(numero);

    }, segundos * 1000);
}

/* ================= COMANDOS ================= */

function procesarComando(comando){

    comando = comando.toLowerCase();

    /* ===== TODOS ===== */

    if(comando.includes("encender todos")){

        encender(1);
        encender(2);
        encender(3);
        encender(4);
    }

    if(comando.includes("apagar todos")){

        apagar(1);
        apagar(2);
        apagar(3);
        apagar(4);
    }

    /* ===== TEMPORIZADOR ===== */

    const regexTiempo =
    /encender (.+) por (\d+) segundos/;

    const resultadoTiempo =
    comando.match(regexTiempo);

    if(resultadoTiempo){

        const textoRelees =
        resultadoTiempo[1];

        const segundos =
        parseInt(resultadoTiempo[2]);

        if(textoRelees.includes("k1")){

            temporizador(1, segundos);
        }

        if(textoRelees.includes("k2")){

            temporizador(2, segundos);
        }

        if(textoRelees.includes("k3")){

            temporizador(3, segundos);
        }

        if(textoRelees.includes("k4")){

            temporizador(4, segundos);
        }

        return;
    }

    /* ===== ENCENDER ===== */

    if(comando.includes("encender")){

        if(comando.includes("k1")) encender(1);

        if(comando.includes("k2")) encender(2);

        if(comando.includes("k3")) encender(3);

        if(comando.includes("k4")) encender(4);
    }

    /* ===== APAGAR ===== */

    if(comando.includes("apagar")){

        if(comando.includes("k1")) apagar(1);

        if(comando.includes("k2")) apagar(2);

        if(comando.includes("k3")) apagar(3);

        if(comando.includes("k4")) apagar(4);
    }
}

/* ================= TEXTO ================= */

function procesarComandoTexto(){

    const input =
    document.getElementById("comandoTexto");

    const comando = input.value;

    procesarComando(comando);

    input.value = "";
}

/* ================= VOZ ================= */

const botonMicrofono =
document.querySelector(".microfono");

if(botonMicrofono){

    const reconocimiento =
    new webkitSpeechRecognition();

    reconocimiento.lang = "es-ES";

    reconocimiento.continuous = false;

    reconocimiento.interimResults = false;

    botonMicrofono.addEventListener("click", () => {

        reconocimiento.start();

    });

    reconocimiento.onstart = function(){

        botonMicrofono.textContent =
        "🎙️ ESCUCHANDO...";
    };

    reconocimiento.onend = function(){

        botonMicrofono.textContent =
        "🎤 ACTIVAR VOZ";
    };

    reconocimiento.onresult = function(event){

        const comando =
        event.results[0][0].transcript;

        procesarComando(comando);

    };
}