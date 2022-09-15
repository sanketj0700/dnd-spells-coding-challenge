import { SpellInfo } from "../../types";
import { paginate } from "../paginate";

test("the data can be fetched successfully", () => {
    const spell: SpellInfo = {
        index: "acid-arrow",
        name: "Acid Arrow",
        url: "/spells/acid-arrow",
    };

    let spellArray: SpellInfo[] = [];

    spellArray.push(spell);

    expect(paginate(spellArray, 1, 1)).toStrictEqual(spellArray);
});
