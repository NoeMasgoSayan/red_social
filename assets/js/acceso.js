function mostrarCard(tipo) {
  /*document.getElementById("botonesIniciales").style.display = "none";*/
  if (tipo === "inicioSesion") {
    document.getElementById("cardInicioSesion").style.display = "block";
    document.getElementById("cardRegistrarse").style.display = "none";
  } else if (tipo === "registrarse") {
    document.getElementById("cardInicioSesion").style.display = "none";
    document.getElementById("cardRegistrarse").style.display = "block";
  }
}
