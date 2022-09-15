import reducer, {
    markAsFavourite,
    initialState,
    unmarkAsFavourite,
} from "../spellSlice";
import { store } from "../../../store/store";
import { SpellInfo } from "../../../types";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

test("Return initial state to be undefined", () => {
    expect(
        reducer(undefined, {
            type: undefined,
        })
    ).toEqual(initialState);
});

describe("Test Favourites", () => {
    beforeAll(() => { });

    it("Should be able to create a new spell to favourites", async () => {
        // Saving previous state
        const spell: SpellInfo = {
            index: "acid-arrow",
            name: "Acid Arrow",
            url: "/spells/acid-arrow",
        };

        markAsFavourite(spell);

        //   Dispatching the action

        const result = await store.dispatch(markAsFavourite(spell));
        const user = result.payload;
        expect(user).toEqual(spell);

        const state = store.getState().favouriteSpell;
        expect(state.value).toEqual([spell]);
    });

    it("Should be able to remove a spell from favourites", async () => {
        // Saving previous state
        const spell: SpellInfo = {
            index: "acid-arrow",
            name: "Acid Arrow",
            url: "/spells/acid-arrow",
        };

        //   Dispatching the action

        unmarkAsFavourite(spell);
        await store.dispatch(unmarkAsFavourite(spell));

        const state = store.getState().favouriteSpell;
        expect(state.value).toEqual([]);
    });
});
