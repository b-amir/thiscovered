/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const hexToRgb = (hex: string) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
  throw new Error(hex + " is a bad Hex");
};

export function hexToRgba(hex: string): {
  red: number;
  green: number;
  blue: number;
  alpha: number;
} {
  const hexValue = hex.replace("#", "");
  const numValue = parseInt(hexValue, 16);
  const red = (numValue >> 16) & 255;
  const green = (numValue >> 8) & 255;
  const blue = numValue & 255;
  const alpha =
    hexValue.length === 8 ? parseInt(hexValue.substr(6, 2), 16) / 255 : 1;
  return { red, green, blue, alpha };
}

export function rgbaToHex(
  red: number,
  green: number,
  blue: number,
  alpha: number
): string {
  const r = red.toString(16).padStart(2, "0");
  const g = green.toString(16).padStart(2, "0");
  const b = blue.toString(16).padStart(2, "0");
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}${a}`;
}
