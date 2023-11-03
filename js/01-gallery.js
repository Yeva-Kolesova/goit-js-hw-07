import { galleryItems } from './gallery-items.js';
// Change code below this line

let instance = null;
const galleryWrapperEl = document.querySelector('.gallery');

const imageTemplate = galleryItems.map(image => {
  const { preview, original, description } = image;
  return `
   <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
}).join('');


galleryWrapperEl.insertAdjacentHTML('afterbegin', imageTemplate);

const onGalleryItemClick = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const originalPath = event.target.dataset.source;

  const basicLightboxOptions = {
    onClose() {
      document.removeEventListener("keydown", onDocumentKeyPress);
    }
  }

  instance = basicLightbox.create(`
    <img src="${originalPath}" width="800" height="600">
  `,
    basicLightboxOptions);

  instance.show();

  document.addEventListener("keydown", onDocumentKeyPress);
}

const onDocumentKeyPress = ({ code }) => {
  if (code === "Escape") {
    instance.close();
  }
};

galleryWrapperEl.addEventListener('click', onGalleryItemClick);