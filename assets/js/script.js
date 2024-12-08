import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { checkLogin } from "./checkLogin.js";
// Importamos el archivo de registro
import "./signupForms.js";
import "./signOut.js";
import "./signinForms.js";
import "./googleLogin.js";

//console.log(auth);
// Manejo de la autenticación
onAuthStateChanged(auth, async (user) => {
  console.log(user);
  checkLogin(user);

  if (user) {
    const id = user.uid;
    localStorage.setItem("idPerfil", id);

    const displayName = user.displayName;
    localStorage.setItem("namePerfil", displayName);

    const email = user.email;
    localStorage.setItem("emailPerfil", email);

    const photo = user.photoURL;
    localStorage.setItem("photoPerfil", photo);
  }
});
