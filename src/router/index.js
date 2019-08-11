import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/survey',
      component: resolve => require(['@/components/home.vue'], resolve),
      children:[
        {
          // 项目简介
          path: '/project/survey',
          name: 'project_survey',
          component: resolve => require(['@/components/project/survey.vue'], resolve),
        },
        {
          // 项目文档
          path: '/project/word',
          name: 'project_word',
          component: resolve => require(['@/components/project/word.vue'], resolve),
        },
        {
          // 项目表格
          path: '/project/table',
          name: 'project_table',
          component: resolve => require(['@/components/project/table.vue'], resolve),
        },
        {
          // 项目图形
          path: '/project/graph',
          name: 'project_graph',
          component: resolve => require(['@/components/project/graph.vue'], resolve),
        },
        {
          // 项目图片
          path: '/project/img',
          name: 'project_img',
          component: resolve => require(['@/components/project/img.vue'], resolve),
        },
        {
          // 项目分析
          path: '/project/analysis',
          name: 'project_analysis',
          component: resolve => require(['@/components/analysis/analysis.vue'], resolve),
        },
      ]
    }
  ]
})
