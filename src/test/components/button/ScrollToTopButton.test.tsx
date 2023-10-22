import { render, screen } from "@testing-library/react";
import ScrollToTopButton from "../../../components/button/ScrollToTopButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: jest.fn().mockReturnValue(<span>Mock Icon</span>),
}));

describe("ScrollToTopButton component", () => {
  beforeEach(() => {
    render(<ScrollToTopButton />);
  });

  it("renders the button correctly", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeTruthy();
  });

  it("displays the arrow up icon", () => {
    expect(FontAwesomeIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: faArrowUp,
        color: "white",
      }),
      {}
    );

    const iconElement = screen.getByText("Mock Icon");
    expect(iconElement).toBeTruthy();
  });
});
