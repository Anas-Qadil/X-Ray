const logUserInBasedOnToken = async () => {
	const token = localStorage.getItem("token");
  if (token) {
    const { data } = await client.query({
      query: IS_LOGGED_IN
    });
    if (data.isLoggedIn) {
      return true;
    }
  }
  return false;
}

export default logUserInBasedOnToken;