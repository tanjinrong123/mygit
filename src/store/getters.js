const getters = {
  permissList: state => state.user.permissList,
  token: state => state.user.token,
  editableTabsValue2: state => state.tabs.editableTabsValue2,
  editableTabs2: state => state.tabs.editableTabs2,
  allFixedTabs: state => state.tabs.allFixedTabs,
  system: state => state.user.system,
  user: state => state.user.user,
  roles: state => state.user.roles,
  otherSide: state => state.user.otherSide,
  messages: state => state.user.messages,
  menuIndex: state => state.menu.menuIndex,
  
}
export default getters
