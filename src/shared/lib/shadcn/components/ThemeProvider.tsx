// src/shared/providers/ThemeProvider.tsx
import { useState, useLayoutEffect, ReactNode, useEffect } from 'react'
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
                                  defaultTheme,
                              }: {
    children: ReactNode
    defaultTheme?: Theme
}) => {
    const resolveInitialTheme = (): 'light' | 'dark' => {
        const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null

        if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme
        }

        if (defaultTheme === 'dark' || defaultTheme === 'light') {
            return defaultTheme
        }

        // defaultTheme === 'system' 인 경우 시스템 테마 감지
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const systemTheme = prefersDark ? 'dark' : 'light'
        localStorage.setItem(STORAGE_KEY, systemTheme)
        return systemTheme
    }

    const [theme, setThemeState] = useState<'light' | 'dark'>(resolveInitialTheme)

    const setTheme = (newTheme: 'light' | 'dark') => {
        localStorage.setItem(STORAGE_KEY, newTheme)
        setThemeState(newTheme)
    }



    useLayoutEffect(() => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        applyThemeVariables(theme)
        setDefaultThemeVars(theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
