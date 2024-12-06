const navbarBtns = document.querySelector("#navbar-btns");
const cardInicioSesion = document.querySelector("#cardInicioSesion");
const mainContainer = document.querySelector("#main-container");
const saludo = document.querySelector("#saludo");

export const checkLogin = (user) => {
  // Modificamos el nav dependiendo si el usuario está logeado o no
  if (user) {
    navbarBtns.style.display = "block";
    cardInicioSesion.style.display = "none";

    // Mostramos el main container
    mainContainer.style.display = "block";
    saludo.textContent = `Bienvenid@ ${user.email}`;
    console.log("saludo");
  } else {
    navbarBtns.style.display = "none";
    cardInicioSesion.style.display = "block";

    // Ocultamos el main container
    mainContainer.style.display = "none";
    saludo.textContent = "";
  }
};
