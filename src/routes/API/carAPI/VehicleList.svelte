<!-- VehicleList.svelte -->
<script>
    import { onMount } from "svelte";
    import VehicleDetails from "./VehicleDetails.svelte";
    import { selectedVehicle } from "./stores.js";
    import { getVehicleList, getVehicleDetails } from "./client";

    
    let vehicleList = [];
    let selectedVehicleId = null;


    onMount(async () => {
        // Fetch the list of vehicles when the component is mounted
        try {
            const response = await getVehicleList();
            
            vehicleList = response.data?.vehicleList || [];
        } catch (error) {
            console.error("Error fetching vehicle list:", error);
        }
    });

    const handleVehicleClick = async (event, vehicle) => {
        event.preventDefault();

        
        // Toggle selection
        selectedVehicleId = selectedVehicleId === vehicle.id ? null : vehicle.id;
        console.log(selectedVehicleId);
        // Fetch detailed information for the selected vehicle
        if (selectedVehicleId !== null) {
            try {
                const response = await getVehicleDetails(selectedVehicleId);
                const detailedVehicle = response.data;
                console.log("COUCOU");
                selectedVehicle.set(detailedVehicle.vehicle);
            
            } catch (error) {
                console.error("Error fetching vehicle details:", error);
            }
        } else {
            // No vehicle selected, reset details
            selectedVehicle.set(null);
        }
    };
</script>

<div id="vehicle-list">
   

    {#each vehicleList as vehicle (vehicle.id)}
        <div
            class="vehicle-list-element"
            class:selected={selectedVehicleId === vehicle.id}
            on:click={(e) => handleVehicleClick(e, vehicle)}
        >
            <div class="vehicle-list-image">
                <img
                    class="vehicle-image"
                    alt="vehicle image"
                    src={vehicle.media?.image?.thumbnail_url}
                />
            </div>
            <div class="vehicle-list-data">
                <p>
                    <strong>{vehicle.naming?.model} {vehicle.naming?.chargetrip_version || ""}</strong>
                </p>
                <p>{vehicle.naming?.make}</p>
            </div>
        </div>
    {/each}
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

<style>
    #vehicle-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        overflow-y: auto;
        max-height: 100vh;
        padding: 10px;
        background-color: #f8f8f8;
    }

    .vehicle-list-element {
        border: 2px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        width: 200px;
        height: 250px; /* Set a fixed height */
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .vehicle-list-element:hover {
        background-color: #e0f0ff;
    }

    .vehicle-list-element:selected {
        background-color: #c5def5;
        border-color: #007bff;
    }

    .vehicle-list-image {
        overflow: hidden;
        border-radius: 8px;
        flex-grow: 1;
    }

    .vehicle-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .vehicle-list-data {
        margin-top: 10px;
    }

    p {
        margin: 0;
        font-size: 0.9rem;
        color: #333;
    }

    strong {
        font-weight: bold;
    }

    /* Additional styling for VehicleDetails component */
    .details-container {
        border: 2px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        max-width: 400px;
        margin: 10px auto;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    h2 {
        text-align: center;
        font-size: 1.2rem;
        color: #333;
        margin-bottom: 5px;
    }

    h3 {
        margin-top: 5px;
        margin-bottom: 5px;
        color: #555;
        font-size: 1rem;
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


</style>
