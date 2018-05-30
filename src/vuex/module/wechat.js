import {
    getinfoList,
  } from "../../api";

const state = {
    infolist:[]
}

// getters
const getters = {

}

// actions
const actions = {
    getinfoList({commit}){
        return getinfoList().then(data=>{
            commit('setinfoList',data)
        })
    },
}

// mutations
const mutations = {
    setinfoList(state,data){
        state.infolist=data;
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}
