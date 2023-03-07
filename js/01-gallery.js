import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// Створення і рендер розмітки

const divEl = document.querySelector(".gallery");

const galleryEl = galleryItems
  .map(({ preview, original, description }) => {
    return ` <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>`;
  })
  .join("");

divEl.innerHTML = galleryEl;

// Реалізація делегування

divEl.addEventListener("click", handleImgClick);

function handleImgClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const imgUrl = event.target.dataset.source;
  const modalItem = basicLightbox.create(`
    <img src="${imgUrl}" width="800" height="600">
`);
  modalItem.show();

  // закриття по Esc

  const visible = basicLightbox.visible();
  if (visible) {
    document.addEventListener("keydown", handleEscPress);
  } else {
    document.removeEventListener("keydown", handleEscPress);
  }

  function handleEscPress(evt) {
    if (evt.code === "Escape") {
      modalItem.close();
    }
  }
}
