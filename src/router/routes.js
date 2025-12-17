import { routes as Login } from '../views/login'
import { routes as Home } from '../views/dashboard'
import { routes as Deputados } from '../views/deputados'
import { routes as Cadastrar } from '../views/cadastrar'
import { routes as Recuperar } from '../views/recuperar-senha'
import { routes as DetailsDeputado } from '../views/details-deputado'

export default [
  ...Login,
  ...Home,
  ...Deputados,
  ...DetailsDeputado,
  ...Cadastrar,
  ...Recuperar
]
