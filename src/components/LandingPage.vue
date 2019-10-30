<template>
  <div id="body">
    <h1 class="headline">Välkommen till vårt projekt</h1>
    <p class="message">Vi har ett spel samt ett test för dig att prova på.<br>Du kan tag dig till dessa genom navigationsmenyn ovanför.</p>

    <footer>
      <p>Denna webbplats har skapats av Martin Westerlund och Atlan Talebi.</p>
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
    color: #ddd;
    text-align: center;
  }

  h1 {
    font-family: FjallaOne;
    font-size: 2.5rem;
    color: #ddd;
  }

  p {
    font-family: NotoSans;
  }

  .headline {
    margin: 2rem auto 0;
  }

  .message {
    display: flex;
    justify-content: center;
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
