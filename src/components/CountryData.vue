<template>
  <div class="country-data">
    <p >
      <i class="fa-solid fa-location-dot"></i
      ><span>({{ country.alpha3Code }})</span> -
      <span>{{ country.capital }} Airport</span>,
      <strong> {{ country.name }} </strong>
    </p>
  </div>
</template>

<script>
export default {
  props: ["country"],
};
</script>