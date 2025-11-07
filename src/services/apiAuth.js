const AUTH_API_URL = import.meta.env.VITE_API_URL_2;

export async function signup(userData) {
  try {
    // Make the POST request with JSON body
    const response = await fetch(`${AUTH_API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(credentials) {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
