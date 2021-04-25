const ref = {
    gallery: document.querySelector('.gallery'),
    module: document.querySelector('.js-lightbox'),
    bigImage: document.querySelector('.lightbox__image')

}

function onCloseModule() {
    window.removeEventListener('keydown', onKeyPress);
    ref.module.classList.remove('is-open');
    updateAttributes('');
}

function updateAttributes(src) {
    ref.bigImage.src = src;
}

function onKeyPress(event) {
    if (event.code === "Escape") {
        onCloseModule();
    }
}

export default { onCloseModule, onKeyPress, updateAttributes };