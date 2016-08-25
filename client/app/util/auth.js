export function isLoggedIn(auth){
  return (auth.authkey && auth.authkey !== null);
}
