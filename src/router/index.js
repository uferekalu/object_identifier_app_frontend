import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home'
import Detail from '@/components/Detail'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/:imageId/detail',
      name: 'detail',
      component: Detail,
      props: true 
    },
  ]
})

// import { createWebHistory, createRouter } from 'vue-router';
// import home from '@/components/home'
// import Detail from '@/components/Detail'

// const routes = [
//       {
//         path: '/',
//         name: 'home',
//         component: home
//       },
//       {
//         path: '/:imageId/detail',
//         name: 'detail',
//         component: Detail,
//         props: true 
//       },
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
