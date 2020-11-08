import {request} from "network/request";

export function gethomemultidata(){
  return request({
    url:'/home/multidata'
  })
}
export function gethomegoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type:type,
      page:page
    }
  })
}
