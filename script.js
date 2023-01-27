const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let isInitialLoad = true;
let initialCount = 5;
const apiKey = 's73vhp8U8-19t9OTo-Faunb8xLmuFvL9ZBAtqIimhAM';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        // Page ready
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to Set Attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }

// Create elements for links and photos. Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create anchor to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create image per photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //  Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put image inside anchor element and them put both into imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30); 
            isInitialLoad = false; 
        } 
    } catch (error) {
        // Catch error here
    }
}

// Check if scroll bar is at botton of page, call getPhotos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready) {
        getPhotos();
        console.log('load more');
        ready = false;
    }
});

// On Load
getPhotos();