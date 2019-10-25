<template>
  <div id="body" :class="{ modern: on, classic: !on }">
    <table id="table">
      <thead>
        <tr v-for="combo in combinations">
          <th>{{combo.type}}</th>
          <td :class="{selected: bet === 1}">{{ combo.value }}</td>
          <td :class="{selected: bet === 2}">{{combo.value * 2}}</td>
          <td :class="{selected: bet === 3}">{{combo.value * 3}}</td>
          <td :class="{selected: bet === 4}">{{combo.value * 4}}</td>
          <td :class="{selected: bet === 5}">{{combo.value * 5}}</td>
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
    bet() {
      return this.$store.state.bet;
    },
    on() {
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
  text-align: right;
}

.modern {
  line-height: 0.9rem;
}

.classic table {
  background-color: #15294f;
  transition: background-color 300ms linear;
}

.modern table {
  background-color: #777;
  transition: background-color 300ms linear;
}

/* Slänger in lite bakgrundsfärg för att se vad jag håller på med */
#body {
  padding: 0.5 rem;
  font-size: 0.8rem;
}

.classic {
  border: 4px solid yellow;
}

.modern {
  border: 4px solid #ccc;
}

.classic .selected {
  background-color: red;
  color: #fff;
  transition: background-color 300ms linear;
}

.modern .selected {
  background-color: #66c3ff;
  color: #444;
  transition: background-color 300ms linear;
}

.classic th {
  font-family: PressStart2P;
  color: gold;
  border-right: 4px solid yellow;
}

th {
  width: 40vw;
  text-align: left;
}

td {
  width: 15vw;
}

.classic th {
  background-color: #15294f;
  font-family: PressStart2P;
  color: gold;
  transition: background-color 300ms linear;
}

.classic td {
  font-family: PressStart2P;
  border-right: 4px solid yellow;
}

.modern th {
  font-family: FjallaOne;
  background-color: #bbb;
  color: #eee;
  font-size: 1rem;
  transition: background-color 300ms linear;
}

.modern td {
  font-family: NotoSans-Bold;
  font-size: 0.9rem;
}

/* Gör varje kolumn jämnbred */
th,
td {
  padding: 0.3rem 0.5rem;
}

.classic col {
  border: 2px solid #fffc3b;
}
</style>