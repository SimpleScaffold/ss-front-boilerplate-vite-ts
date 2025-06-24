// src/shared/providers/ThemeProvider.tsx
import { useState, useEffect, ReactNode, useLayoutEffect } from 'react'
import {
    applyThemeVariables,
    setDefaultThemeVars,
} from 'src/shared/utils/themeUtils'
import {
    Theme,
    ThemeContext,
    STORAGE_KEY,
} from './ThemeContext'


export const ThemeProvider = ({
                                  children,
                                  defaultTheme = 'system',
                              }: {
    children: ReactNode
    defaultTheme?: Theme
}) => {

    const [theme, setThemeState] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null
        return storedTheme ?? defaultTheme
    })

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem(STORAGE_KEY, newTheme)
        setThemeState(newTheme)
    }

    useLayoutEffect(() => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')

        const isDark =
            theme === 'dark' ||
            (theme === 'system' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)

        const mode = isDark ? 'dark' : 'light'

        root.classList.add(mode)
        applyThemeVariables(mode)
        setDefaultThemeVars(mode)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
