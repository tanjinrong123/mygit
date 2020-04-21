// import { getuserinfo } from '../../api/login'

const state = {
  showMenu:true,
  

  token: sessionStorage.getItem('token'),
  user: {},
  system: sessionStorage.getItem('system'),
  roles: [],
  otherSide: {},
  messages: []
}
const mutations = {
 
  CLEAR_MESSAGES: (state, message) => {
    state.messages = []
  }
}
const actions = {
  
  // 获取用户信息
  GetUserInfo({ commit, state }) {
    // debugger
    return new Promise((resolve, reject) => {
      getuserinfo({ systemId: state.system }).then(res => {
        commit('SET_USER', res.data.extra.user)
        commit('SET_ROLES', res.data.extra.role)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  GetOtherSide({ commit, state }, otherSideObj) {
    commit('SET_OTHERSIDE', otherSideObj)
  },
  
}
const user = {
  state,
  mutations,
  actions
}
export default user
