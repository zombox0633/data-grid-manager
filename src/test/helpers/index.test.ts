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

// describe("copyToClipboard function", () => {
//   let originalNavigator: typeof navigator;
//   let calledWith: string | null;

//   //beforeAll เกิดขึ้นเพียงครั้งเดียว ก่อนการทดสอบทั้งหมดใน describe
//   beforeAll(() => {
//     originalNavigator = global.navigator = {
//       clipboard: {
//         writeText(data: string) {
//           calledWith = data;
//         },
//       },
//     } as Navigator;
//   });

//   //ถูกเรียกก่อนทุกครั้งที่เริ่มการทดสอบ (it หรือ test block) ภายใน describe
//   beforeEach(() => {
//     calledWith = null;
//   });

//   //ถูกเรียกหลังทุกครั้งที่การทดสอบ (it หรือ test block) ภายใน describe block ที่เกี่ยวข้องเสร็จสิ้น
//   afterAll(() => {
//     global.navigator = originalNavigator as Navigator;
//   });

//   it("copies the provided text to the clipboard", () => {
//     const sampleText = "Hello, World!";
//     copyToClipboard(sampleText);

//     expect(calledWith).toEqual(sampleText);
//   });
// });

//global คือ object ที่อยู่ในระดับบนสุดใน Node.js และคล้ายคลึงกับ object window ในเบราว์เซอร์. ใน context ของ Node.js, global ใช้เพื่อเข้าถึงตัวแปรและฟังก์ชันที่อยู่ในระดับ global.
