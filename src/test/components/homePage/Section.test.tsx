import { render, screen, fireEvent } from "@testing-library/react";
import Section from "../../../components/homePage/Section";

describe("Section component", () => {
  it("renders the image with the correct src and alt", () => {
    const mockOnImgLoaded = jest.fn();
    render(
      <Section
        SectionId="test-id"
        srcImg="test-src.jpg"
        altImg="Test Image"
        onImgLoaded={mockOnImgLoaded}
      >
        Test content
      </Section>
    );

    const imgElement = screen.getByAltText("Test Image") as HTMLImageElement;
    expect(imgElement.src).toContain("test-src.jpg");
  });

  it("calls onImgLoaded when the image is loaded", () => {
    const mockOnImgLoaded = jest.fn();
    render(
      <Section
        SectionId="test-id"
        srcImg="test-src.jpg"
        altImg="Test Image"
        onImgLoaded={mockOnImgLoaded}
      >
        Test content
      </Section>
    );

    const imgElement = screen.getByAltText("Test Image");
    fireEvent.load(imgElement);
    expect(mockOnImgLoaded).toHaveBeenCalled();
  });

  it("renders the children content correctly", () => {
    const mockOnImgLoaded = jest.fn();
    render(
      <Section
        SectionId="test-id"
        srcImg="test-src.jpg"
        altImg="Test Image"
        onImgLoaded={mockOnImgLoaded}
      >
        Test content
      </Section>
    );

    expect(screen.getByText("Test content")).toBeTruthy();
  });
});
