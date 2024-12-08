import { createPerfil } from "./firebase.js";

export const setupPerfil = () => {
  let id = localStorage.getItem("idPerfil");
  let displayName = localStorage.getItem("namePerfil");
  let email = localStorage.getItem("emailPerfil");
  let photo = localStorage.getItem("photoPerfil");

  try {
    createPerfil(id, displayName, email, photo);
  } catch (error) {
    console.log("problemas con perfil");
  }
};
