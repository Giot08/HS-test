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
            readonly
            @focus="flightList('show-from')"
            type="text"
            v-model="Ticket.From"
            placeholder="From"
          />

          <input
            readonly
            @focus="flightList('show-to')"
            type="text"
            v-if="Ticket.Trip === 'return'"
            v-model="Ticket.To"
            placeholder="To"
          />

          <select v-model="Ticket.Trip">
            <option value="" disabled>Trip</option>
            <option value="one_way">One Way</option>
            <option value="return">Return</option>
          </select>
          <select v-model="Ticket.Class">
            <option value="" disabled>Class</option>
            <option value="return">Economy</option>
            <option value="one_way">Premium</option>
          </select>
        </div>

        <div class="form-flex">
          <div class="dashboard__dates">
            <div>
              <label for="">Depart</label>
              <input
                v-model="Ticket.Date.Depart"
                class="dashboard__dates--input"
                min="2022-04-22"
                max="2023-04-22"
                type="date"
              />
            </div>
            <div v-if="Ticket.Trip === 'return'">
              <label for="">Return</label>
              <input
                v-model="Ticket.Date.Return"
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
                    @click="adultQTY('decrease')"
                    class="passenger-btn fa-solid fa-minus"
                  ></i>
                  <p class="passenger-quantity">
                    {{ Ticket.Passenger.Adults }}
                  </p>
                  <i
                    @click="adultQTY('increase')"
                    class="passenger-btn fa-solid fa-plus"
                  ></i>
                </div>
              </div>

              <div class="passenger-block">
                <h4>Child</h4>
                <div class="passenger-selection">
                  <i
                    @click="childQTY('decrease')"
                    class="passenger-btn fa-solid fa-minus"
                  ></i>
                  <p class="passenger-quantity">
                    {{ Ticket.Passenger.Childs }}
                  </p>
                  <i
                    @click="childQTY('increase')"
                    class="passenger-btn fa-solid fa-plus"
                  ></i>
                </div>
              </div>

              <div class="passenger-block">
                <h4>Infant</h4>
                <div class="passenger-selection">
                  <i
                    @click="infantQTY('decrease')"
                    class="passenger-btn fa-solid fa-minus"
                  ></i>
                  <p class="passenger-quantity">
                    {{ Ticket.Passenger.Infants }}
                  </p>
                  <i
                    @click="infantQTY('increase')"
                    class="passenger-btn fa-solid fa-plus"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <select
          @mouseout="flightList('no-show-from')"
          class="flightsFrom hide"
          v-model="Ticket.From"
        >
          <option value="" disabled selected>Origin: {{ Ticket.From }}</option>
          <option
            class="country-data"
            v-for="country in countries"
            :key="country.country"
            :value="`(${country.alpha3Code}) - ${country.capital} Airport, ${country.name}`"
          >
            <CountryData :country="country" />
          </option>
        </select>

        <select
          @mouseout="flightList('no-show-to')"
          class="flightsTo hide"
          v-model="Ticket.To"
        >
          <option value="" disabled selected>
            Destination: {{ Ticket.To }}
          </option>
          <option
            class="country-data"
            v-for="country in countries"
            :key="country.country"
            :value="`(${country.alpha3Code}) - ${country.capital} Airport, ${country.name}`"
          >
            <CountryData :country="country" />
          </option>
        </select>

        <button @click="bookNow" class="book--btn">Book now</button>
      </form>
    </div>
  </div>
</template>

<script>
import CountryData from "./CountryData.vue";

import { computed, onMounted } from "@vue/runtime-core";
import { useStore, mapActions } from "vuex";
const shortid = require("shortid");

export default {
  components: {
    CountryData,
  },
  data() {
    return {
      Ticket: {
        id: "",
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
        Check: false,
      },
    };
  },

  methods: {
    ...mapActions(["setTicket"]),
    bookNow() {
      if (this.Ticket.From === this.Ticket.To) {
        alert("Origin and destination have to be different!");
      } else if (this.Ticket.Trip === "return" && this.Ticket.To === "") {
        alert("Please add a destination!");
      } else if (
        this.Ticket.Trip === "return" &&
        this.Ticket.Date.Return === ""
      ) {
        alert("Please add a return date!");
      } else if (this.Ticket.Date.Depart === "") {
        alert("Please add a depart date!");
      } else {
        (this.Ticket.id = shortid.generate()), console.log(this.Ticket);

        this.setTicket(this.Ticket);
        alert("book saved successfully");
        return (
          (this.Ticket.id = ""),
          (this.Ticket.From = ""),
          (this.Ticket.To = ""),
          (this.Ticket.Trip = ""),
          (this.Ticket.Class = ""),
          (this.Ticket.Date.Depart = ""),
          (this.Ticket.Date.Return = ""),
          (this.Ticket.Passenger.Adults = 1),
          (this.Ticket.Passenger.Childs = 0),
          (this.Ticket.Passenger.Infants = 0)
        );
      }
    },
    flightList(x) {
      const ToDo = x;
      const fromList = document.querySelector(".flightsFrom");
      const toList = document.querySelector(".flightsTo");
      if (ToDo === "show-from") {
        fromList.classList.remove("hide");
      } else if (ToDo === "show-to") {
        toList.classList.remove("hide");
      } else if (ToDo === "no-show-to") {
        toList.classList.add("hide");
      } else if (ToDo === "no-show-from") {
        fromList.classList.add("hide");
      }
    },
    adultQTY(x) {
      const ToDo = x;
      if (ToDo === "decrease") {
        if (this.Ticket.Passenger.Adults > 1) {
          this.Ticket.Passenger.Adults--;
        } else {
          alert(`Adults can't be 0`);
        }
      } else if (ToDo === "increase") {
        if (this.Ticket.Passenger.Adults < 9) {
          this.Ticket.Passenger.Adults++;
        } else {
          alert("You can only buy a max of 9 tickets for adults");
        }
      } else {
      }
    },
    childQTY(x) {
      const ToDo = x;
      if (ToDo === "decrease" && this.Ticket.Passenger.Childs > 0) {
        this.Ticket.Passenger.Childs--;
      } else if (ToDo === "increase" && this.Ticket.Passenger.Childs < 9) {
        this.Ticket.Passenger.Childs++;
      } else {
        alert("Can only book tickets for a maximum of 9 childs");
      }
    },
    infantQTY(x) {
      const ToDo = x;
      const infantLimit =
        this.Ticket.Passenger.Adults / (this.Ticket.Passenger.Infants + 1);
      if (ToDo === "decrease" && this.Ticket.Passenger.Infants > 0) {
        this.Ticket.Passenger.Infants--;
      } else if (ToDo === "increase" && infantLimit >= 2) {
        this.Ticket.Passenger.Infants++;
      } else {
        alert("Is only valid 1 infant per 2 adults");
      }
    },
  },
  setup() {
    const store = useStore();
    const countries = computed(() => {
      return store.getters.countrySort;
    });
    onMounted(async () => {
      await store.dispatch("getCountry");
      await store.dispatch("capitalFilter");
    });
    return { countries };
  },
};
</script>

<style>
</style>