<template>
  <div id="body">
    <h1 class="headline">Välkommen till vårt projekt</h1>
    <p class="message">Vi har ett spel samt ett test för dig att prova på. Du kan navigera till dessa genom navigationsmenyn nedanför/ovanför.</p>

    <footer>
      <p>Denna sida har skapats av Martin Westerlund och Atlan Talebi.</p>
    </footer>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  #body {
    background-color: #555;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-family: FjallaOne;
    font-size: 2.5rem;
  }

  p {
    font-family: NotoSans;
  }

  .headline {
    margin: 2rem auto 0
  }

  .message {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin: 0 10vw;
  }

  footer {
    display: flex;
    background-color: #333;
    height: 10vh;
    justify-content: center;
    align-items: center;
  }
</style>
