import { compressToBase64, decompressFromBase64 } from "lz-string";

export function serialize(payload: any) {
  return compressToBase64(JSON.stringify(payload));
}

export function deserialize(payload: string) {
  const string = decompressFromBase64(payload);
  return string ? JSON.parse(string) : null;
}
