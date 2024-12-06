import { createPost } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const postForm = document.querySelector("#post-form");

export const setupPosts = () => {
  // CREATE
  postForm.addEventListener("submit", async (e) => {
    // Prevenir que la página se recargue
    e.preventDefault();

    // Obtener los datos del formulario
    const title = postForm["title"].value;
    const description = postForm["description"].value;

    // Crear una nueva tarea
    try {
      await createPost(title, description);
      // Mostrar mensaje de éxito
      showMessage("Tarea creada", "success");
      // Limpiar el formulario
      postForm.reset();
    } catch (error) {
      // Mostrar mensaje de error
      showMessage(error.code, "error");
    }
  });
};
