function recibirComentarios(){
    const comentarios = [];

    const boton = document.getElementById('botonComentario');
    const textarea = document.getElementById('inputComentario');

    boton.addEventListener('click', function() {
        const texto = textarea.value.trim();

        if (texto === "") {
            alert("Por favor, escribí un comentario antes de enviarlo.");
            return;
        }

        comentarios.push(texto); // Guardar en el array
        console.log("Comentarios:", comentarios);

        textarea.value = ""; // Limpiar textarea

        // Mostrar agradecimiento
        alert("¡Gracias por dejarnos tu comentario!");
    });
}