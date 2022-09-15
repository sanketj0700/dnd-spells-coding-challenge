import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

import { render, cleanup, screen } from "@testing-library/react";

afterEach(cleanup);

it("Renders NavBar", async () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const component = await screen.findByTestId("navbar");
  expect(component).toBeInTheDocument();
});
