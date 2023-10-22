import { render, screen } from "@testing-library/react";
import DefaultButton from "../../../components/button/DefaultButton";

describe("DefaultButton component", () => {
  it("renders the button with default class if no addClassName is provided", () => {
    render(<DefaultButton>Click Me</DefaultButton>);
    const buttonElement = screen.getByText("Click Me");

    expect(buttonElement.className).toBe("primary__button");
  });

  it("renders the button with the provided addClassName", () => {
    render(
      <DefaultButton addClassName="custom__class">Click Me</DefaultButton>
    );
    const buttonElement = screen.getByText("Click Me");

    expect(buttonElement.className).toBe("custom__class");
    expect(buttonElement.className).not.toBe("primary__button");
  });

  it("", () => {
    render(<DefaultButton disabled={true}>Click Me</DefaultButton>);
    const buttonElement = screen.getByText("Click Me") as HTMLButtonElement;

    expect(buttonElement.disabled).toBe(true);
  });
});
