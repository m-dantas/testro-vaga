export default [
  {
    path: '/deputados/:id',
    name: 'details-deputado',
    props: true,
    beforeEnter: function (to, from, next) {
      const uid = sessionStorage.getItem('uid')

      if (!uid) {
        next('/')
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "detailsdeputados" */ './DetailsDeputado')
  }
]
