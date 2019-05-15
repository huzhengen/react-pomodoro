import axios from 'axios';
// import { createBrowserHistory } from 'history'

// const history = createBrowserHistory()
const appID = '5JHoTm2bCKotHo53w4AKgAzd'
const appSecret = 'Y7ysLkCRQ8zNkpRnczHTR2MB'

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const xToken = localStorage.getItem('x-token')
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error) {
  // Do something with request error
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response;
}, function (error) {
  // Do something with response error
  if (error.response.status === 401) {
    window.location.href = '/login'
    // history.push('login')
  }
  return Promise.reject(error);
});

export default instance