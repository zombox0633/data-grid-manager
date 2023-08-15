import { atom } from "jotai";

export const secretAtom = atom<string | null>(
  localStorage.getItem("secret") || null
);

export const authenticateAtom = atom(
  (get) => get(secretAtom),
  (get, set, jwt: string | null) => {
    if (jwt) {
      localStorage.setItem("secret", jwt);
    } else {
      localStorage.removeItem("secret");
    }
    set(secretAtom, jwt)
  }
);
