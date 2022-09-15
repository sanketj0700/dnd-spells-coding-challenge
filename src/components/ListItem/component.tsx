import { Link } from "react-router-dom";
import { Star, StarFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import {
    markAsFavourite,
    unmarkAsFavourite,
} from "../../features/spell/spellSlice";
import { SpellInfo } from "../../types";

import "./styles.css";
import logger from "../../services/logger";

type SpellListItemProp = {
    spell: SpellInfo;
    isFavourite: boolean;
    updateSpells?: () => void;
};

// Renders each item spell name with link to detail inside spell lists
function ListItem(props: SpellListItemProp) {
    try {
        const dispatch = useDispatch();
        let spell = props.spell;
        let isFavourite = props.isFavourite;

        const bookMarkHandler = () => {
            if (isFavourite) {
                dispatch(unmarkAsFavourite(spell.index));
            } else {
                dispatch(markAsFavourite(spell));
                if (props.updateSpells) {
                    props.updateSpells();
                }
            }
        };

        return (
            <div className="spell-li">
                <Link className="spell-name" to={"/spell/" + spell.index}>
                    {spell.name}
                </Link>
                {isFavourite ? (
                    <StarFill
                        className="fav-icon"
                        color="gold"
                        onClick={bookMarkHandler}
                    />
                ) : (
                    <Star
                        className="fav-icon"
                        color="gray"
                        onClick={bookMarkHandler}
                    />
                )}
            </div>
        );
    } catch (error) {
        logger(2, "ListItem", error);
        return <></>
    }
}

export default ListItem;