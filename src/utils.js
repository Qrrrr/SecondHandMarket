export const login = (credential) => {
    const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;
  
    return fetch(loginUrl, {
      // fetch -> window 提供的函数， 命令浏览器发送http请求
      method: "POST",
      headers: {
        // request header
        "Content-Type": "application/json",
      },
      credentials: "include", // when sending request, 带session id的cookies，验证
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
  
  export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to add menu item to shopping cart");
      }
    });
  };
  