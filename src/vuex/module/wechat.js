import {
    getinfoList,
    setinfo
} from "../../api";

const state = {
    infolist: []
}

// getters
const getters = {

}

// actions
const actions = {
    getinfoList({ commit }) {
        return getinfoList().then(data => {
            commit('setinfoList', data)
        })
    },
    setinfo({ commit }, postdata) {
        return setinfo(postdata).then(data => {
            console.log(data)
            wx.showToast({
                title: '发布成果',
                icon: 'success',
                duration: 1000,
                mask: true
            })
            getinfoList();
        })
    }
}

// mutations
const mutations = {
    setinfoList(state, data) {
        state.infolist = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}