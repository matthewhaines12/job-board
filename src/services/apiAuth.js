const AUTH_API_URL = import.meta.env.VITE_API_URL2;

const signup = async (userData) => {
  // Make the POST request with JSON body
  console.log("API SIGNUP POST URL:", `${AUTH_API_URL}/signup`);
  const response = await fetch(`${AUTH_API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Signup failed");
  }

  return await response.json();
};

const login = async (credentials) => {
  console.log("API LOGIN POST URL:", `${AUTH_API_URL}/login`);
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

  return await response.json();
};

const refresh = async () => {
  console.log("API REFRESH POST URL:", `${AUTH_API_URL}/refresh`);
  const response = await fetch(`${AUTH_API_URL}/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Refresh failed");
  }

  return await response.json();
};

const logout = async () => {
  console.log("API LOGOUT POST URL:", `${AUTH_API_URL}/logout`);
  const response = await fetch(`${AUTH_API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "logout failed");
  }

  return await response.json();
};

export { signup, login, refresh, logout };
