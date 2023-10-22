import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../../components/Footer";
import { copyToClipboard } from "../../helpers/index";

jest.mock("../../helpers/index", () => ({
  copyToClipboard: jest.fn(),
}));

describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("displays the project name", () => {
    expect(screen.getByText("Roberta Project")).toBeTruthy();
    expect(screen.getByText("Contact Channels")).toBeTruthy();
    expect(screen.getByText("© 2023 zombox0633")).toBeTruthy();
  });

  it("copies email to clipboard when Google+ icon is clicked", () => {
    const googlePlusIcon = screen.getByRole("button");
    fireEvent.click(googlePlusIcon);

    expect(copyToClipboard).toHaveBeenCalledWith("chayathorn.meesil@gmail.com");
  });
});
