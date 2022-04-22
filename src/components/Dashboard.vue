<template>
  <div id="dashboard">
    <nav class="dashboard__nav">
      <div class="dashboard__nav-fix">
        <p class="dashboard__nav--btn dashboard__nav-active">
          <i class="fa-solid fa-plane-departure"></i> Book
        </p>
      </div>
      <div class="dashboard__nav-fix">
        <p class="dashboard__nav--btn">
          <i class="fa-solid fa-suitcase-rolling"></i>
          My Trips
        </p>
      </div>
      <div class="dashboard__nav-fix">
        <p class="dashboard__nav--btn">
          <i class="fa-solid fa-circle-check"></i>
          Check in
        </p>
      </div>
    </nav>

    <div class="dashboard__container">
      <form @submit.prevent="">
        <h3>Flights</h3>

        <div class="form-flex">
          <input
            @keyup="procesarInput"
            @focus="from()"
            @blur="from()"
            type="text"
            v-model="texto"
            placeholder="From"
          />

          <input
            @focus="to()"
            @blur="to()"
            type="text"
            v-model="Ticket.To"
            placeholder="To"
          />

          <select v-model="Ticket.Trip" name="select">
            <option value="" selected disabled>Trip</option>
            <option value="return">Return</option>
            <option value="one_way">One Way</option>
          </select>
          <select v-model="Ticket.Class" name="select">
            <option value="" selected disabled>Class</option>
            <option value="return">Economy</option>
            <option value="one_way">Premium</option>
          </select>
        </div>

        <div class="form-flex">
          <div class="dashboard__dates">
            <div>
              <label for="">Depart</label>
              <input
                v-model="Ticket.Schedule.Depart"
                class="dashboard__dates--input"
                min="2022-04-22"
                max="2023-04-22"
                type="date"
              />
            </div>
            <div>
              <label for="">Return</label>
              <input
                v-model="Ticket.Schedule.Return"
                class="dashboard__dates--input"
                min="2022-04-22"
                max="2023-04-22"
                type="date"
              />
            </div>
          </div>

          <div class="passenger-fix">
            <h3>Passenger</h3>
            <div class="passenger-flex">
              <div>
                <h4>Adults</h4>
                <div class="passenger-selection">
                  <i
                    @click="decreaseAdult"
                    class="passenger-btn fa-solid fa-minus"
                  ></i>
                  <p class="passenger-quantity">
                    {{ Ticket.Passenger.Adults }}
                  </p>
                  <i
                    @click="increaseAdult"
                    class="passenger-btn fa-solid fa-plus"
                  ></i>
                </div>
              </div>

              <div class="passenger-block">
                <h4>Child</h4>
                <div class="passenger-selection">
                  <i
                    @click="decreaseChilds"
                    class="passenger-btn fa-solid fa-minus"
                  ></i>
                  <p class="passenger-quantity">
                    {{ Ticket.Passenger.Childs }}
                  </p>
                  <i
                    @click="increaseChilds"
                    class="passenger-btn fa-solid fa-plus"
                  ></i>
                </div>
              </div>

              <div class="passenger-block">
                <h4>Infant</h4>
                <div class="passenger-selection">
                  <i
                    @click="decreaseInfants"
                    class="passenger-btn fa-solid fa-minus"
                  ></i>
                  <p class="passenger-quantity">
                    {{ Ticket.Passenger.Infants }}
                  </p>
                  <i
                    @click="increaseInfants"
                    class="passenger-btn fa-solid fa-plus"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button @click="bookNow" class="book--btn">Book now</button>
      </form>

      <div class="flightsFrom hide">
        <div v-for="country in countries" :key="country.name">
          <CountryData :country="country" />
        </div>
      </div>

      <div class="flightsTo hide">
        <div v-for="country in countries" :key="country.name">
          <CountryData :country="country" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryData from "./CountryData.vue";
import { ref } from "vue";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    CountryData,
  },
  data() {
    return {
      Ticket: {
        From: "",
        To: "",
        Trip: "",
        Class: "",
        Schedule: {
          Depart: "",
          Return: "",
        },
        Passenger: {
          Adults: 1,
          Childs: 0,
          Infants: 0,
        },
      },
    };
  },
  methods: {
    bookNow(){
      console.log(this.Ticket)
    },
    from() {
      const from = document.querySelector(".flightsFrom");
      from.classList.toggle("hide");
    },
    to() {
      const to = document.querySelector(".flightsTo");
      to.classList.toggle("hide");
    },
    decreaseAdult() {
      if (this.Ticket.Passenger.Adults > 1) {
        this.Ticket.Passenger.Adults--;
      } else {
        alert(`Adults can't be 0`);
      }
    },
    increaseAdult() {
      if (this.Ticket.Passenger.Adults < 9) {
        this.Ticket.Passenger.Adults++;
      } else {
        alert("You can only buy a max of 9 tickets for adults");
      }
    },
    decreaseChilds() {
      if (this.Ticket.Passenger.Childs > 0) {
        this.Ticket.Passenger.Childs--;
      }
    },
    increaseChilds() {
      if (this.Ticket.Passenger.Childs < 9) {
        this.Ticket.Passenger.Childs++;
      } else {
        alert("Can only book tickets for a maximum of 9 childs");
      }
    },
    decreaseInfants() {
      if (this.Ticket.Passenger.Infants > 0) {
        this.Ticket.Passenger.Infants--;
      }
    },
    increaseInfants() {
      const div =
        this.Ticket.Passenger.Adults / (this.Ticket.Passenger.Infants + 1);

      if (div >= 2) {
        this.Ticket.Passenger.Infants++;
      } else {
        alert("Is only valid 1 infant per 2 adults");
      }
    },
  },
  setup() {
    const texto = ref("");
    const store = useStore();
    const countries = computed(() => {
      return store.getters.topPaisesPoblacion;
    });
    const procesarInput = () => {
      console.log(texto.value)
      store.dispatch("filtroNombre", texto.value);
    };
    onMounted(async () => {
      await store.dispatch("getPaises");
      await store.dispatch("filtrarRegion");
    });
    return { countries, texto, procesarInput };
  },
};
</script>

<style>
</style>