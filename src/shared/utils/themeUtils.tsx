import { createContext, useContext, useEffect, useState } from 'react'
import { formatHex, parse } from 'culori'

const STORAGE_KEY = 'vite-ui-theme-vars'

type Theme = 'dark' | 'light' | 'system'

export const getCustomVarsFromLocalStorage = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const parsed = JSON.parse(raw || '{}') as Record<string, Record<string, string>>
        return {
            lightVars: parsed.lightVars ?? {},
            darkVars: parsed.darkVars ?? {},
        }
    } catch (e) {
        console.warn('Invalid vite-ui-theme-vars format in localStorage')
        return {
            lightVars: {},
            darkVars: {},
        }
    }
}

export const saveThemeVar = (theme: Theme, key: string, value: string) => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const themeKey = `${theme}Vars`

    const updated = {
        ...existing,
        [themeKey]: {
            ...(existing[themeKey] || {}),
            [key]: value,
        },
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}
export const applyThemeVariables = (theme: Theme) => {
    const root = document.documentElement
    const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
    const vars = theme === 'dark' ? darkVars : lightVars

    clearThemeVariables()

    if (vars && typeof vars === 'object') {
        Object.entries(vars).forEach(([key, value]) => {
            root.style.setProperty(key, value)
        })

        if (vars['--background']) {
            root.style.backgroundColor = vars['--background']
        }
    }
}

export const clearThemeVariables = () => {
    const root = document.documentElement
    const { lightVars, darkVars } = getCustomVarsFromLocalStorage()

    const allKeys = new Set([
        ...Object.keys(lightVars),
        ...Object.keys(darkVars),
    ])

    allKeys.forEach((key) => {
        root.style.removeProperty(key)
    })
}

export const reapplyThemeVariables = (theme: Theme) => {
    clearThemeVariables()
    applyThemeVariables(theme)
}

export const oklchToHex = (colorStr: string): string => {
    const parsed = parse(colorStr)
    if (!parsed) return '#000000'
    return formatHex(parsed)
}


export const useThemeVariable = (key: string, theme: Theme) => {
    const [value, setValue] = useState('#000000')

    useEffect(() => {
        const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
        const vars = theme === 'dark' ? darkVars : lightVars
        const localStorageValue = vars?.[key]

        if (localStorageValue) {
            setValue(localStorageValue)
        } else {
            const raw = getComputedStyle(document.documentElement).getPropertyValue(key).trim()
            const hex = oklchToHex(raw)
            setValue(hex)
        }
    }, [key, theme])

    return value
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}