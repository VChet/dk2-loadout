export function getPortraitName(filepath: string): string {
  return filepath.split("\\").pop().split("/").pop().split(".").shift();
}
