<template>
  <div class="dashboard__container">
    <table>
      <thead>
        <tr>
          <th>Serial</th>
          <th>From</th>
          <th>To</th>
          <th>Depart date</th>
          <th>Return date</th>
          <th>Trip</th>
          <th>Class</th>
          <th>A</th>
          <th>C</th>
          <th>I</th>
          <th>Status</th>
        </tr>
      </thead>

      <tr v-for="item in Tickets" :key="item.id">

        <td>{{ item.id }}</td>
        <td>{{ item.From }}</td>
        <td>{{ item.To }}</td>
        <td>{{ item.Date.Depart }}</td>
        <td>{{ item.Date.Return }}</td>
        <td>{{ item.Trip }}</td>
        <td>{{ item.Class }}</td>
        <td>{{ item.Passenger.Adults }}</td>
        <td>{{ item.Passenger.Childs }}</td>
        <td>{{ item.Passenger.Infants }}</td>
        <div v-show="!item.Check" class="uncheck-status"></div>
        <div v-show="item.Check" class="check-status"></div>

      </tr>

    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
        Ticket: Object
    },
  computed: {
    ...mapState(["Tickets"]),
  },
};
</script>

<style>
</style>