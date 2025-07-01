import { formatHex, parse } from 'culori'

// oklch To Hex
export const oklchToHex = (colorStr: string): string => {
    const parsed = parse(colorStr)
    if (!parsed) return '#000000'
    return formatHex(parsed)
}
