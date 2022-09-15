import { createSlice } from "@reduxjs/toolkit";
import { SpellInfo } from "../../types";

export const initialState = {
    value: [],
    status: "idle",
};

type SliceState = {
    value: SpellInfo[];
    status: string;
};

type SliceAction = {
    payload: SpellInfo;
    type: string;
};

// contains logic for reducers in
// Adds / Removes spells in favourite spell list
export const favouriteSpellSlice = createSlice({
    name: "favouriteSpell",
    initialState,
    reducers: {
        markAsFavourite: (state: SliceState, action: SliceAction) => {
            state.value.push(action.payload);
        },
        unmarkAsFavourite: (state, action) => {
            let index = state.value.findIndex(
                (item: { index: number }) => item.index === action.payload
            );
            state.value.splice(index, 1);
        },
    },
});

export const { markAsFavourite, unmarkAsFavourite } =
    favouriteSpellSlice.actions;

export const selectFavourites = (state: { favouriteSpell: { value: any } }) => {
    return state.favouriteSpell.value;
};

export default favouriteSpellSlice.reducer;
