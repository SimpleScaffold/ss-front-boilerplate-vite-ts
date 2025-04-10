import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { reapplyThemeVariables, useTheme } from 'src/shared/lib/shadcn/components/ThemeProvider.tsx'

const HomePage = () => {

    const { theme  } = useTheme()


    return <div className={'  text-lg font-bold'}>
        <button

            onClick={() => {
                localStorage.setItem(
                    'vite-ui-theme-vars',
                    JSON.stringify({
                        darkVars: {
                            '--background': '#dc0443',
                            '--foreground': '#ffffff',
                        },
                    }),
                )

                // 테마 상태는 유지하면서 변수만 부드럽게 다시 적용!
                reapplyThemeVariables(theme)

            }

        }
        >asdadsasd
        </button>

    </div>
}

export default HomePage
