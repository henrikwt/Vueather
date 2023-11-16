<template>
  <header>
    <div class="vueather">
      <h1 style="display: none">Vueather</h1>
      <img
        alt="Vueather, the name of the app"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      />
      <span class="vueather-text" aria-hidden="true"> ueather </span>
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
a {
  color: var(--color-text-link);
}
.vueather {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 5rem;
}
.vueather-text {
  font-weight: 700;
  color: var(--color-heading);
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
