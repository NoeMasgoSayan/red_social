import { createPost, onGetPost } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const postForm = document.querySelector("#post-form");
const postsContainer = document.querySelector("#posts-container");

export const setupPosts = () => {
  //TODO: CREATE
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

  //TODO: READ
  onGetPost((querySnapshot) => {
    let postsHtml = "";

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const data = doc.data();

      postsHtml += `
      <article class="post-container border border-2 rounded-2 p-3 my-3">
        <h4>${data.title}</h4>
        <hr />
        <p>${data.description}</p>
      </article>
      `;
    });

    // Mostrar los posts en el DOM
    postsContainer.innerHTML = postsHtml;
  });
};
