import { Switch } from 'src/shared/lib/shadcn/components/ui/switch.tsx'

import { Moon, Sun } from "lucide-react"
import { useTheme } from 'src/shared/lib/shadcn/components/ThemeProvider.tsx'


const SSdarkmodeSwitch = () => {

    const { theme, setTheme } = useTheme()


    const isDark =
        theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    const handleToggle = (checked: boolean) => {
        setTheme(checked ? "dark" : "light")
    }

    return (

            <Switch
                checked={isDark}
                onCheckedChange={handleToggle}
                buttonIcon = {
                    isDark ? (
                        <Moon className="h-4 w-4 text-yellow-400 " />
                    ) : (
                        <Sun className="h-4 w-4 text-zinc-600" />

                    )
                }
            />

    )
}

export default SSdarkmodeSwitch