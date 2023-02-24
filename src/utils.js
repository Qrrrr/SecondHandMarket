import { TOKEN_KEY, BASE_URL, SEARCH_KEY } from "./constants";

export const login = (props) => {
    const loginUrl = `${BASE_URL}/login?username=&password`;
  
    return fetch(loginUrl, {
      // fetch -> window 提供的函数， 命令浏览器发送http请求
      method: "POST",
      headers: {
        // request header
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // fetch return ohject, which has .then method
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to log in");
      }
    });
  }; //fetch().then(), 要等response回来后再执行，所以不能分开写
  
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
    const cartURL = `${BASE_URL}/cart`;
    return fetch(cartURL).then((response) => {
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
  
  export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to add menu item to shopping cart");
      }
    });
  };

  // provide search functions for distance, with keyword or maybe others
export const searchPosts = (option) => {
  const {type, input} = option;
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
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    }
  }
  return fetch(opt).then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw Error("Fail to get posts information");
      }
      return res.json();
    });

}
  