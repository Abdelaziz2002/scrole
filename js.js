const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader-container');
let photosArray = [];

const count = 20;
const apikey = 'qDEMoqDe8a2JiQVhetyqXMy5OnSpRAS10x_KVy3Gmsw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

let loadedimages=0;
let totalimages = 0;
let ready = false;

function loading() {
    console.log('image loaded')
    loadedimages++;
    if (loadedimages === totalimages) {
        loader.hidden = true;
        ready = true;
        console.log(loadedimages);
        console.log('ready',ready);    
    }
}

function setAttributtes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//desplaying photos
function displayphotos() {
    loadedimages=0;
    totalimages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributtes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        setAttributtes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load',loading());
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
//get photos from unsplush
async function getphotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayphotos();
    } catch (error) {
        console.log('wtf');
    }
}
getphotos();


window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        console.log('load more');
        getphotos();     
        ready = false;
    }
});

