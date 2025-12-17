export default [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './Login')
  }
]
