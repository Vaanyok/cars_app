<!-- Map.svelte -->

<script>
  import { onMount } from "svelte";
  import TimeComponent  from "./timeComponent.svelte";
  let tc;
  import { mapStore } from "./mapstore";
  

  import {calculTimeSOAP} from "../API/soapAPI/sendersoap.js"
  import {
    calculTempsSurBorne,
    findNearestBorne,
  } from "../API/bornesAPI/borneFunctions";

  import {
    getLatLngAtDistance,
    supprimerElementParClasse,
  } from "./MapFunctions.js";
  let map = null;
  let marker = null;
  let routingControl = null;
  let summaryDistance = 0;
  let location = {
    name: "France",
    coordinates: [45.62117, 5.8531472, 13],
    url: "https://www.centralpark.com/",
  };

  let defaultLatLng = [46.71109, 1.7191036];

  function addCity(city) {
    if (typeof window !== "undefined") {
      const L = window.L;
    }

    let latlng = [city.coordinates.latitude, city.coordinates.longitude];
    marker = L.marker(latlng).addTo(map);

    marker.bindPopup(`
      <strong>
        <name your variable VITE_<some name> for example VITE_API_URL to store where your backend location is. That's not sensitive information so it's ok to expose this through your svelte app to the internet.a href='${city.url}' target='_blank'>${city.name}</a>
      </strong>
    `);

    map.setView(latlng, 13);
  }

  async function createFinalRoad(WaypointsTrajet, waypointsPuissanceBorne) {
    // Remove existing routing control if it exists
    console.log("-------");
    console.log(WaypointsTrajet);
    if (routingControl) {
      map.removeControl(routingControl);
    }


      // Now, create the routing control
      routingControl = L.Routing.control({
        WaypointsTrajet,
        routeWhileDragging: false,
        show: false,
        instructions: false,
      }).addTo(map);
    // Create new routing control based on WaypointsTrajet
    routingControl = L.Routing.control({
      waypoints: WaypointsTrajet, // Ensure you pass waypoints correctly
      routeWhileDragging: false,
      show: false,
      instructions: false,
    }).addTo(map);
    supprimerElementParClasse("leaflet-routing-container");


    const tempsBorne =  await calculTimeSOAP(calculTempsSurBorne(waypointsPuissanceBorne).flat(1));
    const tempsTrajet = (summaryDistance / 60 / 60).toFixed(2);
    const tempsTotal = await calculTimeSOAP([tempsBorne,tempsTrajet])
    
    console.log("temps---");
    console.log(tempsBorne, tempsTrajet);
    tc.afficherTempsTotal(tempsTrajet,tempsBorne,tempsTotal);
    // Remove the routing container
    supprimerElementParClasse("leaflet-routing-container");
    
  }

  function createRoad(cities, chargetrip_range) {
    let roadLoaded = false;

    // Remove existing routing control if it exists
    if (routingControl) {
      map.removeControl(routingControl);
    }

    // Create new routing control based on cities
    if (cities.length > 1) {
      const waypoints = cities.map((city) =>
        L.latLng(city.coordinates.latitude, city.coordinates.longitude),
      );

      // Now, create the routing control
      routingControl = L.Routing.control({
        waypoints,
        routeWhileDragging: false,
        show: false,
        instructions: false,
      }).addTo(map);
      supprimerElementParClasse("leaflet-routing-container");

      // Event handler for routes found
      routingControl.on("routesfound", async function (event) {
        const routeLine = event.routes[0];
        console.log(routeLine);
        summaryDistance = routeLine.summary.totalTime;

        if (!roadLoaded) {
          // Place markers every 100 km along the route
          const worst_range = chargetrip_range.worst;

          if (worst_range < routeLine.summary.totalDistance / 1000) {
            console.log("coucou");
            const markers = getLatLngAtDistance(routeLine, worst_range);

            console.log(markers);

            let waypointsWithBornes = [];
            let waypointsPuissanceBorne = [];

            // Array to store waypoints including bornes
            waypointsWithBornes.push(
              [waypoints[0].lat, waypoints[0].lng],
            );

            for (const markerLatLng of markers) {
              try {
                //console.log(markerLatLng);
                const nearestBorne = await findNearestBorne(
                  markerLatLng.lat,
                  markerLatLng.lng,
                  0.0001,
                );
                //console.log("Nearest Borne:", nearestBorne);

                waypointsWithBornes.push(
                    [nearestBorne.ylatitude,
                    nearestBorne.xlongitude]
                );
                waypointsPuissanceBorne.push([nearestBorne.puiss_max]);

                //console.log(waypointsWithBornes);
              } catch (error) {
                console.error("Error fetching data for nearest borne:", error);
              }
            }
            waypointsWithBornes.push(
              [waypoints[1].lat, waypoints[1].lng],
            );
            map.removeControl(routingControl);

            createFinalRoad(waypointsWithBornes, waypointsPuissanceBorne);
            // Remove the routing container
            
          }
          else{
            tc.afficherTempsTotal((summaryDistance/60/60).toFixed(2),0,(summaryDistance/60/60).toFixed(2));
          }
        }
      });
    }
  }

  onMount(async () => {
    const L = await import("leaflet");
    map = L.map("map").setView(defaultLatLng, 10);
    const LRouting = await import("leaflet-routing-machine");

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
        subdomains: "abcd",
        Zoom: 6,
        maxZoom: 15,
        minZoom: 6,
      },
    ).addTo(map);

    mapStore.update((store) => {
      store.addCity = addCity;
      store.createRoad = createRoad;
      return store;
    });
  });
</script>

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>
<TimeComponent bind:this={tc} />

<style>
  .leaflet-routing-container.leaflet-routing-container-hide {
    display: none;
  }
</style>
