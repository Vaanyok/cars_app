  <script>
    import { selectedVehicle } from "./stores";

    export let vehicleDetails;
    //console.log(vehicleDetails)

    // Function to format range information
    const formatRange = (range) => `Highway: ${range.highway} miles, City: ${range.city} miles, Combined: ${range.combined} miles`;

  


    console.log(vehicleDetails)
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  {#if vehicleDetails}
  <div id="vehicle-details" class="details-container">
    <h2><i class="fas fa-car"></i> {vehicleDetails.naming.make} {vehicleDetails.naming.model}</h2>

    <div>
      <h3><i class="fas fa-battery-half"></i> Battery</h3>
      {#if vehicleDetails.battery}
        <p><i class="fas fa-bolt"></i> Usable kWh: {vehicleDetails.battery.usable_kwh}</p>
      {/if}
    </div>

    <div>
      <h3><i class="fas fa-plug"></i> Connectors</h3>
      <ul>
        {#each vehicleDetails.connectors as connector}
          <li><i class="fas fa-charging-station"></i> {connector.standard}</li>
        {/each}
      </ul>
    </div>

    <div>
      <h3><i class="fas fa-photo-video"></i> Media</h3>
      <img class="brand-image" src={vehicleDetails.media.brand.thumbnail_url} alt="Brand Image" />
      <img class="vehicle-image" src={vehicleDetails.media.image.url} alt="Vehicle Image" />
    </div>

    <div>
      <h3><i class="fas fa-tag"></i> Naming</h3>
      <p><i class="fas fa-car"></i> Make: {vehicleDetails.naming.make}</p>
      <p><i class="fas fa-model-kit"></i> Model: {vehicleDetails.naming.model}</p>
      {#if vehicleDetails.naming.chargetrip_version}
        <p><i class="fas fa-info-circle"></i> Chargetrip Version: {vehicleDetails.naming.chargetrip_version}</p>
      {/if}
    </div>

    <div>
      <h3><i class="fas fa-tachometer-alt"></i> Performance</h3>
      {#if vehicleDetails.performance}
        <p><i class="fas fa-tachometer-alt"></i> Acceleration: {vehicleDetails.performance.acceleration} seconds</p>
        <p><i class="fas fa-speedometer"></i> Top Speed: {vehicleDetails.performance.top_speed} mph</p>
      {/if}
    </div>

    <div>
      <h3><i class="fas fa-route"></i> Range</h3>
      {#if vehicleDetails.range}
        <p><i class="fas fa-road"></i> Best Range: {formatRange(vehicleDetails.range.best)}</p>
        <p><i class="fas fa-exchange-alt"></i> Worst Range: {formatRange(vehicleDetails.range.worst)}</p>
      {/if}
    </div>

    <div>
      <h3><i class="fas fa-map-marker-alt"></i> Routing</h3>
      {#if vehicleDetails.routing}
        <p><i class="fas fa-charging-station"></i> Fast Charging Support: {vehicleDetails.routing.fast_charging_support ? 'Yes' : 'No'}</p>
      {/if}
    </div>
  </div>
  {/if}

  <style>
.details-container {
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 300px;
      border: 2px solid #ccc;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      background-color: #f8f8f8;
      z-index: 1000;
    }

    /* Add this style to ensure the box doesn't extend beyond the right and bottom edges */
    body {
      margin-bottom: 330px;
    }

    /* Center and style the titles */
    h2 {
      text-align: center;
      color: #333;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }

    h3 {
      margin-top: 10px;
      text-align: center;
      font-weight: bold;
      font-size: 1rem;
      color: #555;
      margin-bottom: 5px;
    }

    p {
      margin-bottom: 5px;
      color: #777;
      font-size: 0.9rem;
    }

    ul {
      padding: 0;
      list-style: none;
      margin-top: 5px;
    }

    li {
      margin-bottom: 5px;
      color: #777;
      font-size: 0.9rem;
    }

    .brand-image,
    .vehicle-image {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 10px 0;
      border-radius: 8px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    i {
      margin-right: 5px;
      color: #555;
    }

    /* Use Material Icons for the range icons */
    .details-container i.fa-road::before {
      content: '\e919'; /* Material Icons road icon */
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 1.2rem; /* Adjust the size as needed */
      color: #555; /* Adjust the color as needed */
    }

    .details-container i.fa-exchange-alt::before {
      content: '\e5c9'; /* Material Icons swap_horiz icon */
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 1.2rem; /* Adjust the size as needed */
      color: #555; /* Adjust the color as needed */
    }

    /* Use Material Icons for the naming icons */
    .details-container i.fa-car::before {
      content: '\e531'; /* Material Icons directions_car icon */
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 1.2rem; /* Adjust the size as needed */
      color: #555; /* Adjust the color as needed */
    }

    .details-container i.fa-model-kit::before {
      content: '\e8cc'; /* Material Icons model_training icon */
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 1.2rem; /* Adjust the size as needed */
      color: #555; /* Adjust the color as needed */
    }

    .details-container i.fa-info-circle::before {
      content: '\e88e'; /* Material Icons info icon */
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 1.2rem; /* Adjust the size as needed */
      color: #555; /* Adjust the color as needed */
    }
  </style>
