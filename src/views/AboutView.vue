<template>
  <div class="about">
    <h1>Om siden</h1>
    <br />
    <div class="about-text">
      <p>
        Vueather er en applikasjon som henter inn værdata om dine foretrukne lokasjoner. Dataene er
        hentet fra <a href="https://open-meteo.com/">Open-Meteo</a>. Fargeprofil, samt
        designinspirasjon er hentet fra <a href="https://profilveileder.dfo.no/">DFØ</a>. Prosjektet
        er laget i forbindelse med intervjuprosessen for stillingen som webutvikler hos DFØ.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about {
  background-color: var(--color-text-soft);
  padding: 2rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}
h1 {
  text-align: center;
}
.about-text {
  max-width: 80ch;
}
a {
  color: var(--color-text-link);
}
</style>
