import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { reapplyThemeVariables, useTheme } from 'src/shared/lib/shadcn/components/ThemeProvider.tsx'
const HomePage = () => {

    const { theme , setTheme } = useTheme()

    useEffect(() => {

    }, [])


    return <div className={'  text-lg font-bold'}>
        <button

            onClick={() => {
                setTheme('light')
            }

            }
        >ssssssssssssss
        </button>

        <button

            onClick={() => {
                setTheme('dark')
            }

            }
        >cccccccccccc
        </button>
        <button
            onClick={() => {
                const existing = JSON.parse(localStorage.getItem('vite-ui-theme-vars') || '{}')

                const updated = {
                    ...existing,
                    darkVars: {
                        ...(existing.darkVars || {}),
                        '--background': 'oklch(0.488 0.243 264.376)',
                        '--foreground': '#ffffff',
                    },
                }

                localStorage.setItem('vite-ui-theme-vars', JSON.stringify(updated))
                reapplyThemeVariables(theme)
            }}
        >
            Apply Dark Theme Vars
        </button>

        <button
            onClick={() => {
                const existing = JSON.parse(localStorage.getItem('vite-ui-theme-vars') || '{}')

                const updated = {
                    ...existing,
                    lightVars: {
                        ...(existing.lightVars || {}),
                        '--background': '#89ef62',
                        '--foreground': '#ffffff',
                    },
                }

                localStorage.setItem('vite-ui-theme-vars', JSON.stringify(updated))
                reapplyThemeVariables(theme)
            }}
        >
            vvvvvvvvvvcccccccccccccccccccccc
        </button>

    </div>
}

export default HomePage
