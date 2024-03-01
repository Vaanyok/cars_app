<script>
    import { writable } from "svelte/store";
    import CitySearch from "./CitySearch.svelte";
    import VehicleList from "./API/carAPI/VehicleList.svelte";
    import { selectedVehicle } from "./API/carAPI/stores";
    import VehicleDetails from "./API/carAPI/VehicleDetails.svelte";
    import Map from "./map/Map.svelte";
    import { mapStore } from "./map/mapstore";

    let selectedCity1 = {};
    let selectedCity2 = {};

    // Create a writable variable to hold the reference to the map component
    let mapComponent = writable(null);

    function handleCitySelected(event) {
        selectedCity1 = event.detail;
        console.log("Selected City:", selectedCity1);
        $mapStore.addCity(selectedCity1);
    }

    function handleCitySelected2(event) {
        selectedCity2 = event.detail;
        console.log("City selected:", selectedCity2);
        $mapStore.addCity(selectedCity2);

        Visible();
    }

    let visible = false;

    function Visible() {
        console.log("---VISIBLE---");

        visible =
            selectedCity1 != null &&
            selectedCity2 != null &&
            $selectedVehicle != null;
        console.log(visible);
    }

    function createRoad() {
        console.log("--------");
        console.log($selectedVehicle);
        $mapStore.createRoad(
            [selectedCity1, selectedCity2],
            $selectedVehicle.range.chargetrip_range,
        );

        visible = !visible;
    }

    let isExpanded = false;

    function toggleExpansion() {
        isExpanded = !isExpanded;
    }
</script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<div class="container">
    <div class="content">
        <div
                class="toggle-arrow {isExpanded ? 'expanded' : ''}"
                on:click={toggleExpansion}
            >
                {#if isExpanded}
                 <i class="material-icons" style="font-size: 1.5rem;">menu_open</i>
                {:else}
                <i class="material-icons" style="font-size: 1.5rem;">menu</i>
                {/if}
            </div>
            
        <div class="left-column {isExpanded ? 'expanded' : ''}">
            <h2>Vehicle List</h2>
            <VehicleList />
        </div>

        <div class="map-container {isExpanded ? 'expanded' : ''}">
            <div id="map" />
            <!-- Pass the mapStore as a prop to the Map component -->
            <Map {mapStore} bind:this={mapComponent} />
            <div class="search-bars">
                <div class="search-bar">
                    <CitySearch on:citySelected={handleCitySelected} />
                </div>
                <div class="search-bar">
                    <CitySearch on:citySelected={handleCitySelected2} />
                </div>
            </div>
            {#if visible}
                <button on:click={() => createRoad()} class="start-button"
                    >START</button
                >
            {/if}
        </div>
    </div>

    {#if $selectedVehicle}
    {#await $selectedVehicle}
        <p>Loading details...</p>
    {:then vehicleDetails}
        <VehicleDetails {vehicleDetails} />
    {:catch error}
        <p>Error loading details: {error.message}</p>
    {/await}
{/if}

</div>

<style>
    body,
    html {
        height: 100%;
        margin: 0;
        overflow: hidden;
    }

    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .content {
        display: flex;
        flex: 1;
    }

    .left-column {
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
        background-color: #f8f8f8;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease; /* Use transform for smoother animation */
        height: min-content;
        transform: translateX(200);
        display : true;
    }

    .toggle-arrow {
        cursor: pointer;
        font-size: 1.5rem;
        position: relative;
        z-index: 1000000000; 
        transition: transform 0.3s ease; /* Use transform for smoother arrow animation */
    }

    .left-column.expanded {
        padding :0;
        display : false;
        transform: translateX(-250px);
    }

    .toggle-arrow.expanded {
        transform: translateX(
            100px
        ); /* Adjust this value to control the expanded arrow position */
    }
    .map-container.expanded{
        flex: 1;
        padding: 0;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .map-container {
        flex: 3;
        padding: 0;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        position: relative;
    }

    #map {
        height: 100%;
        width: 100%;
        z-index: 0;
    }

    .search-bars {
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
    }

    .start-button {
        position: absolute;
        bottom: 200px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        display: block;
    }
</style>
