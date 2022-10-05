import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore/lite";
import md5 from "md5";
import type { FirebaseOptions } from "firebase/app";

import { deserialize, serialize } from "@/utilities/serializer";
import type { Roster } from "@/types/Roster";

const { FIREBASE_KEY, FIREBASE_SENDER_ID, FIREBASE_APP_ID } = import.meta.env;
const firebaseConfig: FirebaseOptions = {
  apiKey: FIREBASE_KEY?.toString(),
  authDomain: "dk2-loadout-51c91.firebaseapp.com",
  projectId: "dk2-loadout-51c91",
  storageBucket: "dk2-loadout-51c91.appspot.com",
  messagingSenderId: FIREBASE_SENDER_ID?.toString(),
  appId: FIREBASE_APP_ID?.toString(),
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
  const urlCode = new URLSearchParams(query).get("code");
  if (urlCode) return deserialize(urlCode);

  const urlLink = new URLSearchParams(query).get("link");
  if (!urlLink) return null;
  const code = await getLinkData(urlLink);
  return code ? deserialize(code) : null;
}

export async function createShortLink(payload: Roster): Promise<{
  code: string;
  shortLink: string | null;
}> {
  const code = serialize(payload);
  return { code, shortLink: await addEntry(code) };
}
