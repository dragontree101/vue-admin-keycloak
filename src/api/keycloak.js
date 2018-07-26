import request from '@/utils/request'

export function login(username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  params.append('client_id', 'vue-admin')
  params.append('grant_type', 'password')
  params.append('scope', 'openid')
  return request({
    url: 'http://127.0.0.1:8080/auth/realms/master/protocol/openid-connect/token',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: params
  })
}
