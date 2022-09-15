import { SpellInfo } from "../../types";
import { getPaginatedFavouriteSpells } from "../favouriteSpellService";

test("the data can be fetched successfully", () => {
    const spell: SpellInfo = {
        index: "acid-arrow",
        name: "Acid Arrow",
        url: "/spells/acid-arrow",
    };

    let spellArray: SpellInfo[] = [];

    spellArray.push(spell);

    expect(getPaginatedFavouriteSpells(spellArray, 0)).toStrictEqual(
        new Promise((resolve) => {
            return;
        })
    );
});
