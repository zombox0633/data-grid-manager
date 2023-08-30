import { atom } from "jotai";

import authenticateUser from "api/authentication/authentication";

export const secretAtom = atom<string | null>(
  localStorage.getItem("secret") || null
);

export const authenticateErrorAtom = atom<string | null>(null);

export const authenticateAtom = atom(
  (get) => get(secretAtom),
  async (
    get,
    set,
    { email, password }: { email: string; password: string }
  ): Promise<boolean> => {
    const [data, error] = await authenticateUser(email, password);
    if (data && data?.token) {
      set(secretAtom, data.token);
      localStorage.setItem("secret", data.token);
      return true;
    } else {
      set(authenticateErrorAtom, error);
      return false;
    }
  }
);

export const removeSecretAtom = atom(null, (get, set): boolean => {
  set(secretAtom, null);
  localStorage.removeItem("secret");
  return true;
});

// ตรง get) => get(secretAtom) ถ้ามีจะมีผลในการรีเรนเดอร์ใหม่ของ component ที่ใช้งาน authenticateAtom เมื่อ secretAtom มีการเปลี่ยนแปลง
