<template>
  <div id="body">
    <table id="table">
      <thead>
        <tr v-for="combo in combinations">
          <th>{{combo.type}}</th>
          <td>{{combo.value}}</td>
          <td>{{combo.value * 2}}</td>
          <td>{{combo.value * 3}}</td>
          <td>{{combo.value * 4}}</td>
          <td>{{combo.value * 5}}</td>
          <!-- Format ovan verkar fungera bra för att visa tabellen  -->
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    combinations() {
      return this.$store.state.combinations;
    }
  }
};
</script>

<style scoped>
/* border-box kan hjälpa oss att hålla css-mått under kontroll */
* {
  box-sizing: border-box;
}

/* Slänger in lite bakgrundsfärg för att se vad jag håller på med */
#body {
  background-color: green;
  padding: 0.5 rem;
}

th {
  background-color: brown;
  width: 40vw;
  font-family: PressStart2P;
  color: gold;
}

td {
  width: 15vw;
  font-family: PressStart2P;
}

/* Såhär kan vi skriva för att göra en särskild kolumn färgsatt */
td:nth-child(3) {
  background-color: greenyellow;
}

/* Gör varje kolumn jämnbred */
th,
td {
  padding: 0.2rem 0.5rem;
}
</style>