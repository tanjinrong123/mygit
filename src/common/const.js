const ASIDE_TITLE = [
  {
    title: '项目资料',
    titleIndex: '1',
    activeName: '1',
    icon: 'el-icon-document',   
    levelInfo: [{
      level: '项目简介',
      levelIndex: 'project_survey',
      path: { name: 'project_survey'}
    }, {
      level: '项目文档',
      levelIndex: 'project_word',
      path: {name: 'project_word'}
    }, {
      level: '项目表格',
      levelIndex: 'project_table',
      path: { name: 'project_table'}
    },{
      level: '项目图形',
      levelIndex: 'project_graph',
      path: { name: 'project_graph'}
    },{
      level: '项目图片',
      levelIndex: 'project_img',
      path: {name: 'project_img'}
    }]
  },
  {
    title: '数据分析',
    titleIndex: '2',
    activeName: '2',
    icon: 'el-icon-menu',
    levelInfo: [
    {
      level: '数据分析',
      levelIndex: 'project_analysis',
      path: { name: 'project_analysis' }
    }]
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

const Project=[
  {
    label: '巫山三峡',
    value: 1
  }, {
    label: '延长',
    value: 2
  }]

const TableType = [
  {
    label: '全部',
    value: 0
  },
  {
    label: '形变',
    value: 1
  }, {
    label: '降水',
    value:2
  }, {
    label: '地下水位',
    value: 3
  }, {
    label: '温度',
    value: 4
  } ]

const GraphType = [
  {
    label: '全部',
    value: 0
  },
  {
    label: '遥感影像',
    value: 1
  }, {
    label: '图片',
    value: 2
  }]

const Points = [
  {
    label: 'GPS点',
    value: 1,
    children:[
      {
        label:'x1',
        value:11
      }, {
        label: 'x2',
        value: 12
      }
    ]
  }, {
    label: '地表监测点',
    value: 2,
    children: [
      {
        label: 'x1',
        value: 21
      }, {
        label: 'x2',
        value: 22
      }
    ]
  },{
    label: '深部监测点',
    value: 3,
    children: [
      {
        label: '全部',
        value: 30
      },
      {
        label: 'SW01',
        value: 31
      }, {
        label: 'SW02',
        value: 32
      }
    ]
  },]

const headerConfig=[
  {
    name:'survey',
    headerShow:[false,true,false,false,false],
    // 时间，项目，表的类型（温度，降水），监测点
    contrast:false
  },
  {
    name: 'word',
    headerShow: [false, true, false, false, false],
    contrast: false
  },
  {
    name: 'table',
    headerShow: [false, true, true, true, false],
    contrast: false
  },
  {
    name: 'graph',
    headerShow: [false, true, false, false, false],
    contrast: false
  },
  {
    name: 'img',
    headerShow: [false, true, false, false, true],
    contrast: false
  },
  {
    name: 'analysis',
    headerShow: [true, true, true, true, false],
    contrast: true
  }
]

const pageConfig = [
  {
    name: 'one',
    oneChart:'HighChart'    
  }
]

let getHeaderConfig = (name) => {
  let b = {}
  headerConfig.forEach(item => {
    if (item.name === name) {
      b = item
    }
  })
  return b
}

let getPageConfig = (name) => {
  let b = {}
  pageConfig.forEach(item => {
    if (item.name === name) {
      b = item
    }
  })
  return b
}
export {
  ASIDE_TITLE,
  Project,
  Points,
  TableType,
  GraphType,
  getHeaderConfig,
  getPageConfig
}