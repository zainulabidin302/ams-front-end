import Vue from 'vue'
import Router from 'vue-router'
import Courses from '@/components/Courses'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Courses',
      component: Courses
    }
  ]
})
