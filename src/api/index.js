import http from './request'

export const getinfoList = () => http.get('/json/list');


export const setinfo = (data) => http.post('/json/set', data)