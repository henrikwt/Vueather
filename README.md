# vue-weather-app

## TODO
In order of priority

!! create a ref inside detailedData with all the parameters, also assign them ids, placements etc. then store the preferance
object in localstorage on that "location". just add a default when fetching if necessary.
Try to make drag and drop, where size changes when dragged and dropped.
Could have two versions of each, one square (room for two in the width) and one long (room for one per width)
Then have a special case for 7 day weather.

- [x] Dynamic routing
- [ ] Style the app according to the guidelines
- [ ] Remove getlocation when clicked, give it a home icon to show it's the device location, also have an update button if you move your device
- [ ] Make tabbable and aria-labeled and check contrasts.
- [ ] Make a loading component spinner, suspence etc.
- [ ] Error handling, optional renders etc.
- [ ] Double check the data fetching and displaying to make sure the information is relevant precise etc.
    Not just fetch an adress and pick the first in the array etc. Or at least have arguments for why it is done so
    In this postition, data fetching and accuracy is important.
- [x] Refetch data on homepage every 5 minutes
- [ ] Finish about page
- [ ] Push code to github
- [ ] Use css variables for colors, instead of hardcoding them.
- [ ] Remove input when there are 5 locations (keep it small to avoid too many API calls)
- [ ] Make custom/dynamic styling based on the parameters, rain shows raincloud etc. cold temperature changes background color e.g.
- [ ] Make a visual layout inside each route, which can be customized etc.
- [ ] Clean up code, remove unused components, console.logs etc.
- [ ] Make details draggable and droppable.
- [ ] Add google autocomplete to location input
- [ ] Optimize data fetching
- [ ] Host the site on github pages
- [ ] Use a custom domain

Caseoppgave - webutvikler
Kontekst
Vi søker etter en kreativ og dyktig webutvikler som ønsker å
være med på utvikling av våre økonomistyringssystemer.
Økonomiinfo er et økonomistyringsverktøy som gir enkel 
tilgang til regnskapsinformasjon som ledere og controllere
benytter i sine styrings- og analyseprosesser. Verktøyet henter
data fra lønns- og regnskapssystemet, og dataene vises
gjennom et enkelt og visuelt grensesnitt som er svært
fleksibelt.
Oppgave
Lag en forenklet værtjeneste basert på enhetens lokasjon,
og/eller søkbar lokasjon -og visualiser noen relevante
værparametere. Hvor mange og hvilke parametere som skal
visualiseres er valgfritt.
Føringer
- Benytt JS-rammeverkene React eller Vue
- Hent data via API fra https://open-meteo.com/
- Benytt farger fra DFØs profilveileder. Den finnre du her:
    https://profilveileder.dfo.no/
Format
Webside/app som kan vises frem under andregangsintervjuet.
Under intervjuet skal du begrunne valgene du har tatt, og
fortelle om hvordan du har satt opp løsningen.
Du har inntil 15 minutter til presentasjon.
Lykke til!


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
