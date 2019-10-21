<template>
  <div id="body">
    <table>
      <thead>
        <tr v-for="combo in combinations">
          <th>{{combo.type}}</th>
          <td>{{combo.value}}</td>
          <td>{{combo.value * 2}}</td>
          <td>{{combo.value * 3}}</td>
          <td>{{combo.value * 4}}</td>
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
}

th {
  background-color: brown;
}

/* Såhär kan vi skriva för att göra en särskild kolumn färgsatt */
td:nth-child(3) {
  background-color: blue;
}

/* Gör varje kolumn jämnbred */
th,
td {
  width: 20vw;
}
</style>