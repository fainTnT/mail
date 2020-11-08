import {request} from "network/request";
import axios from "axios";

export function getCategoryData(){
  return request({
    url:'/category'
  })
}

export function getSubcategory(maitKey) {
  return axios({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
