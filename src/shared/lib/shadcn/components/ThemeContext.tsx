// src/shared/providers/ThemeContext.ts
import { createContext } from 'react'

export type Theme = 'dark' | 'light' | 'system'

export const STORAGE_KEY = 'vite-ui-theme'

export type ThemeContextType = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export const initialState: ThemeContextType = {
    theme: 'system',
    setTheme: () => null,
}

export const ThemeContext = createContext<ThemeContextType>(initialState)

