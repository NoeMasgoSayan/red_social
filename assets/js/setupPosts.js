import {
  createPost,
  onGetPost,
  deletePost,
  updatePost,
  getPost,
} from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const postForm = document.querySelector("#post-form");
const postsContainer = document.querySelector("#posts-container");

// Variables para la edición
let editStatus = false;
let editId = "";

export const setupPosts = () => {
  //TODO: CREATE
  postForm.addEventListener("submit", async (e) => {
    // Prevenir que la página se recargue
    e.preventDefault();

    // Obtener los datos del formulario
    const title = postForm["title"].value;
    const description = postForm["description"].value;

    // Crear un nuevo post
    try {
      if (!editStatus) {
        // Crear post
        await createPost(title, description);
        // Mostrar msj de éxito
        showMessage("Post creado", "success");
      } else {
        // Actualizar post
        await updatePost(editId, { title, description });
        // Mostar msj de éxito
        showMessage("Post actualizado", "success");

        // Cambiar el estado de edición
        editStatus = false;
        // Cambiar el id de edición
        editId = "";

        // Cambiamos lo que muestra el formulario
        document.getElementById("form-title").innerHTML =
          "Agregar un nuevo post";
        postForm["btn-agregar"].value = "Crear post";
      }
      // Limpiar el formulario
      postForm.reset();
    } catch (error) {
      // Mostrar msj de error
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
            <button class="btn btn-info btn-editar" data-id="${doc.id}"><i class="bi bi-pencil-fill"></i> Editar</button>
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

    //TODO: UPDATE
    // Obtenemos los btns de editar
    const btnsEditar = document.querySelectorAll(".btn-editar");

    // Iteramos sobre cada botón
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        console.log(`id del click en el btn editar: ${dataset.id}}`);
        // Obtenemos el documento
        const doc = await getPost(dataset.id);
        // Obtenemos los datos
        const post = doc.data();

        // LLenamos el formulario con los datos
        postForm["title"].value = post.title;
        postForm["description"].value = post.description;

        // Actualizamos el estado de edición y el id edición
        editStatus = true;
        editId = doc.id;

        // Cambiamos lo que muestra el formulario
        document.getElementById("form-title").innerHTML = "Editar post";
        postForm["btn-agregar"].value = "Guardar cambios";
      });
    });

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
