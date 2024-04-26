// import axios from 'axios';

// // Define the URL of your FastAPI endpoint
// const apiUrl = 'http://localhost:3000/recommend'; // Update with the actual URL of your FastAPI endpoint

// // Define the book name to be recommended


// // Define an asynchronous function to fetch book recommendations
// const fetchBookRecommendations = async (bookName) => {
//     try {
//         // Make a POST request to the FastAPI endpoint
//         const response = await axios.post('https://bookify-new.onrender.com/recommend', { book_name: bookName });

//         // Return the recommended books from the response
//         return response.data.recommended_books;
//     } catch (error) {
//         // Handle errors
//         console.error('Error fetching book recommendations:', error.message);
//         throw error; // Re-throw the error to handle it further upstream
//     }
// };

// export { fetchBookRecommendations };
