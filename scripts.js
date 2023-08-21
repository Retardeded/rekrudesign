document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function generateGalleryItems(numPhotos) {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = ''; // Clear the current photos
    
    for (let i = 1; i <= numPhotos && i <= 12; i++) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('grid-item');
        
        const img = document.createElement('img');
        img.src = `photos/Photo${i}.png`;
        img.alt = `Project Photo ${i}`;
        
        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
    }
    
    // Layout Masonry after each image loads
    imagesLoaded(galleryContainer, function() {
        refreshMasonry();
    });
}

let msnry = null; // Masonry instance variable, so it can be reused

function initMasonry() {
    var elem = document.querySelector('.grid');
    msnry = new Masonry( elem, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
    });

    // Use imagesLoaded to ensure all images have loaded before initializing Masonry
    imagesLoaded(elem).on('progress', function() {
        // Trigger layout after each image loads
        msnry.layout();
    });
}

function refreshMasonry() {
    if (msnry) {
        // Reload Masonry after adding new items
        msnry.reloadItems();
        msnry.layout();
    }
}

let currentNumberOfPhotosDisplayed = 9; // initial 9 photos

document.addEventListener('DOMContentLoaded', function() {
    // Generate gallery items and initialize Masonry in the DOMContentLoaded event
    generateGalleryItems(currentNumberOfPhotosDisplayed);
    initMasonry();

    const btnExpand = document.querySelector('.btn-expand');
    if (btnExpand) {
        btnExpand.addEventListener('click', function() {
            currentNumberOfPhotosDisplayed += 3;
            generateGalleryItems(currentNumberOfPhotosDisplayed); 
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.btn-custom-search');
    const searchForm = document.querySelector('.d-flex');

    // Define a function to handle the button click
    function handleSearchButtonClick(event) {
        if (window.innerWidth > 992) {
            event.preventDefault();
            searchForm.classList.toggle('active');
        } else {
            event.preventDefault(); // Prevent default behavior without toggling
        }
    }

    // Attach the click event listener to the button
    searchButton.addEventListener('click', handleSearchButtonClick);
});


