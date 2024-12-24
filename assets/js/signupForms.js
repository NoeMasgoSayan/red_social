import { auth, updateProfile } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  // Evitar que se recargue la página
  e.preventDefault();
  console.log("Formulario enviado");

  // Obtener los datos del formulario mediante sus id
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;
  const displayName = signUpForm["signup-name"].value;

  // Manejo de errores
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Actualizar el perfil de usuario
    let photoURL = localStorage.getItem("photo");
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });

    // Registro exitoso
    // Mostrar mensaje de éxito
    showMessage("Usuario registrado", "success");

    // Cerrar el modal
    const signupModal = document.querySelector("#cardRegistrarse");
    signupModal.style.display = "none";

    //
    /*const navbarBtns = document.querySelector("#navbar-btns");
    navbarBtns.style.display = "block";*/

    // Limpiar el formulario
    signUpForm.reset();
  } catch (error) {
    // Registro fallido
    console.log(error);
    // Mostrar mensaje de error
    if (error.code === "auth/email-already-in-use") {
      showMessage("El correo ya está en uso", "error");
    } else if (error.code === "auth/weak-password") {
      showMessage("La contraseña es muy debil", "error");
    } else if (error.code === "auth/invalid-email") {
      showMessage("Correo electrónico inválido", "error");
    } else {
      showMessage(error.code, "error");
    }
  }
});
