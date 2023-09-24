function cargarYAplicarFuente() {
  // Crear un objeto FontFace para la fuente personalizada
  const customFont = new FontFace(
    "IndieFlower",
    "url(fonts/IndieFlower-Regular.ttf)",
  );

  // Cargar la fuente
  customFont.load().then((loadedFont) => {
    // Agregar la fuente cargada al documento
    document.fonts.add(loadedFont);

    // Aplicar la fuente a elementos HTML
    const elementosConFuentePersonalizada = document.querySelectorAll("body");
    elementosConFuentePersonalizada.forEach((elemento) => {
      elemento.style.fontFamily = "IndieFlower, Arial, sans-serif";
    });

    // Ahora puedes utilizar la fuente personalizada en estos elementos
  });
}

// Llamar a la función después de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", cargarYAplicarFuente);
