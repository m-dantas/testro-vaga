export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'dashboard'
    },
    beforeEnter: function (to, from, next) {
      const uid = sessionStorage.getItem('uid')

      if (!uid) {
        next('/')
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "dashboard" */ './Dashboard')
  }
]
