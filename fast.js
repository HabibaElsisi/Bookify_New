import fetch from 'node-fetch';

const baseUrl = 'http://127.0.0.1:8000';

const fetchBookRecommendations = async (bookName) => {
    const url = `${baseUrl}/recommend`;
    const requestBody = { book_name: bookName };

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

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
