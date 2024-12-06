const navbarBtns = document.querySelector("#navbar-btns");
const cardInicioSesion = document.querySelector("#cardInicioSesion");

export const checkLogin = (user) => {
  if (user) {
    navbarBtns.style.display = "block";
    cardInicioSesion.style.display = "none";
  } else {
    navbarBtns.style.display = "none";
    cardInicioSesion.style.display = "block";
  }
};
