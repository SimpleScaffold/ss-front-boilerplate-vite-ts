import { useEffect, useState } from 'react'

const STORAGE_KEY = 'vite-ui-theme-vars'

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

export const saveThemeVar = (theme: 'light' | 'dark', key: string, value: string) => {
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

export const applyThemeVariables = (theme: 'light' | 'dark') => {
    const root = document.documentElement
    const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
    const vars = theme === 'dark' ? darkVars : lightVars

    clearThemeVariables()

    for (const [key, value] of Object.entries(vars)) {
        root.style.setProperty(key, value)
    }

    if (vars['--background']) {
        root.style.backgroundColor = vars['--background']
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

export const reapplyThemeVariables = (theme: 'light' | 'dark') => {
    clearThemeVariables()
    applyThemeVariables(theme)
}


export const useThemeVariable = (key: string, theme: 'light' | 'dark') => {
    const [value, setValue] = useState('')

    useEffect(() => {
        const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
        const vars = theme === 'dark' ? darkVars : lightVars
        setValue(vars?.[key] ?? '')
    }, [key, theme])

    return value
}


