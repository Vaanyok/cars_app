<script>
  import { onMount } from 'svelte';
  import { getVehicleDetails } from './client';

  let vehicles = [];

  onMount(async () => {
    try {
      const response = await fetchVehicleList(); // Fetch your vehicle list here
      // @ts-ignore
      vehicles = response.data?.vehicleList || [];
    } catch (error) {
      console.error(error);
    }
  });

  const fetchVehicleList = async () => {
    // Implement your logic to fetch the vehicle list
    // You can use client.query or any other method
    // Example:
    // const response = await client.query(getVehicleListQuery, undefined);
    // return response;
  };

  const renderVehicleImage = imageData => {
    const vehicleImage = document.getElementById('vehicle-details-image');
    const brandImage = document.getElementById('vehicle-details-brand');

    // @ts-ignore
    vehicleImage.src = `${imageData.image.url}`;
    // @ts-ignore
    brandImage.src = `${imageData.brand.thumbnail_url}`;
  };

  const renderVehicleListData = (elementId, data, isTable) => {
    const element = document.getElementById(elementId);

    element.innerHTML = '';

    if (isTable) {
      element.innerHTML += `
        <tr>
          <th>Situation</th>
          <th>Mild 23 ºC</th>
          <th>Cold -10 ºC</th>
        </tr>`;
    }

    Object.keys(data).forEach(key => {
      element.innerHTML += isTable
        ? `<tr>
            <td>${key}</td>
            <td>${data[key].best}</td>
            <td>${data[key].worst}</td>
          </tr>`
        : `<li>
            <p>${key}</p>
            <p>${data[key]}</p>
          </li>`;
    });
  };

  const didClickVehicle = (event, index) => {
    event.preventDefault();

    const detailsPage = document.getElementById('vehicle-details');
    const vehicleImage = document.getElementById('vehicle-details-image');
    const brandImage = document.getElementById('vehicle-details-brand');

    // @ts-ignore
    vehicleImage.src = '';
    // @ts-ignore
    brandImage.src = '';

    formatVehicleDetails(vehicles[index].id);

    detailsPage.classList.add('show');
    [...document.querySelectorAll('.card > *')].forEach(el => {
      el.classList.add('hide');
    });
  };

  const didClickBack = event => {
    event.preventDefault();

    const detailsPage = document.getElementById('vehicle-details');

    detailsPage.classList.remove('show');
    [...document.querySelectorAll('.card > *')].forEach(el => {
      el.classList.remove('hide');
    });
  };

  const formatVehicleDetails = async vehicleId => {
    try {
      const data = await getVehicleDetails(vehicleId);
      const formattedData = formatVehicleData(data);

      // @ts-ignore
      renderVehicleImage(data.vehicle.media);
      renderVehicleListData('vehicle-details-general', formattedData[0], false);
      renderVehicleListData('vehicle-details-range', formattedData[1], true);
      renderVehicleListData('vehicle-details-performance', formattedData[2], false);
    } catch (error) {
      console.error(error);
    }
  };

  // @ts-ignore
  const formatVehicleData = data => {
    // Implement the formatting logic for vehicle data
    // Similar to the provided JavaScript code
    // Return the formatted data
  };
</script>

<style>
  /* Add your styles here */
</style>

<div id="vehicle-list">
  {#each vehicles as vehicle, index (vehicle.id)}
    <li class="vehicle-list-element" on:click={(e) => didClickVehicle(e, index)}>
      <div class="vehicle-list-image">
        <img class="vehicle-image" alt="vehicle image" src={vehicle.media.image.thumbnail_url} />
      </div>
      <div class="vehicle-list-data">
        <p><strong>{vehicle.naming.model} {vehicle.naming.chargetrip_version || ''}</strong></p>
        <p>{vehicle.naming.make}</p>
      </div>
    </li>
  {/each}
</div>

<div id="vehicle-details">
  <!-- Add your vehicle details HTML here -->
  <img id="vehicle-details-image" alt="Vehicle Image" />
  <img id="vehicle-details-brand" alt="Brand Image" />
  <div id="vehicle-details-name"></div>
  <div id="vehicle-details-version"></div>
  <div id="vehicle-details-general"></div>
  <div id="vehicle-details-range"></div>
  <div id="vehicle-details-performance"></div>
  <button id="vehicle-details-back" on:click={didClickBack}>Back</button>
</div>
