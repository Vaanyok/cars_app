import { onMount } from 'svelte';

let result = '';


export async function calculTimeSOAP(numbers) {

  // onMount(async () => {
    //const numbers = [12.2, 12.3, 1.7];
    const URL = "https://carsapprestapi.azurewebsites.net/"
    try {
      const response = await fetch(URL+`calculateHour?numbers=${JSON.stringify(numbers)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('Result:', result);
        return result.result
      } else {
        throw new Error('Invalid content type. Expected JSON.');
        return -1;
      }
    } catch (error) {
      console.error('Error:', error.message);
      return -1;
    }
  // });

}
