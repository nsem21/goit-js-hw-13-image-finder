import './css/main-styles.css';
import './css/lightbox.css';
import "@pnotify/core/dist/BrightTheme.css";
import { error } from '@pnotify/core';
import API from './additianal-js/fetchImage.js';
import MODULE from './additianal-js/module.js';
import templateCard from './templates/card.hbs';

import InfiniteScroll from 'infinite-scroll';


let pageCount = 1;
let userInput = '';


const PAGINATION_NUMBER = 12;
const ref = {
    container: document.querySelector('.container'),
    inputQuery: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    searchBtn: document.querySelector('.search-btn'),
    loadBtn: document.querySelector('.load-more'),
    body: document.querySelector('body'),
    module: document.querySelector('.js-lightbox'),
    moduleOverlay: document.querySelector('.lightbox__overlay')
}



ref.searchBtn.addEventListener('click', searchImg);
ref.loadBtn.addEventListener('click', nextPage);
ref.inputQuery.addEventListener('input', clearGallery);
ref.gallery.addEventListener('click', onGalleryClick);
ref.moduleOverlay.addEventListener('click', MODULE.onCloseModule);





function onGalleryClick(event) {
    if (!event.target.classList.contains('card-image')) {
        return;
    }
    const focusImg = event.target;
    const bigSrc = focusImg.dataset.source;

    ref.module.classList.add('is-open');

    MODULE.updateAttributes(bigSrc);
    window.addEventListener('keydown', MODULE.onKeyPress);
}


function searchImg() {
    userInput = ref.inputQuery.value;
    if (!userInput) {
        return;
    }
    fetchGallery(userInput, pageCount, false, 0);
}

function nextPage() {
    pageCount += 1;
    const scrollHeight = ref.body.clientHeight;
    fetchGallery(userInput, pageCount, true, scrollHeight);
}

function clearGallery() {
    ref.loadBtn.classList.add('is-hidden');
    pageCount = 1;
    while (ref.gallery.firstChild) {
        ref.gallery.removeChild(ref.gallery.lastChild);
    }
}

async function fetchGallery(userQuery, pageNumber, needScroll, scrollHeight) {
    try {
        const apiResponse = await API.fetchImage(userQuery, pageNumber, PAGINATION_NUMBER);
        console.log(apiResponse);
        const cards = apiResponse.hits;
        if (cards.length === 0) {
            notification('No results');
            return;
        }
        if (cards.length === PAGINATION_NUMBER) {
            ref.loadBtn.classList.remove('is-hidden');
        }
        renderGallery(cards);

        if (needScroll) {

            window.scrollTo(0, scrollHeight);

        }
    } catch {
        notification("Sorry, there is some error.");
    }

}

function renderGallery(cards) {
    const newGallery = templateCard([...cards]);
    ref.gallery.insertAdjacentHTML('beforeend', newGallery);
}

function notification(textErr) {
    error({
        type: 'error',
        text: textErr,
        hide: true,
        delay: '500',
        closer: false,
        sticker: false
    });
}