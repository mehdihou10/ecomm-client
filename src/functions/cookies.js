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
