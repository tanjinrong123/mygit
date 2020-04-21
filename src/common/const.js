const ASIDE_TITLE = [
  {
    title: "非监测数据",
    titleIndex: "1",
    activeName: "1",
    icon: "el-icon-document",
    levelInfo: [
      {
        level: "简介",
        levelIndex: "project_survey",
        path: { name: "project_survey" }
      },
      {
        level: "文档",
        levelIndex: "project_word",
        path: { name: "project_word" }
      },
      {
        level: "影像",
        levelIndex: "project_img",
        path: { name: "project_img" }
      },
      // {
      //   level: "项目表格",
      //   levelIndex: "project_table",
      //   path: { name: "project_table" }
      // },
      {
        level: "矢量图",
        levelIndex: "project_graph",
        path: { name: "project_graph" }
      },
      
    ]
  },
  {
    title: "监测数据",
    titleIndex: "2",
    activeName: "2",
    icon: "el-icon-document",
    levelInfo: [
      {
        level: "历史监测数据",
        levelIndex: "project_history",
        path: { name: "project_history" }
      },
      {
        level: "实时监测数据",
        levelIndex: "project_time",
        path: { name: "project_time" }
      }
    ]
  },
  {
    title: "数据分析",
    titleIndex: "3",
    activeName: "3",
    icon: "el-icon-menu",
    levelInfo: [
      {
        level: "数据分析",
        levelIndex: "project_analysis",
        path: { name: "project_analysis" }
      }
    ]
  },
  {
    title: "系统管理",
    titleIndex: "4",
    activeName: "4",
    icon: "el-icon-setting",
    levelInfo: [
      {
        level: "数据审核",
        levelIndex: "data_audit",
        path: { name: "data_audit" }
      },
      {
        level: "信息管理",
        levelIndex: "system_manage",
        path: { name: "system_manage" },
        levelInfo:[
          {
            level: "用户管理",
            levelIndex: "setting_user",
            path: { name: "setting_user" },
          },
          {
            level: "角色管理",
            levelIndex: "setting_role",
            path: { name: "setting_role" }
          },
          {
            level: "组管理",
            levelIndex: "setting_group",
            path: { name: "setting_group" }
          },
          {
            level: "权限管理",
            levelIndex: "setting_permission",
            path: { name: "setting_permission" }
          }
        ]
      },
      {
        level: "帮助",
        levelIndex: "help",
        path: { name: "help" }
      },
    ]
  }
];

const Project = [
  {
    label: "巫山三峡",
    value: 1
  },
  {
    label: "延长",
    value: 2
  }
];

const TableType = [
  {
    label: "全部",
    value: 0
  },
  {
    label: "形变",
    value: 1
  },
  {
    label: "降雨量",
    value: 2
  },
  {
    label: "地下水位",
    value: 3
  },
  {
    label: "温度",
    value: 4
  }
];

const GraphType = [
  {
    label: "全部",
    value: 0
  },
  {
    label: "遥感影像",
    value: 1
  },
  {
    label: "外摄图片",
    value: 2
  },
  {
    label: "DEM",
    value: 3
  }
];

const Points = [
  {
    label: "GPS点",
    value: 1,
    children: [
      {
        label: "x1",
        value: 11
      },
      {
        label: "x2",
        value: 12
      }
    ]
  },
  {
    label: "地表监测点",
    value: 2,
    children: [
      {
        label: "x1",
        value: 21
      },
      {
        label: "x2",
        value: 22
      }
    ]
  },
  {
    label: "深部监测点",
    value: 3,
    children: [
      {
        label: "全部",
        value: 30
      },
      {
        label: "SW01",
        value: 31
      },
      {
        label: "SW02",
        value: 32
      },
      {
        label: "SW03",
        value: 31
      },
      {
        label: "SW04",
        value: 32
      },
      {
        label: "SW05",
        value: 31
      },
      {
        label: "SW06",
        value: 32
      },
      {
        label: "SW07",
        value: 31
      },
      {
        label: "SW08",
        value: 32
      },
      {
        label: "SW09",
        value: 31
      },
      {
        label: "SW10",
        value: 32
      },
      {
        label: "SW11",
        value: 31
      },
      {
        label: "SW12",
        value: 32
      }
    ]
  }
];

const headerConfig = [
  {
    name: "survey",
    headerShow: [false, true, false, false, false],
    // 时间，项目，表的类型（温度，降水），监测点
    contrast: false
  },
  {
    name: "word",
    headerShow: [false, true, false, false, false, true],
    contrast: false
  },
  
  {
    name: "graph",
    headerShow: [false, true, false, false, false, true],
    contrast: false
  },
  {
    name: "img",
    headerShow: [false, true, false, false, true, true],
    contrast: false
  },
  {
    name: "history",
    headerShow: [true, true, true, true, false,true,true,true],
    contrast: false
  },
  {
    name: "analysis",
    headerShow: [true, true, true, true, false],
    contrast: true
  }
];

const pageConfig = [
  {
    name: "one",
    oneChart: "HighChart"
  },
  {
    name: "two",
    oneChart: "TwoCharts"
  }
];

let getHeaderConfig = name => {
  let b = {};
  headerConfig.forEach(item => {
    if (item.name === name) {
      b = item;
    }
  });
  return b;
};

let getPageConfig = name => {
  let b = {};
  pageConfig.forEach(item => {
    if (item.name === name) {
      b = item;
    }
  });
  return b;
};
export {
  ASIDE_TITLE,
  Project,
  Points,
  TableType,
  GraphType,
  getHeaderConfig,
  getPageConfig
};
