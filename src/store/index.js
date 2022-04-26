import { createStore } from 'vuex'

export default createStore({
  state: {
    countries: [],
    countriesFilter: [],
    Tickets: [],
    Ticket: {
      From: "",
      To: "",
      Trip: "",
      Class: "",
      Date: {
        Depart: "",
        Return: "",
      },
      Passenger: {
        Adults: 1,
        Childs: 0,
        Infants: 0,
      },
    },
  },
  mutations: {
    setCountry(state, payload) {
      state.countries = payload
    },
    setCountryFilter(state, payload) {
      state.countriesFilter = payload
    },
    loadTickets(state, payload){
      state.Tickets = payload
    },
    saveTicket(state, payload) {
      state.Tickets.push(payload)
      localStorage.setItem('Tickets', JSON.stringify(state.Tickets))
    },
    Ticket(state, payload) {
      if (!state.Ticket.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.Ticket = state.Tickets.find(item => item.id === payload)
    },
  },
  actions: {
    loadLocalStorage({ commit }) {
      if (localStorage.getItem('Tickets')) {
        const Tickets = JSON.parse(localStorage.getItem('Tickets'))
        commit('loadTickets', Tickets)
        return
      }
      localStorage.setItem('Tickets', JSON.stringify([]))
    },
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
    setTicket({ commit }, Tickets) {
      commit('saveTicket', Tickets)
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
