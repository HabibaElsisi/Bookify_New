// import axios from 'axios';

// // Define the URL of your FastAPI endpoint
// // const apiUrl = 'http://localhost:3000/recommend'; // Update with the actual URL of your FastAPI endpoint

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






// import fetch from 'node-fetch';

// // Define the input data for the recommendation request
// const inputData = {
//     book_name: 'Your Book Name Here' // Replace 'Your Book Name Here' with the actual book name
// };

// // Define the URL of the FastAPI endpoint
// const apiUrl = 'http://localhost:8000/recommend'; // Replace 'http://localhost:8000/recommend' with the actual URL of your FastAPI endpoint

// // Make a POST request to the FastAPI endpoint
// fetch(apiUrl, {
//     method: 'POST',
//     body: JSON.stringify(inputData),
//     headers: { 'Content-Type': 'application/json' }
// })
// .then(response => {
//     // Check if the response status is OK (HTTP 200)
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     // Parse the JSON response
//     return response.json();
// })
// .then(data => {
//     // Handle the response from the FastAPI endpoint
//     console.log('Recommended Books:', data.recommended_books);
// })
// .catch(error => {
//     // Handle errors
//     console.error('Error:', error);
// });

