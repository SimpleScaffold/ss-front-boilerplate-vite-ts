import React, {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)


function getCustomVarsFromLocalStorage() {
    try {
        const item = localStorage.getItem("vite-ui-theme-vars")
        if (!item) return {}


        const parsed = JSON.parse(item) as {
            lightVars?: Record<string, string>
            darkVars?: Record<string, string>
        }

        return {
            lightVars: parsed.lightVars ?? {},
            darkVars: parsed.darkVars ?? {},
        }
    } catch (error) {
        console.warn("Invalid vite-ui-theme-vars format in localStorage")
        return {}
    }
}


export function ThemeProvider({
                                  children,
                                  defaultTheme = "system",
                                  storageKey = "vite-ui-theme",
                                  ...props
                              }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )


    const clearCustomVars = () => {
        const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
        const root = document.documentElement

        const allKeys = new Set([
            ...Object.keys(darkVars || {}),
            ...Object.keys(lightVars || {}),
        ])

        allKeys.forEach((key) => {
            root.style.removeProperty(key)
        })
    }


    // 🧠 테마에 맞는 CSS 변수 적용 함수
    const applyThemeVariables = (theme: "light" | "dark") => {
        const root = document.documentElement
        const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
        const vars = theme === "dark" ? darkVars : lightVars

        clearCustomVars()

        if (vars && typeof vars === "object") {
            Object.entries(vars).forEach(([key, value]) => {
                root.style.setProperty(key, value)
            })

            if (vars["--background"]) {
                root.style.backgroundColor = vars["--background"]
            }

        }
    }
    // 💡 실제 테마 적용 (class + css vars)
    useLayoutEffect(() => {
        const root = document.documentElement
        root.classList.remove("light", "dark")

        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            root.classList.add(isDark ? "dark" : "light")
            applyThemeVariables(isDark ? "dark" : "light")
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
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}


export const reapplyThemeVariables = (theme: Theme) => {
    const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
    const root = document.documentElement

    const allKeys = new Set([
        ...Object.keys(darkVars || {}),
        ...Object.keys(lightVars || {}),
    ])

    allKeys.forEach((key) => {
        root.style.removeProperty(key)
    })

    const vars = theme === "dark" ? darkVars : lightVars
    if (vars && typeof vars === "object") {
        Object.entries(vars).forEach(([key, value]) => {
            root.style.setProperty(key, value)
        })

        if (vars["--background"]) {
            root.style.backgroundColor = vars["--background"]
        }
    }
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context
}
