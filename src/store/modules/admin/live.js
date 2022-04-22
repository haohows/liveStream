const state = {
    artInfo: [],
}

const mutations = {
    setArtInfo(state, data) {
        state.artInfo = data
    },
}

const actions = {
    // 讀取
    async fetch({ commit }, id) {
        let content = null
        try {
            let ref = fireStore.collection("calls").doc("tpwJ2To7NZiiRjB2YRyK")
            await ref.get().then((doc) => {
                content = doc.data();
            });
            return content
        } catch (error) {
            return error
        }
    },
    // 新增
    async create({ commit, dispatch }, payload) {
        let { artInfo, artContent } = payload
        try {
            let createTime = new Date().getTime()
            let info = Object.assign({}, artInfo, { createTime: createTime })
            let artId = null
            await fireStore.collection("ARTINFO").add(info).then((docRef) => {
                artId = docRef.id;
            })
            await fireStore.collection("ARTCONTENT").doc(artId).set({ artContent: artContent })
            await dispatch("fetchArtInfo")
            return "success"
        } catch (error) {
            return error
        }
    },
    // 更新
    async update({ commit, dispatch }, payload) {
        let { artInfo, artContent } = payload
        try {
            // let createTime = new Date().getTime()
            // let info = Object.assign({}, artInfo, { createTime: createTime })
            // let artId = null
            await fireStore.collection("ARTINFO").doc(artInfo.id).update(artInfo)
            await fireStore.collection("ARTCONTENT").doc(artInfo.id).update({ artContent: artContent })
            await dispatch("fetchArtInfo")
            return "success"
        } catch (error) {
            return error
        }
    },
    // 刪除
    async delete({ commit, dispatch }, id) {
        try {
            await fireStore.collection("ARTINFO").doc(id).delete()
            await fireStore.collection("ARTCONTENT").doc(id).delete()
            await dispatch("fetchArtInfo")
            alertSuccess("文章已刪除")
            return "success"
        } catch (error) {
            alertError("文章刪除失敗", error)
            return error
        }
    },
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}