import { TOKEN_KEY, BASE_URL, SEARCH_KEY } from "./constants";

export const login = (credential) => {
  const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;

  return fetch(loginUrl, {
    // fetch = api from window object (浏览器提供的)
    method: "POST",
    headers: {
      // request header
      "Content-Type": "application/json",
    },
    credentials: "include", // 接受cookie to hold the token
  }).then((response) => {
    // fetch returns a object(response) that will have api: then (response may not be valid)
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
  });
};

export const signup = (data) => {
  const signupUrl = "/signup";

  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to sign up");
    }
  });
};

export const getCart = () => {
  return fetch("/cart").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get shopping cart data");
    }

    return response.json();
  });
};

export const checkout = () => {
  return fetch("/checkout").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to checkout");
    }
  });
};

export const addItemToCart = (postId) => {
  return fetch(`/addtocart/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to add item to shopping cart");
    }
  });
};

// provide search functions for distance, with keyword or maybe others
export const searchPosts = (option) => {
  const { type, input } = option;
  let url = "";
  if (type === SEARCH_KEY.distance) {
    url = `${BASE_URL}/search?distance=${input}`;
  } else if (type === SEARCH_KEY.keyword) {
    url = `${BASE_URL}/search?keywords=${input}`;
  }
  const opt = {
    method: "GET",
    url: url,
    header: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  };
  return fetch(opt).then((res) => {
    if (res.status < 200 || res.status >= 300) {
      throw Error("Fail to get posts information");
    }
    return res.json();
  });
};

export const deleteItemFromCart = (itemId) => {
  return fetch(`/updatecart/${itemId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to delete item in shopping cart");
    }
  });
};

export const getPost = () => {
  return fetch("/posts").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get all posts");
    }
    return response.json();
  });
};
