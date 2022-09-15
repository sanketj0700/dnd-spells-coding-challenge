import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import Favourites from "../Favourites";

afterEach(cleanup);

it("renders spell not found page", async () => {
    render(
        <Provider store={store}>
            <Favourites />
        </Provider>
    );

    const element = await screen.findByTestId("spell-not-found");

    expect(element).toBeInTheDocument();
});
