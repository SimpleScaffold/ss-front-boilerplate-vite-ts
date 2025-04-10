import React, {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react"

// 기존 코드 맨 위에 추가
function getCustomVarsFromLocalStorage() {
    try {
        const item = localStorage.getItem("vite-ui-theme-vars")
        if (!item) return {}

        const parsed = JSON.parse(item)
        return {
            lightVars: parsed.lightVars ?? {},
            darkVars: parsed.darkVars ?? {},
        }
    } catch (error) {
        console.warn("Invalid vite-ui-theme-vars format in localStorage")
        return {}
    }
}

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

const lightVars = {
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.145 0 0)",
    "--primary": "oklch(0.205 0 0)",
}

const darkVars = {
    "--background": "oklch(0.591 0.239 28.937)",
    "--primary": "oklch(0.922 0 0)",
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

    // 🧠 테마에 맞는 CSS 변수 적용 함수
    const applyThemeVariables = (theme: "light" | "dark") => {
        const root = document.documentElement
        const { lightVars, darkVars } = getCustomVarsFromLocalStorage()
        const vars = theme === "dark" ? darkVars : lightVars

        // 로컬스토리지에 정의된 변수만 덮어씌움
        if (vars && typeof vars === "object") {
            Object.entries(vars).forEach(([key, value]) => {
                root.style.setProperty(key, value)
            })
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

    // 💬 시스템 테마 변경 감지
    useEffect(() => {
        if (theme !== "system") return

        const media = window.matchMedia("(prefers-color-scheme: dark)")
        const listener = () => {
            const newTheme = media.matches ? "dark" : "light"
            document.documentElement.classList.remove("light", "dark")
            document.documentElement.classList.add(newTheme)
            applyThemeVariables(newTheme)
        }

        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
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

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context
}
