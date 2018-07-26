import Cookies from 'js-cookie'

const UserTokenKey = 'user-token'
const UserIDToken = 'user-id-token'
const UserRefreshToken = 'user-refresh-token'

export function getUserToken() {
  return Cookies.get(UserTokenKey)
}

export function getUserIdToken() {
  return Cookies.get(UserIDToken)
}

export function getUserRefreshToken() {
  return Cookies.get(UserRefreshToken)
}

export function setToken(state) {
  Cookies.set(UserTokenKey, state.keycloak.token)
  Cookies.set(UserIDToken, state.keycloak.idToken)
  Cookies.set(UserRefreshToken, state.keycloak.refreshToken)
}

export function setTokenByResponse(data) {
  Cookies.set(UserTokenKey, data.access_token)
  Cookies.set(UserIDToken, data.id_token)
  Cookies.set(UserRefreshToken, data.refresh_token)
}

export function removeUserToken() {
  Cookies.remove(UserTokenKey)
}

export function removeToken() {
  Cookies.remove(UserTokenKey)
  Cookies.remove(UserIDToken)
  Cookies.remove(UserRefreshToken)
}

export function getInfoByToken(token) {
  token = token.split('.')[1]

  token = token.replace('/-/g', '+')
  token = token.replace('/_/g', '/')
  switch (token.length % 4) {
    case 0:
      break
    case 2:
      token += '=='
      break
    case 3:
      token += '='
      break
    default:
      throw Error('Invalid token')
  }

  token = (token + '===').slice(0, token.length + (token.length % 4))
  token = token.replace(/-/g, '+').replace(/_/g, '/')
  token = decodeURIComponent(escape(atob(token)))
  const info = JSON.parse(token)
  return info
}
