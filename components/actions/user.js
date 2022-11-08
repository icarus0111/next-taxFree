export const loginUser = (payload) => {
  return {
    type:'LOGIN_USER',
    payload
  }
}

export const logoutUser = () => {
  return {
    type:'LOGOUT_USER',
  }
}
