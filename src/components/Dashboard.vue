<template>
  <div id="dashboard">
    <nav class="dashboard__nav">
      <div
        @click="navPanel('book')"
        class="dashboard__nav-fix book dashboard__nav-active"
      >
        <p class="dashboard__nav--btn">
          <i class="fa-solid fa-plane-departure"></i> Book
        </p>
      </div>
      <div @click="navPanel('trip')" class="dashboard__nav-fix trip">
        <p class="dashboard__nav--btn">
          <i class="fa-solid fa-suitcase-rolling"></i>
          My Trips
        </p>
      </div>
      <div @click="navPanel('check')" class="dashboard__nav-fix check">
        <p class="dashboard__nav--btn">
          <i class="fa-solid fa-circle-check"></i>
          Check in
        </p>
      </div>
    </nav>
    <div class="dashboard">

    <Book v-show="book" />
    <MyTrips v-show="trip" />
    <CheckIn v-show="check" />
    </div>
  </div>
</template>

<script>
import Book from "./Book.vue";
import CheckIn from "./CheckIn.vue";
import MyTrips from "./MyTrips.vue";

export default {
  components: { Book, MyTrips, CheckIn },
  data() {
    return {
      book: true,
      trip: false,
      check: false,
    };
  },
  methods: {
    navPanel(x) {
      const panel = x;
      const bookBtn = document.querySelector(".book");
      const tripBtn = document.querySelector(".trip");
      const checkBtn = document.querySelector(".check");

      if (panel === "book") {
        bookBtn.classList.add("dashboard__nav-active");
        tripBtn.classList.remove("dashboard__nav-active");
        checkBtn.classList.remove("dashboard__nav-active");

        this.book = true;
        this.trip = false;
        this.check = false;
      } else if (panel === "trip") {
        bookBtn.classList.remove("dashboard__nav-active");
        tripBtn.classList.add("dashboard__nav-active");
        checkBtn.classList.remove("dashboard__nav-active");
        this.book = false;
        this.trip = true;
        this.check = false;
      } else if (panel === "check") {
        bookBtn.classList.remove("dashboard__nav-active");
        tripBtn.classList.remove("dashboard__nav-active");
        checkBtn.classList.add("dashboard__nav-active");
        this.book = false;
        this.trip = false;
        this.check = true;
      }
    },
  },
};
</script>