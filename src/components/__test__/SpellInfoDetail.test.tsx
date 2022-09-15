import SpellDetail from "../SpellDetail";
import { render, cleanup, screen } from "@testing-library/react";

afterEach(cleanup);

it("renders spell details", async () => {
    render(<SpellDetail heading="Level" detail="2" />);

    const component = await screen.findByTestId("spellDetail");
    expect(component).toBeInTheDocument();
});
