import { formatHex, parse, oklch, Hsl } from 'culori'
import * as culori from "culori";

// oklch To Hex
export const oklchToHex = (colorStr: string): string => {
    const parsed = parse(colorStr)
    if (parsed) {
        return formatHex(parsed)
    }
    return colorStr
}

// Hex To oklch
export const hexToOklch = (colorStr: string): string => {
    const parsed = parse(colorStr)
    if (parsed) {
        const oklchColor = oklch(parsed)
        const l = (oklchColor.l * 100).toFixed(2) // 소수점 두 자리까지
        const c = oklchColor.c.toFixed(4) // 채도는 0~약 0.4이므로 소수점 넷째 자리까지
        const h = oklchColor.h?.toFixed(2) || '0' // 색조는 0~360 이고, undefined일 경우 0으로 처리 (회색일 경우 h값이 없을 수 있음)
        return `oklch(${l}% ${c} ${h})`
    }
    return colorStr
}



type ColorFormat = "hex" | "rgb" | "hsl" | "oklch";


export const formatNumber = (num?: number) => {
    if (!num) return "0";
    return num % 1 === 0 ? num : num.toFixed(4);
};

export const formatHsl = (hsl: Hsl) => {
    return `hsl(${formatNumber(hsl.h)} ${formatNumber(hsl.s * 100)}% ${formatNumber(hsl.l * 100)}%)`;
};

export const colorFormatter = (
    colorValue: string,
    format: ColorFormat = "hsl",
    tailwindVersion: "3" | "4" = "3"
): string => {
    try {
        const color = culori.parse(colorValue);
        if (!color) throw new Error("Invalid color input");

        switch (format) {
            case "hsl": {
                const hsl = culori.converter("hsl")(color);
                if (tailwindVersion === "4") {
                    return formatHsl(hsl);
                }
                return `${formatNumber(hsl.h)} ${formatNumber(hsl.s * 100)}% ${formatNumber(hsl.l * 100)}%`;
            }
            case "rgb":
                return culori.formatRgb(color); // e.g., "rgb(64, 128, 192)"
            case "oklch": {
                const oklch = culori.converter("oklch")(color);
                return `oklch(${formatNumber(oklch.l)} ${formatNumber(oklch.c)} ${formatNumber(oklch.h)})`;
            }
            case "hex":
                return culori.formatHex(color); // e.g., "#4080c0"
            default:
                return colorValue;
        }
    } catch (error) {
        console.error(`Failed to convert color: ${colorValue}`, error);
        return colorValue;
    }
};

export const convertToHSL = (colorValue: string): string => colorFormatter(colorValue, "hsl");
