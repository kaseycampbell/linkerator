const BASE = ""

export const logInUser = async (username, password) => {
  try {
    const response = await fetch(
      `/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    const user = await response.json();
    console.log("log in user", user)

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const handleLogOut = () => {
  deleteToken();
  window.location.reload();
}

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};