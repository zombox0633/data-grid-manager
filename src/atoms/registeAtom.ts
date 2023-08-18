import { atom } from "jotai";

import { RegisterType } from "api/user/register.type";

export const registerAtom = atom<RegisterType | null>(null);