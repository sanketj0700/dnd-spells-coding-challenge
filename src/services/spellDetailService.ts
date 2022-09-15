import { memoize } from "lodash";
const apiUrl = process.env.REACT_APP_APIURL;

// This function fetches all the information for a particular spell
// The input required is the index of the spell
export async function getSpellDetails(index: string | undefined) {
    try {
        const response = await fetch(`${apiUrl}spells/${index}`);
        return await response.json();
    } catch (error: any) {
        //Error handling can be implemented here. For now the errors are logged in console.
        console.log(error.message);
        throw error;
    }
}

// Caching happens via lodash memoize
export default memoize(getSpellDetails);
