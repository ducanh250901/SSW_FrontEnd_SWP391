function checkLogin(){
    const token = localStorage.getItem('token');
    if(token){
        setUserLogin(token);
        return true;
    }
    return false;
}

function setUserLogin(token){
    let user = decodeJWT(token);
    localStorage.setItem('userLogin', JSON.stringify(user));
}

function decodeJWT(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const encodedPayload = parts[1];
  const decodedPayload = atob(encodedPayload);
  const payload = JSON.parse(decodedPayload);

  return payload;
}
