import { render, screen } from "@testing-library/react";
import DefaultInput from "../../../components/input/DefaultInput";

describe("DefaultInput component", () => {
  it("renders correctly", () => {
    render(<DefaultInput />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeTruthy();
  });

  it("has default class when no addClassName is provided", () => {
    render(<DefaultInput />);

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.className).toBe("sign_in__input");
  });

  it("has custom class when addClassName is provided", () => {
    render(<DefaultInput addClassName="custom__class" />);

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.className).not.toBe("sign_in__input");
    expect(inputElement.className).toBe("custom__class");
  });
});
