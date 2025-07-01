import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Label } from 'src/shared/lib/shadcn/components/ui/label.tsx'
import { debounce } from 'src/shared/utils/debounce.tsx'

type ColorPickerProps = {
    color: string
    onChange: (color: string) => void
    label: string
}

const ColorPicker = ({ color, onChange, label }: ColorPickerProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [localColor, setLocalColor] = useState(color)

    useEffect(() => {
        setLocalColor(color)
    }, [color])

    const debouncedOnChange = useMemo(
        () => debounce((value: string) => onChange(value), 30),
        [onChange],
    )

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value
        setLocalColor(newColor)
        debouncedOnChange(newColor)
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
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <input
                        type="color"
                        id={`color-${label.replace(/\s+/g, '-').toLowerCase()}`}
                        value={localColor}
                        onChange={handleColorChange}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                </div>
                <input
                    type="text"
                    value={localColor}
                    onChange={handleColorChange}
                    className="bg-input/25 border-border/20 h-8 flex-1 rounded border px-2 text-sm"
                />
            </div>
        </div>
    )
}

export default ColorPicker
