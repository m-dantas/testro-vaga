import { http } from './config'

export default {
  deputados: () => {
    return http.get('/deputados?ordem=ASC&ordenarPor=nome')
  },
  deputadoId: (id) => {
    return http.get(`/deputados/${id}`)
  },
  deputadoDespesas: (id, mes = '', ano = '', page) => {
    return http.get(`/deputados/${id}/despesas?ano=${ano}&mes=${mes}&ordem=ASC&ordenarPor=mes&pagina=${page}&itens=9`)
  },
  deputadosPorSexo: (sexo) => {
    return http.get(`/deputados?siglaSexo=${sexo}&ordem=ASC&ordenarPor=nome`)
  },
  deputadosByItens: (nome = '', siglaUf = '', siglaP = '', orderBy = 'nome', page = 1) => {
    return http.get(`/deputados?nome=${nome}&siglaUf=${siglaUf}&siglaPartido=${siglaP}&ordem=ASC&ordenarPor=${orderBy}&pagina=${page}&itens=9`)
  },
  estadosUF: () => {
    return http.get('https://dadosabertos.camara.leg.br/api/v2/referencias/uf')
  },
  partidosSiglas: () => {
    return http.get('/partidos?ordem=ASC&ordenarPor=sigla')
  }
}
