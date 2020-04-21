const menu = {
  state: {
    showMenu:true,
    menuIndex: '1',
    // projectName:''
  },
  mutations: {
    SET_SHOWMENU:(state,res)=>{
    state.showMenu = res
    },
    // SET_MENUINDEX(state, res) {
    //   state.menuIndex=res.name
    // }
  },
  actions: {
    // setMenuIndex({ commit, state }, value) {
    //   commit('SET_MENUINDEX', value)
    // }
  }
}

export default menu
