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
  ): Promise<[string | null, null | string]> => {
    const [data, error] = await authenticateUser(email, password);
    if (data && data.token) {
      const jwt = data.token;
      localStorage.setItem("secret", jwt);
      set(secretAtom, jwt);
      return [jwt, null];
    } else {
      localStorage.removeItem("secret");
      set(secretAtom, null);
      set(authenticateErrorAtom, error);
      return [null, error];
    }
  }
);

export const removeSecretAtom = atom(null, (get, set):boolean => {
  set(secretAtom, null);
  return true
});

// ตรง get) => get(secretAtom) ถ้ามีจะมีผลในการรีเรนเดอร์ใหม่ของ component ที่ใช้งาน authenticateAtom เมื่อ secretAtom มีการเปลี่ยนแปลง
