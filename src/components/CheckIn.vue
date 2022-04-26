<template>
  <div class="dashboard__container">
    <table>
      <thead>
        <tr>
          <th>Serial</th>
          <th>From</th>
          <th>To</th>
          <!-- 

          <th>Status</th>
          <th>Delete</th>
           -->
        </tr>
      </thead>

      <tr v-for="item in Tickets" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.From }}</td>
        <td>{{ item.To }}</td>
        <!-- 
        <div class="check-in-btn" v-show="!item.Check">Check now</div>
        <div v-show="item.Check">Check-in Made</div>


        <td>

        <button
          v-show="!item.Check"
          @click="deleteBook(item.id)"
          class="delete-btn"
        >
          Delete
        </button>
        </td>
         -->
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    Ticket: Object,
  },

  methods: {
    ...mapActions(["deleteBook"]),
  },
  computed: {
    ...mapState(["Tickets"]),
  },
};
</script>
