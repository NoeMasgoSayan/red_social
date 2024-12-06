import { createPost, onGetPost, deletePost } from "./firebase.js";
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
      // doc.data() : Nos da el dato del post
      console.log(doc.data());
      // doc.id : Nos da el id del post
      console.log(`id del post: ${doc.id}`);
      const data = doc.data();

      postsHtml += `
      <article class="post-container border border-2 rounded-2 p-3 my-3">
        <header class="d-flex justify-content-between">
          <h4>${data.title}</h4>
          <div>
            <button class="btn btn-danger btn-eliminar" data-id="${doc.id}"><i class="bi bi-trash3-fill"></i> Eliminar</button>
          </div>
        </header>
        <hr />
        <p>${data.description}</p>
      </article>
      `;
    });

    // Mostrar los posts en el DOM
    postsContainer.innerHTML = postsHtml;

    // UPDATE

    //TODO: DELETE
    // Obtenemos los botones de eliminar
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    // Iteramos sobre cada botón
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        console.log(`id del click en el btn eliminar: ${dataset.id}}`);
        deletePost(dataset.id);
        showMessage("Post eliminado", "success");
      });
    });
  });
};
