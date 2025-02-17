import { isValidJSON } from "./object";
import type { Roster } from "@/classes/Roster";

const { VITE_CLOUDFLARE_WORKER_URL } = import.meta.env;

export async function getDataFromCode(query: string): Promise<unknown> {
  const code = new URLSearchParams(query).get("code");
  if (!code) { return; }
  const base64Data = await fetch(`${VITE_CLOUDFLARE_WORKER_URL}/get/${code}`).then((res) => res.text());
  const rawData = atob(base64Data);
  if (isValidJSON(rawData)) { return JSON.parse(rawData); }
}

export async function createShortLink(payload: Roster): Promise<string> {
  const encodedRoster = btoa(JSON.stringify(payload));
  const code = await fetch(VITE_CLOUDFLARE_WORKER_URL, { method: "POST", body: encodedRoster }).then((res) => res.text());
  return code;
}
