import { compressToBase64, decompressFromBase64 } from "lz-string";

export function serialize(payload: any) {
  return compressToBase64(JSON.stringify(payload));
}

export function deserialize(payload: string) {
  return JSON.parse(decompressFromBase64(payload));
}
