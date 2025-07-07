import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Label } from 'src/shared/lib/shadcn/components/ui/label.tsx'
import { debounce } from 'src/shared/utils/debounce.tsx'
import { hexToOklch, oklchToHex } from 'src/shared/utils/colorUtils.tsx'
import { useDispatch } from 'react-redux'
import { themeAction } from 'src/shared/components/theme/themeReducer.tsx'

type ColorPickerProps = {
    variableKey: string
    color: string
    onChange: (color: string) => void
    label: string
}

const ColorPicker = ({ variableKey , color, onChange, label }: ColorPickerProps) => {

    const [localColor, setLocalColor] = useState(color)

    useEffect(() => {
        setLocalColor(hexToOklch(color))
    }, [color])

    const dispatch = useDispatch()

    const debouncedDispatch = useMemo(
        () => debounce((key: string, value: string) => {
            dispatch(themeAction.setColor({ key, value }))
            onChange?.(value)
        }, 30),
        [dispatch, onChange]
    )

    const displayHexColor = useMemo(() => {
        if (localColor?.startsWith('#')) return localColor
        return oklchToHex(localColor)
    }, [localColor])

    const debouncedOnChange = useMemo(
        () => debounce((value: string) => onChange(value), 30),
        [onChange],
    )

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newColor = hexToOklch(e.target.value)
        setLocalColor(newColor)
        debouncedDispatch(variableKey,newColor)
    }

    useEffect(() => {
        return () => {
            debouncedOnChange.cancel()
        }
    }, [debouncedOnChange])

    return (
        <div className="mb-3">
            <div className="mb-1.5 flex items-center justify-between">
                <Label
                    htmlFor={`color-${label.replace(/\s+/g, '-').toLowerCase()}`}
                    className="text-xs font-medium"
                >
                    {label}
                </Label>
            </div>
            <div className="flex items-center gap-1">
                <div
                    className="relative flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded border"
                    style={{ backgroundColor: localColor }}
                >
                    <input
                        type="color"
                        id={`color-${label.replace(/\s+/g, '-').toLowerCase()}`}
                        value={displayHexColor}
                        onChange={handleColorChange}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                </div>
                <Label
                    className={'bg-input/25 border-border/20 h-8 flex-1 rounded border px-2 text-sm'}
                >{localColor}</Label>

            </div>
        </div>
    )
}

export default ColorPicker
