import {
  formatNumber,
  localFormattedDate,
  getCellAlignmentClass,
  copyToClipboard,
} from "../../helpers/index";

describe("formatNumber function", () => {
  it("formats numbers according to the current locale", () => {
    const number = 1234567.89;
    const expected = new Intl.NumberFormat().format(number);
    expect(formatNumber(number)).toBe(expected);
  });
});

describe("localFormattedDate", () => {
  it("formats date according to the current locale", () => {
    const timestamp = new Date("2023-09-12T14:07:46.000Z");
    const expected = timestamp.toLocaleString();

    expect(localFormattedDate(timestamp)).toBe(expected);
  });
});

describe("getCellAlignmentClass", () => {
  it('returns "text-right" for "price" and "quantity"', () => {
    expect(getCellAlignmentClass("price")).toBe("text-right");
    expect(getCellAlignmentClass("quantity")).toBe("text-right");
  });

  it('returns "text-center" for "created_timestamp" and "lastupdate_timestamp"', () => {
    expect(getCellAlignmentClass("created_timestamp")).toBe("text-center");
    expect(getCellAlignmentClass("lastupdate_timestamp")).toBe("text-center");
  });

  it('returns "text-left" for other header keys', () => {
    expect(getCellAlignmentClass("name")).toBe("text-left");
    expect(getCellAlignmentClass("otherHeader")).toBe("text-left");
  });
});

describe("copyToClipboard", () => {
  let mockWriteText: jest.Mock;

  beforeEach(() => {
    mockWriteText = jest.fn();
    Object.defineProperty(global.navigator, "clipboard", {
      value: {
        writeText: mockWriteText,
      },
      writable: true //writable ใน Object.defineProperty บ่งบอกว่า property นั้นสามารถเปลี่ยนแปลงค่าได้หรือไม่
    });
  });

  afterEach(() => {
    Object.defineProperty(global.navigator, "clipboard", {
      value: undefined,
    })
  });

  it("should call navigator.clipboard.writeText with the provided text", () => {
    const testText = "Hello World"
    copyToClipboard(testText)

    expect(mockWriteText).toHaveBeenCalledWith(testText)
  });

  it("should not call navigator.clipboard.writeText if navigator.clipboard is undefined", () => {
    Object.defineProperty(global.navigator, "clipboard", {
      value: undefined,
    })

    copyToClipboard("Hello World")
    
    expect(mockWriteText).not.toHaveBeenCalledWith()
  });
});

//Object.defineProperty กำหนดหรือแก้ไข properties ของอ็อบเจกต์ด้วยการกำหนดคุณสมบัติ
//global คือ object ที่อยู่ในระดับบนสุดใน Node.js และคล้ายคลึงกับ object window ในเบราว์เซอร์. ใน context ของ Node.js, global ใช้เพื่อเข้าถึงตัวแปรและฟังก์ชันที่อยู่ในระดับ global.
//navigator จะไม่มีอยู่ใน global scope แต่ในกรณีของ Jest, มันจำลองบางส่วนของ browser environment ด้วยการใช้ jsdom. เพื่อให้เราสามารถทำการทดสอบโค้ดที่เขียนสำหรับ browser ได้ใน environment ของ Node.js.
