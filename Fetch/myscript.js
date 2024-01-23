const photoContainer = document.getElementById('photoContainer');
const loadButton = document.getElementById('loadButton');
const grayscaleToggle = document.getElementById('grayscaleToggle');
let page = 1;
let photosLoaded = 0;

const fetchPhotos = async () => {
    const perPage = 4;

    const apiUrl = `https://picsum.photos/v2/list?page=${page}&limit=${perPage}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length > 0) {
            data.forEach(photo => {
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');

                const img = document.createElement('img');
                img.src = `https://picsum.photos/id/${photo.id}/750/400`;
                img.alt = photo.author || 'Random Photo';
                img.classList.add('photo');

                const textBlock = document.createElement('div');
                textBlock.classList.add('text-block');
                textBlock.textContent = 'Ege Dursun';

                imgContainer.appendChild(img);
                imgContainer.appendChild(textBlock);
                photoContainer.appendChild(imgContainer);
                
                photosLoaded++;
            });

            page++;
        } else {
            loadButton.disabled = true;
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
};

const applyGrayscale = () => {
    const images = photoContainer.querySelectorAll('.photo');
    images.forEach(img => {
        img.classList.toggle('grayscale', grayscaleToggle.checked);
    });
};

const handleButtonClick = () => {
    photosLoaded = 0;
    photoContainer.innerHTML = '';
    loadButton.disabled = false;
    fetchPhotos();
};


loadButton.addEventListener('click', handleButtonClick);
grayscaleToggle.addEventListener('change', applyGrayscale);

fetchPhotos();
