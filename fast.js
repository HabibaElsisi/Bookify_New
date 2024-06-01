import fetch from 'node-fetch';

const baseUrl = 'https://e628-41-232-244-222.ngrok-free.app';

const fetchBookRecommendations = async (bookName) => {
    const url = `${baseUrl}/recommend?book_name=${bookName}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData.recommended_books;
    } catch (error) {
        console.error('Error fetching book recommendations:', error.message);
        throw error;
    }
};

export { fetchBookRecommendations };
