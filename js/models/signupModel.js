//* signupModel.js

/**
 * Creates a new user account in the system
 * 
 * @param {string} email - User's email address (used as username)
 * @param {string} password - User's password (min 8 characters)
 * @returns {Promise<void>} Resolves if user created successfully
 * @throws {Error} Throws error with descriptive message if registration fails
 */

export const createUser = async (email, password) => {

  try {
    
    // Send a POST request to the backend to create a new user
    const response = await fetch('http://localhost:8000/auth/register', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,  // Backend expects 'username' field
        password          
      })
    });

    //  Check response.ok BEFORE parsing JSON
    if (!response.ok) {
      
      // Try to parse error message from backend
      let errorMessage = 'Registration failed';
      
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch (parseError) {
        // Backend didn't return JSON 
        errorMessage = `Server error (${response.status} ${response.statusText})`;
      }
      
      throw new Error(errorMessage, { cause: 'server' });
    }

    // Response OK - safe to parse JSON
    const data = await response.json();
    console.log('✅ user created:' , data)
    
  } catch (error) {
    
    // Throw error to controller
    // Distinguish between different error types
    if (error.cause === 'server') {
      // Backend error (already has descriptive message)
      throw error;
    }
    // Network/fetch error (backend unreachable, CORS, timeout, etc.)
    throw new Error('Could not connect to server. Please check your connection and try again.');
  }
};