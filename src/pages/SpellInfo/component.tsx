import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import getSpellDetails from "../../services/spellDetailService";
import { Button } from "reactstrap";
import { SpellDetailState } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { selectFavourites } from "../../features/spell/spellSlice";

import {
    markAsFavourite,
    unmarkAsFavourite,
} from "../../features/spell/spellSlice";

import "./styles.css";
import SpellDetail from "../../components/SpellDetail";


const reqDetails = [
    "level",
    "components",
    "duration",
    "range",
    "attack_type",
];

// Renders all the information related to clicked spell
function SpellInfo() {
    let { index } = useParams();

    const [spellDetails, setSpellDetails] = useState<SpellDetailState | null>(
        {} as SpellDetailState
    );

    const favSpells = useSelector(selectFavourites);
    const dispatch = useDispatch();

    let isFavourite = () => {
        if (spellDetails)
            return (
                favSpells.findIndex(
                    (it: { index: string }) => it.index === spellDetails.index
                ) >= 0
            );
        else return false;
    };

    const bookMarkHandler = () => {
        if (isFavourite() && spellDetails) {
            dispatch(unmarkAsFavourite(spellDetails.index));
        } else {
            if (spellDetails) dispatch(markAsFavourite(spellDetails));
        }
    };

    const loadSpellInfo = useCallback(
        () =>
            getSpellDetails(index).then((response) => {
                response.error ? setSpellDetails(null) : setSpellDetails(response);
            }),
        [index]
    );

    useEffect(() => {
        loadSpellInfo();
    }, [index, loadSpellInfo]);

    return (
        <div className="main">
            <div className="spell-detail m-auto" data-testid="spell-info">
                {
                    !spellDetails ?
                        <div
                            data-testid="spell-detail-not-found"
                            className="spell-detail-not-found"
                        >
                            Spell Not Found!
                        </div>
                        :
                        spellDetails.name ?
                            <div>
                                <div className="spell-heading d-flex flex-column flex-md-row align-items-center justify-content-evenly">
                                    <div className="spell-header display-1 p-3 d-flex ">
                                        {spellDetails.name}
                                    </div>
                                    <div className="add-to-fav">
                                        {isFavourite() ? (
                                            <Button
                                                style={{ width: "200px", backgroundColor: "#D81921", fontWeight: 600, border: "none", color: "white" }}
                                                onClick={bookMarkHandler}
                                            >
                                                Remove from Favourites
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{ width: "200px", backgroundColor: "rgb(235, 212, 81)", fontWeight: 600, border: "none", color: "white" }}
                                                onClick={bookMarkHandler}
                                            >
                                                Mark as Favourite
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <hr />
                                <div className="spell-details">
                                    {Object.entries(spellDetails).map((key) =>
                                        reqDetails.includes(key[0].toString()) ? (
                                            <div key={key[0].toString()}>
                                                <SpellDetail
                                                    heading={
                                                        key[0].toString().charAt(0).toUpperCase() +
                                                        key[0]
                                                            .toString()
                                                            .slice(1)
                                                            .replaceAll("_", " ")
                                                    }
                                                    detail={key[1].toString()}
                                                />
                                            </div>
                                        ) : null
                                    )}

                                    {spellDetails?.damage?.damage_type.name !== undefined ? (
                                        <SpellDetail
                                            heading="Damage"
                                            detail={spellDetails?.damage?.damage_type.name}
                                        />
                                    ) : null}
                                </div>
                                <hr></hr>
                                <div
                                    data-testid="spell-detail-container"
                                    className="row spell-detail-description"
                                >
                                    <div className="">
                                        <p>{spellDetails.desc}</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <iframe title="loader" src="https://giphy.com/embed/y1ZBcOGOOtlpC" width="100%" height="100%" frameBorder="0" id="loader-gif" data-testid="loader-gif" allowFullScreen></iframe>
                            </div>
                }
            </div>
        </div>
    );
}

export default SpellInfo;