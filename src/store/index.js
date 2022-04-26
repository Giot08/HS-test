import { createStore } from 'vuex'

export default createStore({
  state: {
    countries: [],
    countriesFilter: []
  },
  mutations: {
    setCountry(state, payload) {
      state.countries = payload
    },
    setCountryFilter(state, payload) {
      state.countriesFilter = payload
    }
  },
  actions: {
    async getCountry({ commit }) {
      try {
        const res = await fetch('db/flights_min.json')
        const data = await res.json()
        // console.log(data)
        commit('setCountry', data)
      } catch (error) {
        console.log(error)
      }
    },
    capitalFilter({ commit, state }) {
      const filtro = state.countries
      commit('setCountryFilter', filtro)
    },
  },
  getters: {
    countrySort(state) {
      return state.countriesFilter.sort((a, b) =>
        a.capital > b.capital ? 1 : -1
      )
    }
  },
  modules: {
  }
})
