<!-- CitySearch.svelte -->

<script>
  import axios from 'axios';

  export let onCitySelected;

  import { createEventDispatcher } from 'svelte';
  import {OPEN_CAGE_API_KEY} from "../lib/Env"
 

  const dispatch = createEventDispatcher();


  let searchTerm = '';
  let searchResults = [];



  async function searchCity() {
    try {
      if (searchTerm.trim().length < 2) {
        return;
      }

      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: searchTerm,
          key: OPEN_CAGE_API_KEY,
          countrycode: 'fr',
        },
      });

      searchResults = response.data.results
        .filter(result => result.components && result.components.city && result.geometry)
        .map((result, index) => ({
          id: `${result.components.city}-${index}`, // Unique identifier
          name: result.components.city,
          coordinates: {
            latitude: result.geometry.lat,
            longitude: result.geometry.lng,
          },
        }));
    } catch (error) {
      console.error('City search error:', error);
    }
  }

 function selectCity(city) {
    const selectedCity = searchResults.find(result => result.name === city);
    if (selectedCity) {
      dispatch('citySelected', selectedCity);
      searchTerm = city; // Set the search term to the selected city
      searchResults = []; // Clear all searches after selection
    }
  }

 
</script>

<style>
  /* Main container style */
  div {
    position: relative;
    width: 300px; /* Adjust as needed */
    margin: 10px; /* Add margin as needed */
  }

  /* Input style */
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
  }

  /* Search results style */
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    z-index: 1;
  }

  li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  li:hover {
    background-color: #f0f0f0;
  }

  div {
    cursor: pointer;
  }

  div:hover {
    background-color: #f0f0f0;
  }
</style>

<div>
  <input bind:value={searchTerm} placeholder="Search for a city" on:input={searchCity} />

  {#if searchResults.length > 0}
    <ul>
        {#each searchResults as { id, name } (id)}
        <li>
          <div on:click={() => selectCity(name)}>
            {name}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

