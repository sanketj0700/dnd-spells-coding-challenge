import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import Home from "../Home";

afterEach(cleanup);

it("renders loading spell page", async () => {
    render(
        <Provider store={store}>
            <Home />
        </Provider>
    );

    const loading = await screen.findByTestId("loader-gif");
    expect(loading).toBeInTheDocument();
});
