          
import { Client, cacheExchange, fetchExchange } from '@urql/svelte';
import { getVehicleListQuery, getVehicleDetailsQuery } from './queries';
 
/**
 * For the purpose of this example we use urgl - lightweights GraphQL client.
 * To establish a connection with Chargetrip GraphQL API you need to have an API key.
 * The key in this example is a public one and gives an access only to a part of our extensive database.
 * You need a registered `x-client-id` to access the full database.
 * Read more about an authorisation in our documentation (https://docs.chargetrip.com/#authorisation).
 */ 
const headers = {
  //Replace this x-client-id and app-id with your own to get access to more vehicles
  'x-client-id': '659fe63003f11572e9c6a5ad',
  'x-app-id': '659fe63003f11572e9c6a5af',
};
 
const client = new Client({
    url: 'https://api.chargetrip.io/graphql',
    fetchOptions: {
        method: 'POST',
        headers,
    },
    exchanges: [cacheExchange, fetchExchange],
});
 


/**
 * You can access a list of all available vehicles using the `vehicleList` query.
 * In this example we use our playground, which has only 12 vehicles available.
 * Chargetrip operates an extensive database of EV makes, editions, and versions,
 * each with their specific consumption models.
 * You need a registered x-client-id to access the full vehicle database.
 * You can obtain a registered x-client-id on https://account.chargetrip.com/
 * **/

export const getVehicleList = () => {
  return client
    .query(getVehicleListQuery, undefined)
    .toPromise()
    .then(response => {
      return {
        data: response.data,
      };
    })
    .catch(error => {
      console.error(error);
      return {
        data: undefined,
      };
    });
};
 

/**
 * You can access more detailed information of a specific vehicle using the `vehicle` query.
 * This set of data is a limited set of everything that is available.
 * If you need more you can contact us to get access to our `vehiclePremium` query.
 * @param { string } vehicleId - the id of the vehicle that we want the details of
 */
export const getVehicleDetails = (vehicleId) => {
  return client
    .query(getVehicleDetailsQuery, { vehicleId })
    .toPromise()
    .then(response => {
      return {
        data: response.data,
      };
    })
    .catch(error => {
      console.error(error);
      return {
        data: undefined,
      };
    });
};
        