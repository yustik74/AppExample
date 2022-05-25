<template>
  <div id="app">
    <section class="hero is-small is-info">
      <div class="hero-body">
        <p class="title">
          Пример приложения
        </p>
        <p class="subtitle">
          Шаблон для разработки на Typescript + VueJS + Buefy
        </p>
      </div>
    </section>
    <div id="nav">
      <router-link to="/">Главная</router-link> |
      <router-link to="/about">О приложении</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #167df0;
    }
  }
}
</style>
