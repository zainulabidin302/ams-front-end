import Vue from 'vue'
import Router from 'vue-router'
import Courses from '@/components/pages/CourseList'
import CourseCreate from '@/components/pages/CreateCourse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Courses',
      component: Courses
    },
    {
      path: '/course/:id',
      name: 'CreateCourse',
      component: CourseCreate
    },
    {
      path: '/course',
      name: 'CreateCourse',
      component: CourseCreate
    }

  ]
})
