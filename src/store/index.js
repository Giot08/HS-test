import { createStore } from 'vuex'

export default createStore({
  state: {
    paises: [],
    paisesFiltrados: []
  },
  mutations: {
    setPaises(state, payload) {
      state.paises = payload
    },
    setPaisesFiltrados(state, payload) {
      state.paisesFiltrados = payload
    }
  },
  actions: {
    async getPaises({ commit }) {
      try {
        const res = await fetch('db/flights_min.json')
        const data = await res.json()
        // console.log(data)
        commit('setPaises', data)
      } catch (error) {
        console.log(error)
      }
    },
    filtrarRegion({ commit, state }) {
      const filtro = state.paises
      commit('setPaisesFiltrados', filtro)
    },
    filtroNombre({ commit, state }, texto) {
      const textoCliente = texto.toLowerCase()
      const filtro = state.paises.filter(pais => {
        const textoApi = pais.capital.toLowerCase()
        if (textoApi.includes(textoCliente)) {
          return pais
        }
      })
      commit('setPaisesFiltrados', filtro)
    }
  },
  getters: {
    topPaisesPoblacion(state) {
      return state.paisesFiltrados.sort((a, b) =>
        a.capital < b.capital ? -1 : 1
      )
    }
  },
  modules: {
  }
})
