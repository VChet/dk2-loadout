import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore/lite";
import md5 from "md5";

import { deserialize, serialize } from "./serializer";

import type { Roster } from "../types/Roster";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "dk2-loadout.firebaseapp.com",
  projectId: "dk2-loadout",
  storageBucket: "dk2-loadout.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getLinkData(id: string): Promise<string | null> {
  const docSnap = await getDoc(doc(db, "links", id));
  if (docSnap.exists()) return docSnap.data().code;
  return null;
}

async function addEntry(code: string): Promise<string> {
  const hash = md5(code);
  const docSnap = await getDoc(doc(db, "links", hash));
  if (docSnap.exists()) return docSnap.id;

  await setDoc(doc(db, "links", hash), { code });
  return hash;
}

export async function getUrlParams(query: string): Promise<Roster | null> {
  const code = new URLSearchParams(query).get("code");
  const link = new URLSearchParams(query).get("link");

  if (code) return deserialize(code);
  if (link) {
    const code = await getLinkData(link);
    return code ? deserialize(code) : null;
  }
}

export async function createShortLink(payload: Roster): Promise<{
  code: string;
  shortLink: string | null;
}> {
  const code = serialize(payload);
  return { code, shortLink: await addEntry(code) };
}
