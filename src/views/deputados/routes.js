export default [
  {
    path: '/deputados',
    name: 'deputados',
    meta: {
      title: 'Deputados',
      icon: 'people'
    },
    beforeEnter: function (to, from, next) {
      const uid = sessionStorage.getItem('uid')

      if (!uid) {
        next('/')
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "deputados" */ './Deputados')
  }
]
