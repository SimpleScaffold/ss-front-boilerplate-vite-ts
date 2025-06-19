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

// 초기 상태
const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// 로컬스토리지에서 커스텀 변수 가져오기
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

// 커스텀 변수 저장 함수
export const saveThemeVar = (theme: "light" | "dark", key: string, value: string) => {
    const existing = JSON.parse(localStorage.getItem("vite-ui-theme-vars") || "{}")
    const themeKey = `${theme}Vars`

    const updated = {
        ...existing,
        [themeKey]: {
            ...(existing[themeKey] || {}),
            [key]: value,
        },
    }

    localStorage.setItem("vite-ui-theme-vars", JSON.stringify(updated))
}

// 특정 테마에서 CSS 변수 가져오는 hook
export const useThemeVariable = (key: string, theme: "light" | "dark") => {
    const [value, setValue] = useState("")

    useEffect(() => {
        const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
        const vars = theme === "dark" ? darkVars : lightVars
        const val = vars?.[key] ?? ""
        setValue(val)
    }, [key, theme])

    return value
}

// CSS 변수 제거
const clearCustomVars = () => {
    const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
    const root = document.documentElement

    const allKeys = new Set([
        ...Object.keys(lightVars || {}),
        ...Object.keys(darkVars || {}),
    ])

    allKeys.forEach((key) => {
        root.style.removeProperty(key)
    })
}

// CSS 변수 적용
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

// context 기반 ThemeProvider
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
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

// theme 강제 재적용
export const reapplyThemeVariables = (theme: Theme) => {
    const root = document.documentElement
    const { lightVars, darkVars } = getCustomVarsFromLocalStorage()

    const allKeys = new Set([
        ...Object.keys(lightVars || {}),
        ...Object.keys(darkVars || {}),
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

// 테마 훅
export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context
}
