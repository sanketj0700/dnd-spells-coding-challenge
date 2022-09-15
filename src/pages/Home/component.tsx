import React, { useState, useEffect, useCallback } from "react";
import getPagedSpells from "../../services/paginatedSpellService";
import ListItem from "../../components/ListItem";
import PaginationB from "../../components/Pagination";
import { useSelector } from "react-redux";
import { selectFavourites } from "../../features/spell/spellSlice";
import { ListGroup, ListGroupItem } from "reactstrap";
import { SpellInfo } from "../../types";
import { SpellResponse } from "../../types";
import "./styles.css";

// Renders list of all the spells with pagination
function Home() {
    const favSpells = useSelector(selectFavourites);

    const [spells, setSpells] = useState<SpellInfo[] | null>(null);
    const [totalpages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const pageChangeHandler = (page: number) => {
        setSpells(null);
        setPage(page);
    };

    const loadSpells = useCallback(
        () =>
            getPagedSpells(page).then((response: SpellResponse) => {
                setSpells(response.results);
                setTotalPages(response.totalPages);
            }),
        [page]
    );

    useEffect(() => {
        loadSpells();
    }, [page, loadSpells]);

    return (
        <div className="Home">
            <div className="home-header-container">
                <h1 className="home-header">All Spells</h1>
            </div>
            <div className="spell-list">
                {
                    spells == null ?
                        <div>
                            <iframe title="loader" src="https://giphy.com/embed/y1ZBcOGOOtlpC" width="100%" height="100%" frameBorder="0" id="loader-gif" data-testid="loader-gif" allowFullScreen></iframe>
                        </div>
                        :
                        spells.length === 0 ?
                            <div className="spell-not-found">
                                No Spell found as favourite.
                            </div>
                            :
                            <ListGroup>
                                {spells.map((item) => {
                                    return (
                                        <ListGroupItem key={item.index}>
                                            <ListItem
                                                key={item.index}
                                                spell={item}
                                                isFavourite={
                                                    favSpells.findIndex(
                                                        (it: { index: string }) =>
                                                            it.index === item.index
                                                    ) >= 0
                                                }
                                            />
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>}
                <PaginationB
                    totalPages={totalpages}
                    page={page}
                    onPageChange={pageChangeHandler}
                />
            </div>
        </div>
    );
}

export default Home;