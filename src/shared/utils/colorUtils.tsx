import { formatHex, parse, oklch } from 'culori'




// oklch To Hex
export const oklchToHex = (colorStr: string): string => {
    const parsed = parse(colorStr);
    if (!parsed) {
        console.warn(`[Color Conversion] Failed to parse Oklch string: ${colorStr}. Returning #000000.`);
        return '#000000'; // 파싱 실패 시 기본값 반환
    }
    return formatHex(parsed);
};


// Hex To oklch
export const hexToOklch = (colorStr: string): string => {
    const parsed = parse(colorStr);
    if (!parsed) {
        console.warn(`[Color Conversion] Failed to parse Hex string: ${colorStr}. Returning 'oklch(0% 0 0)'.`);
        return 'oklch(0% 0 0)'; // 파싱 실패 시 기본값 반환
    }
    const oklchColor = oklch(parsed);
    if (oklchColor && typeof oklchColor.h === 'number') {
        // L 값은 보통 0~1 사이의 값이므로 퍼센트로 변환합니다. (CSS oklch 함수 표기법)
        const l = (oklchColor.l * 100).toFixed(2); // 소수점 두 자리까지
        const c = oklchColor.c.toFixed(4); // 채도는 0~약 0.4이므로 소수점 넷째 자리까지
        const h = oklchColor.h?.toFixed(2) || '0'; // 색조는 0~360 이고, undefined일 경우 0으로 처리 (회색일 경우 h값이 없을 수 있음)
        return `oklch(${l}% ${c} ${h})`;
    } else {
        console.warn(`[Color Conversion] Failed to convert to Oklch object: ${colorStr}. Returning 'oklch(0% 0 0)'.`);
        return 'oklch(0% 0 0)';
    }
};