<template>
  <div id="body" v-bind:class="{ modern: modern, classic: !modern }">
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
    },
    modern() {
      return this.$store.state.modern;
    }
  }
};
</script>

<style scoped>
/* border-box kan hjälpa oss att hålla css-mått under kontroll */
* {
  box-sizing: border-box;
}

table {
  border-collapse: collapse;
}

/* Slänger in lite bakgrundsfärg för att se vad jag håller på med */
.classic {
  background-color: green;
}

#body {
  padding: 0.5 rem;
  font-size: 0.9rem;
}

th {
  width: 40vw;
}

th,
td {
  padding: 0.3rem 0.5rem;
}

td {
  width: 15vw;
}

.classic th {
  background-color: brown;
  font-family: PressStart2P;
  color: gold;
}

.classic td {
  font-family: PressStart2P;
}

/* Såhär kan vi skriva för att göra en särskild kolumn färgsatt */
.classic td:nth-child(3) {
  background-color: greenyellow;
}

/* Gör varje kolumn jämnbred */
</style>