import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://dadosabertos.camara.leg.br/api/v2'
})
