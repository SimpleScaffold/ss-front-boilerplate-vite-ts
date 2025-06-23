import React, { useEffect, useLayoutEffect, useState } from 'react'
import { applyThemeVariables, saveThemeVar, ThemeProviderContext } from 'src/shared/utils/themeUtils.tsx'

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

        const rawVars = localStorage.getItem('vite-ui-theme-vars');
        const vars = rawVars ? JSON.parse(rawVars) : {};
        if (!vars.lightVars || Object.keys(vars.lightVars).length === 0) {
            const defaultLightVars = { '--background': '#ffffff' };
            saveThemeVar('light', '--background', defaultLightVars['--background']);
        }
        if (!vars.darkVars || Object.keys(vars.darkVars).length === 0) {
            const defaultDarkVars = { '--background': '#000000' };
            saveThemeVar('dark', '--background', defaultDarkVars['--background']);
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
