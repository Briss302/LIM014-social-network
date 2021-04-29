import { logOut } from '../controller/firebase-auth.js';
import { addPost, getPosts, addPostTwo } from '../controller/firebase-firestore.js';

export default () => {
  const viewTimeLine = `
    <section class = "user_header">
    <h1> FindMyPaw </h1>
    <figure> 
    <img class= "img_profile" src = "">
    <img class= "img_icon">
    </figure>
    </section>
    <section class = "user_opcion">
    <img class= "img_search" src = "">
    <img class= "img_home" src = "">
    <img class= "img_share" src = "">
    </section>
    <section id ="container-share" class="hide">
      <form class="form-share">
      <input type="text" class="description" placeholder="Add" required>
      <button type="input"> foto </button>
      <button type="submit" class="btn-share"> Compartir </button>
      </form>
    </section>
    <section class="container-post">
    </section> 
  `;

  const divElement = document.createElement('div');
  divElement.innerHTML = viewTimeLine;

  const btnSingOut = divElement.querySelector('button');

  btnSingOut.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('LOG OUT ENVIADO');

    logOut().then(() => {
      window.location.hash = '#/login';
    });
  });

  const userId = firebase.auth().currentUser.uid;
  const btnShare = divElement.querySelector('.btn-share');
  btnShare.addEventListener('click', (e) => {
    e.preventDefault();
    const inputContent = divElement.querySelector('.description').value;
    const formShare = divElement.querySelector('.form-share');
    formShare.reset();
    console.log('ENVIANDO DATOS: ', userId, inputContent);
    addPost(userId, inputContent)
      .then((refDoc) => {
        console.log(`Id del post => ${refDoc.id}`);
      })
      .catch((error) => {
        console.log(`Error creaando el post => ${error}`);
      });
  });

  const containerPost = divElement.querySelector('.container-post');

  getPosts((post) => {
    console.log('post', post);
    post.forEach((x) => {
      containerPost.innerHTML += x.userId;
    });
  });

  return divElement;
};
