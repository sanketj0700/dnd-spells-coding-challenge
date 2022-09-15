import React, { useState, useEffect, useCallback } from "react";
import { getPaginatedFavouriteSpells } from "../../services/favouriteSpellService";
import ListItem from "../../components/ListItem";
import PaginationB from "../../components/Pagination";
import { useSelector } from "react-redux";
import { selectFavourites } from "../../features/spell/spellSlice";
import { ListGroup, ListGroupItem } from "reactstrap";
import { SpellInfo } from "../../types";
import { SpellResponse } from "../../types";

import "./styles.css";

// Renders list of all the favourite spells with pagination
function Favourites() {
    let favSpells = useSelector(selectFavourites);

    const [spells, setSpells] = useState<SpellInfo[]>([] as SpellInfo[]);
    const [totalpages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const pageChangeHandler = (page: number) => {
        setPage(page);
    };
    const updateListHandler = () => {
        setPage(1);
    };

    const loadFavSpells = useCallback(
        () =>
            getPaginatedFavouriteSpells(favSpells, page).then(
                (response: SpellResponse) => {
                    setSpells(response.results);
                    setTotalPages(response.totalPages);
                }
            ),
        [page, favSpells]
    );

    useEffect(() => {
        loadFavSpells();
    }, [page, favSpells, loadFavSpells]);

    if (spells.length === 0) {
        return (
            <div className="main pb-5">
                <div className="fav-header-container">
                    <h1 className="fav-header">Favourite Spells</h1>
                </div>
                <div className="spell-list">
                    <div
                        data-testid="spell-not-found"
                        className="spell-not-found font-weight-normal text-muted"
                    >
                        No Spell found as favourite.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main pb-5">
            <div className="fav-header-container">
                <h1 className="fav-header">Favourite Spells</h1>
            </div>
            <div className="spell-list">
                <ListGroup>
                    {spells.map((item: SpellInfo) => {
                        return (
                            <ListGroupItem>
                                <ListItem
                                    key={item.index}
                                    spell={item}
                                    isFavourite={
                                        favSpells.findIndex(
                                            (it: { index: string }) =>
                                                it.index === item.index
                                        ) >= 0
                                    }
                                    updateSpells={updateListHandler}
                                />
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
                {totalpages === 1 ? null : (
                    <PaginationB
                        totalPages={totalpages}
                        page={page}
                        onPageChange={pageChangeHandler}
                    />
                )}
            </div>
        </div>
    );
}

export default Favourites;