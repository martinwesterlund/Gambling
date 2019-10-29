<template>
  <div id="body" :class="{ modern: on, classic: !on }">
    <table id="table">
      <thead>
        <tr v-for="combo in combinations" :key="combo.type + combo.value">
          <th>{{combo.type}}</th>
          <td :class="{selected: bet === 1}">{{ combo.value }}</td>
          <td :class="{selected: bet === 2}">{{ combo.value * 2 }}</td>
          <td :class="{selected: bet === 3}">{{ combo.value * 3 }}</td>
          <td :class="{selected: bet === 4}">{{ combo.value * 4 }}</td>
          <td :class="{selected: bet === 5}">{{ combo.value * 5 }}</td>
          <!-- Format ovan verkar fungera bra för att visa tabellen  -->
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    bet() {
      return this.$store.state.bet;
    },
    combinations() {
      return this.$store.state.combinations;
    },
    on() {
      return this.$store.state.modern;
    }
  }
};
</script>

<style scoped>

#body {
  width: 100vw;
  padding: 0.5 rem;
  font-size: 0.8rem;
}

.modern {
    border-top: 3px solid #ccc;
    border-bottom: 4px solid #ccc;
  }

.modern table {
  border-collapse: collapse;
  text-align: right;
  width: 100%;
  font-family: FjallaOne;
  background-color: #777;
  border-spacing: 0px;
}

.modern th {
  text-align: left;
  background-color: #bbb;
  
}

.modern td {
  font-family: NotoSans-Bold;
  font-size: 0.9rem;
  width: 12vw;
  
}

.modern th,
.modern td {
  padding: 3px;
  color: #eee;
  border: 1px solid transparent;
}

.modern .selected {
  background-color: #66c3ff;
  color: #444;
  transition: background-color 300ms linear;
}

.classic table {
  border-collapse: collapse;
  text-align: right;
  width: 100%;
  font-family: PressStart2P;
  background-color: #15294f;
  color: yellow;
  height: 25vh;
  font-size: 0.6rem;
  line-height: 150%;
}

.classic {
  border: 4px solid yellow;
}

.classic th {
  text-align: left;
}

.classic td {
  border-left: 4px solid yellow;
}

.classic th,
.classic td {
  padding: 3px;
  color: yellow;
}

.classic .selected {
  background-color: red;
  transition: background-color 300ms linear;
}

@media only screen and (min-width: 481px) {
  .classic table{
    font-size: 0.8rem;
  }
  .classic td {
  font-size: 1.1rem;
  width: 12vw;
}
}

@media only screen and (min-width: 769px) {
  #body {
    max-width: 900px;
  }
  .classic table{
    font-size: 1rem;
  }

  .modern table{
    font-size: 1.2rem;
  }

  .modern td {
  font-family: NotoSans-Bold;
  font-size: 1.1rem;
  width: 12vw;
}
  th {
    width: 60vw;
    text-align: left;
  }
  
}
</style>
