import { SpellInfo } from "../types";

// This function returns the page needed out of all the pages paginated.
// Inputs required are list of spells, page size, page number
export function paginate(
    array: SpellInfo[],
    page_size: number,
    page_number: number
) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}
