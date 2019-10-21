<template>
  <div id="body">
    <table id="table">
      <thead>
        <tr v-for="combo in combinations">
          <th>{{combo.type}}</th>
          <td v-bind:style="[bet == 1 ? {backgroundColor:'red'} : {backgroundColor:'#15294f'}]">{{combo.value}}</td>
          <td v-bind:style="[bet == 2 ? {backgroundColor:'red'} : {backgroundColor:'#15294f'}]">{{combo.value * 2}}</td>
          <td v-bind:style="[bet == 3 ? {backgroundColor:'red'} : {backgroundColor:'#15294f'}]">{{combo.value * 3}}</td>
          <td v-bind:style="[bet == 4 ? {backgroundColor:'red'} : {backgroundColor:'#15294f'}]">{{combo.value * 4}}</td>
          <td v-bind:style="[bet == 5 ? {backgroundColor:'red'} : {backgroundColor:'#15294f'}]">{{combo.value * 5}}</td>
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
    bet(){
      return this.$store.state.bet
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
  background-color: #15294f;
  text-align: right;
}

/* Slänger in lite bakgrundsfärg för att se vad jag håller på med */
#body {
  /* background-color: green; */
  padding: 0.5 rem;
  font-size: 0.9rem;
}

th {
  /* background-color: brown; */
  width: 40vw;
  font-family: PressStart2P;
  color: gold;
  text-align: left;
  
  
}

td {
  width: 15vw;
  font-family: PressStart2P;
}

/* Såhär kan vi skriva för att göra en särskild kolumn färgsatt */
td:nth-child(3) {
  /* background-color: greenyellow; */
}

/* Gör varje kolumn jämnbred */
th,
td {
  padding: 0.3rem 0.5rem;
}

col{
border: 2px solid #fffc3b;
}
;
</style>