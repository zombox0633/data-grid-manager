### Jest

beforeEach: จะถูกเรียกขึ้นมาทุกครั้งก่อนที่จะทดสอบแต่ละครั้ง
beforeAll: ฟังก์ชันที่จะถูกเรียกขึ้นมาเพียงครั้งเดียวก่อนการทดสอบครั้งแรกใน test suite
afterEach: จะถูกเรียกขึ้นมาทุกครั้งหลังจากที่ทดสอบแต่ละครั้งเสร็จสิ้น
afterAll: ฟังก์ชันที่จะถูกเรียกขึ้นมาเพียงครั้งเดียวหลังจากการทดสอบครั้งสุดท้ายใน test suite

## Mock

let mockWriteText: jest.Mock คือ เป็น type จาก library ของ Jest ที่บ่งบอกว่าตัวแปรนี้เป็น mock function

mockWriteText = jest.fn(); คือ เป็นฟังก์ชันที่มาจาก library ของ Jest ซึ่งใช้สำหรับการสร้าง mock function (ฟังก์ชันจำลอง) ขึ้นมา
เช่น 

  1. จับการเรียกใช้งาน: เราสามารถตรวจสอบว่าฟังก์ชันนี้ถูกเรียกขึ้นมาหรือไม่ และถูกเรียกกี่ครั้ง
  2. จับ arguments: เราสามารถตรวจสอบว่าฟังก์ชันถูกเรียกด้วย arguments อะไรบ้าง
  3. จำลองการ return: เราสามารถกำหนดให้ mock function นี้ return ค่าที่เราต้องการ
  4. จำลองการ throw error: เราสามารถกำหนดให้ mock function นี้ throw error

## expect 
   เพื่อตรวจสอบผลลัพธ์, เรามักจะเรียก matchers เพื่อเปรียบเทียบผลลัพธ์นั้นกับค่าที่เราคาดหวัง

   1. toHaveBeenCalled: ใช้ตรวจสอบว่า function ถูกเรียกอย่างน้อย 1 ครั้ง และ ไม่สนใจว่า function นั้นถูกเรียกด้วย arguments อะไร

   2. toHaveBeenCalledWith: ใช้สำหรับตรวจสอบว่า mock function ถูกเรียกด้วย arguments ที่เราคาดหวัง. มันเฉพาะเจาะจงสำหรับการทำงานกับ mock functions
    เช่น const mockFunc = jest.fn();
        mockFunc('hello');
        expect(mockFunc).toHaveBeenCalledWith('hello');

   3. toBe: ใช้เปรียบเทียบ, ซึ่งหมายความว่ามันเช็คความเท่ากันแบบ strict. มักใช้สำหรับข้อมูลพื้นฐานเช่น strings, numbers, booleans
    เช่น expect(2 + 2).toBe(4);

   4. toEqual: ใช้เพื่อตรวจสอบว่า objects มีค่าและโครงสร้างเดียวกัน. มันเปรียบเทียบ properties และ values 
    เช่น const data = { one: 1, two: 2 };
        expect(data).toEqual({ one: 1, two: 2 });

   5. toBeTruthy: ตรวจสอบว่าค่าที่ระบุเป็น truthy หรือไม่. ค่า truthy คือค่าที่ไม่ใช่ falsy เมื่อค่านั้นๆ ถูกแปลงเป็น boolean จะได้ true
    เช่น expect(true).toBeTruthy();
  
   6. toBeFalsy: ตรวจสอบว่าค่าที่ระบุเป็น falsy หรือไม่. ค่า falsy ใน JavaScript คือ: false, 0, '' (string ว่าง), null, undefined, และ NaN.
    เช่น expect(0).toBeFalsy();

   7. toContain: เป็นหนึ่งใน matchers ที่มากับ Jest และใช้สำหรับการตรวจสอบว่าค่าที่เป็น array หรือ string มีค่าที่เราต้องการหาอยู่ในมันหรือไม่
   
   8. toBeGreaterThan: ตรวจสอบว่าค่าที่ระบุมากกว่าค่าที่เรากำหนดหรือไม่.
    expect(5).toBeGreaterThan(4);

    toBeGreaterThanOrEqual: ตรวจสอบว่าค่าที่ระบุมากกว่าหรือเท่ากับค่าที่เรากำหนดหรือไม่.
    expect(5).toBeGreaterThanOrEqual(5);

    toBeLessThan: ตรวจสอบว่าค่าที่ระบุน้อยกว่าค่าที่เรากำหนดหรือไม่.
    expect(5).toBeLessThan(6);

    toBeLessThanOrEqual: ตรวจสอบว่าค่าที่ระบุน้อยกว่าหรือเท่ากับค่าที่เรากำหนดหรือไม่.
    expect(5).toBeLessThanOrEqual(5);

## @testing-library/react

  1. render ใช้สำหรับการ render React component ไปยัง DOM เสมือน (virtual DOM) และ ฟังก์ชัน จะ return ชุดของ utility functions ที่ใช้ในการ query และทดสอบ component หลังจากที่ถูก render ในการทดสอบกับ @testing-library/react จะเรียกใช้ render กับ component ที่ต้องการทดสอบ
  2. screen เป็น object ที่เป็นตัว wrapper ของ queries ที่มาพร้อมกับ library, ซึ่งทำให้เราสามารถ query ไปยัง element ใน document body ได้ และ แทนที่จะต้อง destructuring queries ออกมาจาก render, screen ทำให้การเขียนการทดสอบเป็นไปอย่างกระชับและชัดเจนยิ่งขึ้น
  3. fireEvent เป็นฟังก์ชันที่ใช้สำหรับการจำลองเหตุการณ์ของ user (เช่น clicks, key presses) บน UI elements และ ใช้สำหรับการทดสอบว่า UI ตอบสนองต่อการทำงานของผู้ใช้ได้อย่างถูกต้อง

## etc 
  Object.is ใช้ในการเปรียบเทียบค่า 2 ค่าว่าเป็นค่าเดียวกันหรือไม่. มันคล้ายๆ === หรือ strict equality operator แต่มีความแตกต่างบางประการ เช่น การเปรียบเทียบ NaN กับ NaN จะให้ค่าเป็น true ใน Object.is แต่จะให้ค่าเป็น false ใน ===
  Object.is(1, 1); // true
  Object.is(NaN, NaN); // true