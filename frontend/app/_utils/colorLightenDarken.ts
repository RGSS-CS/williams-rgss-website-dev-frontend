export default function darkenHex(hex: string, percent: number): string {
  hex = hex.replace(/^#/, "");

  // Expand shorthand hex (#abc -> #aabbcc)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length !== 6) {
    throw new Error("Invalid hex color");
  }

  const factor = 1 - percent / 100;

  const r = Math.max(
    0,
    Math.min(255, Math.round(parseInt(hex.substring(0, 2), 16) * factor))
  );

  const g = Math.max(
    0,
    Math.min(255, Math.round(parseInt(hex.substring(2, 4), 16) * factor))
  );

  const b = Math.max(
    0,
    Math.min(255, Math.round(parseInt(hex.substring(4, 6), 16) * factor))
  );

  return `#${[r, g, b]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
}