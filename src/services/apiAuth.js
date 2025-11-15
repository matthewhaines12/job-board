const AUTH_API_URL = import.meta.env.VITE_API_URL2;

const signup = async (userData) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.error || `Signup failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.error || `Login failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const refresh = async () => {
  try {
    const response = await fetch(`${AUTH_API_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Session expired");
    }

    return data;
  } catch (error) {
    console.error("Refresh error:", error);
    throw error;
  }
};

const logout = async () => {
  console.log("API LOGOUT POST URL:", `${AUTH_API_URL}/logout`);
  try {
    const response = await fetch(`${AUTH_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Logout failed");
    }

    return data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export { signup, login, refresh, logout };
