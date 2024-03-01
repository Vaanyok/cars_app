// mapstore.js

import { writable } from 'svelte/store';

const mapStore = writable({
  currentCity: null,
  addCity: null,
  createRoad: null,
  getCities : null
});

export { mapStore };
