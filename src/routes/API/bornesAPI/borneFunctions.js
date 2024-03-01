import { selectedVehicle } from "../carAPI/stores";
export function calculTempsSurBorne(bornesPuissance) {
    let tempsTrajetBornes = [];

    const unsubscribe = selectedVehicle.subscribe(($selectedVehicle) => {
        console.log("----------------------------------------------AAANNNNCCCC")
        console.log(bornesPuissance);
        console.log($selectedVehicle);
        const vehicle = $selectedVehicle;
        const usable_kwh = vehicle.battery.usable_kwh;

        for (let i = 0; i < bornesPuissance.length; i++) { 
            tempsTrajetBornes.push([
                usable_kwh / bornesPuissance[i] 
            ]);
        }
     
        
        
        console.log(tempsTrajetBornes);
    });

    // Unsubscribe when no longer needed
    unsubscribe();
    return tempsTrajetBornes;
}





export async function findNearestBorne(latitude, longitude, distance) {
  let nearestBorne = null;
  try {
    const response = await fetch(`http://127.0.0.1:3000/findNearestBorne?latitude=${latitude}&longitude=${longitude}&distance=${distance}`);
    nearestBorne = await response.json();
    console.log(nearestBorne);
    return nearestBorne;
  } catch (error) {
    console.error('Erreur lors de la recherche de la borne la plus proche depuis le serveur Express :', error);
    return [-1,-1];
  }
}
