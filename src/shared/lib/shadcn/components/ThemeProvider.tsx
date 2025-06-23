import React, { useLayoutEffect, useState } from "react"
import { applyThemeVariables, ThemeProviderContext } from 'src/shared/utils/themeUtils.tsx'

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

export function ThemeProvider({
                                  children,
                                  defaultTheme = "system",
                                  storageKey = "vite-ui-theme",
                              }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    useLayoutEffect(() => {
        const root = document.documentElement
        root.classList.remove("light", "dark")

        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            root.classList.add(isDark ? "dark" : "light")
            applyThemeVariables(isDark ? 'dark' : 'light')
        } else {
            root.classList.add(theme)
            applyThemeVariables(theme)
        }
    }, [theme])

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme)
            setTheme(newTheme)
        },
    }

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}
