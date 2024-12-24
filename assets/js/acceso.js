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

function mostrarPerfil(tipo) {
  if (tipo === "perfil") {
    document.getElementById("main-perfil").style.display = "block";
    document.getElementById("main-container").style.display = "none";
  } else if (tipo === "redSocial") {
    document.getElementById("main-perfil").style.display = "none";
    document.getElementById("main-container").style.display = "flex";
  }
}
