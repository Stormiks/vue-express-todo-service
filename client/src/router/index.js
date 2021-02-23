import Vue from 'vue'
import VueRouter from 'vue-router'

import auth from './middleware/auth'
import guest from './middleware/guest'
import admin from './middleware/admin'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      pageTitle: 'Главная страница',
      layout: 'default-layout',
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/profile/:userId',
    name: 'user-profile',
    component: () => import('@/views/profile/Profile'),
    props: true,
    meta: {
      layout: 'default-layout',
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('@/views/todo/Todo'),
    meta: {
      layout: 'default-layout',
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/todo/board-active',
    name: 'todo-board-active',
    component: () => import('@/views/todo/TodoListActive'),
    meta: {
      layout: 'default-layout',
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/todo/:id',
    name: 'todo-detail',
    props: true,
    component: () => import('@/views/todo/TodoDetail'),
    meta: {
      layout: 'default-layout',
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      pageTitle: 'Войдите в личный кабинет',
      layout: 'auth-layout',
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: {
      pageTitle: 'Регистрация',
      layout: 'auth-layout',
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: () => import('@/views/admin/Admin'),
      sidebar: () => import('@/views/admin/Sidebar')
    },
    meta: {
      pageTitle: 'Административная панель',
      layout: 'admin-layout',
      middleware: [
        admin
      ]
    }
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    components: {
      default: () => import('@/views/admin/ListUsers'),
      sidebar: () => import('@/views/admin/Sidebar')
    },
    meta: {
      pageTitle: 'Список зарегестрированных пользователей',
      layout: 'admin-layout',
      middleware: [
        admin
      ]
    }
  },
  {
    path: '/admin/users/:id',
    name: 'admin-user',
    component: () => import('@/views/admin/User'),
    props: true,
    layout: 'admin-layout',
    middleware: [
      admin
    ]
  },
  {
    path: '/*',
    name: '404',
    component: () => import('@/layouts/Error'),
    meta: {
      layout: 'error-layout'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next()

  const middleware = to.meta.middleware

  if (!store.getters.auth) {
		store.dispatch('clearDataSessions')
		store.dispatch('clearTasks')
		store.dispatch('clearComments')
	}

  return middleware[0]({ to, from, next, store })
})

export default router
