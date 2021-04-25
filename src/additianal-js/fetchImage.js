const API_KEY = '21313358-1d6d5867e5dc6c68143bd5df5';
const BASIC_URL = 'https://pixabay.com/api/';


async function fetchImage(searchQuery, pageNumber, paginationNum) {
    try {
        const response = await fetch(`${BASIC_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=${paginationNum}&key=${API_KEY}`);

        if (!response.ok) {
            throw Error;
        } else {
            return (response.json());
        }
    } catch {
        console.log('Error!')
    }
}

export default { fetchImage };