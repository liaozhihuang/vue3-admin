import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: Home,
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        meta: {
          title: '没有权限1'
        },
        component: () => import('@/views/Welcome.vue')
      },
      {
        path: '/users',
        name: 'users',
        meta: {
          title: '没有权限2'
        },
        component: () => import('@/views/User/Users.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        meta: {
          title: '没有权限3'
        },
        component: () => import('@/views/Permission/RoleList.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        meta: {
          title: '没有权限4'
        },
        component: () => import('@/views/Permission/RightList.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  document.title = `${to.meta.title} | vue-manage-system`;
  next();
  // const role = localStorage.getItem('ms_username');
  /*   if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    } */
});
export default router
