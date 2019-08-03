const ASIDE_TITLE = [
  {
    title: '项目',
    titleIndex: '1',
    activeName: '1',
    icon: 'el-icon-document',
    project:[
      {
        name:'巫山三峡',
        index:'1-1'
      },{
        name:'延长',
        index:'1-2'
      }],
    levelInfo: [{
      level: '项目简介',
      levelIndex: 'project_survey',
      path: {name: 'project_survey'}
    }, {
      level: '项目文档',
      levelIndex: 'project_word',
      path: {name: 'project_word'}
    }, {
      level: '项目表格',
      levelIndex: 'project_excel',
      path: {name: 'project_excel'}
    },{
      level: '项目图形',
      levelIndex: 'project_shp',
      path: {name: 'project_shp'}
    },{
      level: '项目图片',
      levelIndex: 'project_img',
      path: {name: 'project_img'}
    }]
  },
  {
    title: '管理',
    titleIndex: '2',
    activeName: '2',
    icon: 'el-icon-menu',
    project:[
      {
        name:'巫山三峡',
        index:'2-1'
      },{
        name:'延长',
        index:'2-2'
      }],
    levelInfo: []
  },
  {
    title: '设置',
    titleIndex: '3',
    activeName: '3',
    icon: 'el-icon-setting',
    project:[
      {
        name:'巫山三峡',
        index:'3-1'
      },{
        name:'延长',
        index:'3-2'
      }],
    levelInfo: []
  }
]

export {
  ASIDE_TITLE
}