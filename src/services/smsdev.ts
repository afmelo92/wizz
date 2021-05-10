import axios from 'axios'

export const sms = axios.create({
  baseURL: 'https://api.smsdev.com.br/v1/'
})
