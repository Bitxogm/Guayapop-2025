//* loginModel.js


/**
 * Authenticates user and returns JWT token
 * @param {string} email (username) - User's email
 * @param {string} password - User's password
 * @returns {Promise<string>} JWT access token
 * @throws {Error} If authentication fails
 */
export const loginUser = async (email, password) => {
  try {
    console.log('🔄 MODEL: Sending login request...');
    
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password
      })
    });

    // CHECK response.ok BEFORE parsing JSON
    if (!response.ok) {
      
      let errorMessage = 'Login failed';
      
      try {
        const data = await response.json();
        errorMessage = data.message || 'Invalid credentials';
      } catch (parseError) {
        errorMessage = `Server error (${response.status} ${response.statusText})`;
      }
      
      throw new Error(errorMessage, { cause: 'server' });
    }

    //Response OK - safe to parse JSON
    const data = await response.json();
    console.log('✅ MODEL: Login successful, token received');
    
    return data.accessToken; // Return JWT token

  } catch (error) {
    
    // Distinguish between different error types
    if (error.cause === 'server') {
      throw error;
    }
    
    // Network error
    throw new Error('Network error: Unable to reach authentication server');
  }
};