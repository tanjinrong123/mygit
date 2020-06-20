/*
 * @Description:
 * @Autor: Sia
 * @Date: 2019-07-20 10:19:32
 * @LastEditors: huacong
 * @LastEditTime: 2020-06-20 10:40:41
 */
import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: (resolve) =>
        require(["@/components/common/Login.vue"], resolve),
    },
    {
      path: "/register",
      name: "register",
      component: (resolve) =>
        require(["@/components/common/register.vue"], resolve),
    },
    {
      path: "/index",
      name: "index",
      component: (resolve) =>
        require(["@/components/common/index.vue"], resolve),
      beforeEnter: (to, from, next) => {
        store.commit("SET_SHOWMENU", false);
        next();
      },
    },
    {
      path: "/survey",
      component: (resolve) => require(["@/components/home.vue"], resolve),
      children: [
        {
          // 项目简介
          path: "/project/survey",
          name: "project_survey",
          component: (resolve) =>
            require(["@/components/project/survey.vue"], resolve),
        },
        {
          // 项目文档
          path: "/project/word",
          name: "project_word",
          component: (resolve) =>
            require(["@/components/project/word.vue"], resolve),
        },
        // {
        //   // 项目表格
        //   path: '/project/table',
        //   name: 'project_table',
        //   component: resolve => require(['@/components/project/table.vue'], resolve),
        // },
        {
          // 项目矢量数据
          path: "/project/graph",
          name: "project_graph",
          component: (resolve) =>
            require(["@/components/project/graph.vue"], resolve),
        },
        {
          // 项目影像
          path: "/project/img",
          name: "project_img",
          component: (resolve) =>
            require(["@/components/project/img.vue"], resolve),
        },
        {
          // 历史监测数据
          path: "/project/history",
          name: "project_history",
          component: (resolve) =>
            require(["@/components/monitor/history.vue"], resolve),
        },
        {
          // 项目分析
          path: "/project/analysis",
          name: "project_analysis",
          component: (resolve) =>
            require(["@/components/analysis/analysis.vue"], resolve),
        },
        {
          // 用户设置
          path: "/setting/user",
          name: "setting_user",
          component: (resolve) =>
            require(["@/components/setting/user.vue"], resolve),
        },
        {
          // 角色设置setting_permission
          path: "/setting/role",
          name: "setting_role",
          component: (resolve) =>
            require(["@/components/setting/role.vue"], resolve),
        },
        {
          // 权限设置
          path: "/setting/permission",
          name: "setting_permission",
          component: (resolve) =>
            require(["@/components/setting/permission.vue"], resolve),
        },
      ],
    },
  ],
});
