function calculateDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(coord2.lat - coord1.lat);
    const dLng = toRadians(coord2.lng - coord1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(coord1.lat)) *
        Math.cos(toRadians(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  export function getLatLngAtDistance(routeline, distance) {
    const coordinates = routeline.coordinates;
    console.log(coordinates);
    let cumulativeDistance = 0;
    let waypoints = [];

    for (let i = 0; i < coordinates.length - 1; i++) {
      const segmentDistance = calculateDistance(
        coordinates[i],
        coordinates[i + 1],
      );

      cumulativeDistance += segmentDistance;
      //console.log(cumulativeDistance,segmentDistance)
      if (cumulativeDistance >= distance) {
        waypoints.push(coordinates[i]);
        cumulativeDistance = 0; // Reset cumulative distance for the next segment
      }
    }

    return waypoints;
  }


  export function supprimerElementParClasse(classe) {
    var element = document.querySelector('.' + classe);
  
    if (element) {
      element.parentNode.removeChild(element);
    }
  }
  

  