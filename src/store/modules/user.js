import { login } from '@/api/keycloak'
import { getInfoByToken, getUserToken, getUserRefreshToken, getUserIdToken, setTokenByResponse, setToken, removeToken, removeUserToken } from '@/utils/auth'
import Keycloak from 'keycloak-js'

const user = {
  state: {
    keycloak: new Keycloak({ url: 'http://127.0.0.1:8080/auth', realm: 'master', clientId: 'vue-admin' }),
    // keycloak: new Keycloak('keycloak.json'),
    token: getUserToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    INIT_KEYCLOAK: (state, data) => {
      state.keycloak.init({
        token: data.access_token,
        refreshToken: data.refresh_token,
        idToken: data.id_token,
        timeSkew: 0,
        checkLoginIframe: false
      })
      state.keycloak.onAuthRefreshSuccess = () => {
        console.log('auth refresh success')
        state.token = state.keycloak.token
        setToken(state)
      }
      setInterval(() => {
        state.keycloak.updateToken(30).success(refreshed => {
          if (refreshed) {
            console.log('token auto refreshed')
          } else {
            console.log('Token not refreshed, valid for ' + Math.round(state.keycloak.tokenParsed.exp + state.keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
          }
        }).error(() => {
          console.log('Failed to refresh token')
        })
      }, 10000)
    }
  },

  actions: {
    // 通过keycloak进行登录
    keycloakLogin({ commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
        const username = userInfo.username.trim()
        const password = userInfo.password.trim()
        login(username, password).then(response => {
          const data = response.data
          commit('INIT_KEYCLOAK', data)
          commit('SET_TOKEN', data.access_token)
          commit('SET_NAME', username)
          // console.log('keycloakLogin success, keycloak is ' + state.keycloak)
          // debugger
          setTokenByResponse(data)
          resolve()
        }).catch(error => {
          removeToken()
          reject(error)
        })
      })
    },

    // 通过keycloak获取用户信息
    keycloakInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const info = getInfoByToken(state.token)
        commit('SET_ROLES', info.realm_access.roles)
        commit('SET_NAME', info.name)
        commit('INIT_KEYCLOAK', {
          access_token: getUserToken(),
          refresh_token: getUserRefreshToken(),
          id_token: getUserIdToken()
        })
        return resolve(info.realm_access.roles)
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeUserToken()
        resolve()
      })
    }
  }
}

export default user
