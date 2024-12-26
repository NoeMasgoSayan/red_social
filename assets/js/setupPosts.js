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

export const setupPosts = (user) => {
  //TODO: CREATE
  postForm.addEventListener("submit", async (e) => {
    // Prevenir que la página se recargue
    e.preventDefault();

    // Obtener los datos del formulario
    const title = postForm["title"].value;
    const description = postForm["description"].value;

    // Crear un nuevo post
    try {
      const time = new Date().toLocaleString("es-PE", {
        timeZone: "America/Lima",
      });

      if (!editStatus) {
        // Crear post
        await createPost(
          title,
          description,
          user.displayName,
          user.photoURL,
          user.email,
          time
        );
        // Mostrar msj de éxito
        showMessage("Post creado", "success");
      } else {
        // Actualizar post
        await updatePost(editId, { title, description, time });
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

      // Guardar URL de la imagen para ponerla en la db
      let photo = data.userImage ? data.userImage : "./assets/img/perfil.png";
      localStorage.setItem("photo", photo);

      postsHtml += `
      <article class="article-post mb-3">
        <header class="d-flex justify-content-between align-items-center m-3">
          <div class="d-flex align-items-center gap-3">
            <img class="post-profile-picture rounded-circle" src="${
              data.userImage ? data.userImage : "./assets/img/perfil.png"
            }" alt="${data.userName}" />
            <p class="m-0">${data.userName}</p>
            <p class="m-0">${data.time}</p>
          </div>
          ${
            user.email === data.userEmail
              ? `<div>
            <button class="btn btn-editar" data-id="${doc.id}"><i class="bi bi-pencil-fill"></i></button>
            <button class="btn btn-eliminar" data-id="${doc.id}"><i class="bi bi-trash3-fill"></i></button>
          </div>`
              : `<div></div>`
          }
        </header>
        <div class="m-3">
          <h4>${data.title}</h4>
          <p>${data.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <button class="btn" data-id="${doc.id}">
              <i class="bi bi-chat-right-dots"></i>
            </button>
            <button class="btn" data-id="${doc.id}">
              <i class="bi bi-heart"></i>
            </button>
          </div>
        </div>
        <!-- Comentarios -->
            <div class="comentarios">
              <div>
                <article class="article-comment">
                  <header
                    class="d-flex justify-content-between align-items-center m-2"
                  >
                    <div class="d-flex align-items-center gap-3">
                      <img class="post-profile-picture rounded-circle" src="${
                        data.userImage
                          ? data.userImage
                          : "./assets/img/perfil.png"
                      }" alt="${data.userName}" />
                      <p class="m-0">${data.userName}</p>
                      <p class="m-0">${data.time}</p>
                    </div>
                  </header>
                  <div id="comment-form-container">
                    <form action="" class="p-3" id="comment-form">
                      <div class="mb-3">
                        <textarea
                          class="comment-control"
                          rows="3"
                          id="descriptionComment"
                          placeholder="..."
                          required
                        ></textarea>
                      </div>
                      <div class="mb-1">
                        <input
                          type="submit"
                          value="Crear comment"
                          id="btn-agregar"
                          class="btn btn-primary"
                        />
                      </div>
                    </form>
                  </div>
                </article>
              </div>
              <div id="comment-container">
                <article class="article-comment">
                  <header
                    class="d-flex justify-content-between align-items-center m-2"
                  >
                    <div class="d-flex align-items-center gap-3">
                      <img class="post-profile-picture rounded-circle" src="${
                        data.userImage
                          ? data.userImage
                          : "./assets/img/perfil.png"
                      }" alt="${data.userName}" />
                      <p class="m-0">${data.userName}</p>
                      <p class="m-0">${data.time}</p>
                    </div>
                    ${
                      user.email === data.userEmail
                        ? `<div>
                      <button
                        class="btn btn-editar-comment"
                        data-id="${doc.id}"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        class="btn btn-eliminar-comment"
                        data-id="${doc.id}"
                      >
                        <i class="bi bi-trash3-fill"></i>
                      </button>
                      <button class="btn" data-id="${doc.id}">
                        <i class="bi bi-heart"></i>
                      </button>
                    </div>`
                        : `<div></div>`
                    }
                  </header>
                  <div class="p-2">
                    <p>description</p>
                  </div>
                </article>
              </div>
            </div>
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
