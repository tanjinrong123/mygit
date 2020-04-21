const tabs = {
  state: {
    editableTabsValue2: '',
    editableTabs2: [],
    allFixedTabs: {
      '1': [{
        title: '收费项目维护',
        name: '1',
        value: '/costMaintenance/chargeItemMaintenance'
      }]
    }
  },
  mutations: {
    SET_EDITABLETABSVALUE: (state, activetab) => {
      state.editableTabsValue2 = activetab
    },
    SET_EDITABLETABS: (state, tablist) => {
      state.editableTabs2 = tablist
    },
    ADD_TAB: (state, tab) => {
      state.editableTabs2.push(tab)
    },
    UPDATE_TAB: (state, obj) => {
      state.editableTabs2[obj.index].value = obj.value
      state.editableTabs2[obj.index].title = obj.title
    },
    SET_NEWTITLE: (state, newTitle) => {
      let index = state.editableTabs2.findIndex(function (tab) {
        return tab.name === state.editableTabsValue2
      })
      state.editableTabs2[index].title = newTitle
    }
  },
  actions: {
    SetEditableTabsValue({ commit, state }, targetName) {
      commit('SET_EDITABLETABSVALUE', targetName)
    },
    SetEditableTabs({ commit, state }, targetName) {
      commit('SET_EDITABLETABS', targetName)
    },
    AddTab({ commit, state }, targetName) {
      var name = targetName.name
      var list = state.editableTabs2
      function exit(el) {
        return el.name === name
      }
      function valueExit(el) {
        return el.value === targetName.value
      }
      if (list.find(exit) === undefined) {
        commit('ADD_TAB', targetName)
      } else if (list.find(valueExit) === undefined) {
        let obj = {}
        obj.index = list.findIndex(exit)
        obj.value = targetName.value
        obj.title = targetName.title
        commit('UPDATE_TAB', obj)
      }
    },
    setNewTitle({ commit }, newTitle) {
      commit('SET_NEWTITLE', newTitle)
    }
  }
}
export default tabs
