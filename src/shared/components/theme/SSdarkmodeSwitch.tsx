import React from 'react'
import { Switch } from 'src/shared/lib/shadcn/components/ui/switch.tsx'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'src/shared/utils/themeUtils.tsx'

const SSdarkmodeSwitch = () => {
    const { isDarkTheme, setTheme } = useTheme()

    return (
        <Switch
            checked={isDarkTheme}
            onCheckedChange={() => setTheme(isDarkTheme ? 'light' : 'dark')}
            buttonIcon={
                isDarkTheme
                    ? <Moon className="h-4 w-4 text-primary" />
                    : <Sun className="h-4 w-4 text-foreground" />
            }
        />
    )
}

export default SSdarkmodeSwitch
