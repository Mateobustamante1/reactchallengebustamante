import { Home } from "./home";
import { renderWithQueryClient } from "../../test-utils";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import { screen } from "@testing-library/react";

describe("Home", () => {
  it("should show a list of images", async () => {
    mockAllIsIntersecting(true);
    renderWithQueryClient(<Home />);
    const images = await screen.findAllByText(/author/i);
    expect(images).toHaveLength(10);
  });
});
