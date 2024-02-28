import axios from 'axios';

const getSearchResults = async (query) => {
    try {
        const response = await axios.get(`/v1/search/local.json`, {
            params: { query, display: 5 },
            headers: {
                'X-Naver-Client-Id': process.env.REACT_APP_NAVER_SEARCH_ID,
                'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_SEARCH_SECRET,
            }
        });
        return response.data.items;
    } catch (error) {
        console.error('Failed to fetch Naver search results', error);
        throw error;
    }
};

export default getSearchResults;