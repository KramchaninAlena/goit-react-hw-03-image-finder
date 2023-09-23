import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = 'https://pixabay.com/api/'
const KEY = '38631130-27e1bc4ae57544a30c421ce1d';

export async function pixabayAPI(query, page) {
	return await axios(`?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
	
}



