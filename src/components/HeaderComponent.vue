<template>
  <header>
    <div class="vueather">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <span class="vueather-text">
        ueather
      </span>
    </div>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Hjem</RouterLink>
         |  
        <RouterLink to="/about">Om siden</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.vueather {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 5rem;
  
}
.vueather-text {
  /* align-self: center; */
  font-weight: 700;
  color: #005b91;
  text-transform: uppercase;
  margin-block-end: -26px;
  margin-left: -26px;
}

@media (max-width: 450px) {
  .vueather-text {
    display: none;
  }
} 

nav {
  padding: 1rem;
  text-align: center;
}

</style>
