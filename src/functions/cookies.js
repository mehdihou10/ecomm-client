export const isCookieExists = () => {
  let findCookie = document.cookie
    .split(";")
    .filter((ck) => ck.includes("user"));

  return findCookie.length === 0
    ? false
    : findCookie[0].split("=")[1] === null
    ? false
    : true;
};

export const getCookie = () => {
  const mainCookie = document.cookie
    .split(";")
    .filter((ck) => ck.includes("user"))[0]
    .split("=")[1];
  return mainCookie;
};

export const setCookie = (value,days)=>{

  const date = new Date();
  
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  
  let expires = 'expires=' + date.toUTCString();
  
  document.cookie = `user=${value}; ${expires}`;
}

export const deleteCookie = ()=>{
    setCookie(null,null)
}
