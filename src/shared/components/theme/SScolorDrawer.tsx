import { Settings } from 'lucide-react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from 'src/shared/lib/shadcn/components/ui/drawer.tsx'
import { Button } from 'src/shared/lib/shadcn/components/ui/button.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/shared/lib/shadcn/components/ui/tabs'
import ColorPicker from 'src/shared/components/theme/SScolorPicker.tsx'
import { reapplyThemeVariables, saveThemeVar, useTheme, useThemeVariable } from 'src/shared/utils/themeUtils.tsx'
import SSdarkmodeSwitch from 'src/shared/components/theme/SSdarkmodeSwitch.tsx'

const SScolorDrawer = () => {

    const { theme } = useTheme()

    const resetThemeVars = () => {
        const rawVars = localStorage.getItem('vite-ui-theme-vars')
        const vars = rawVars ? JSON.parse(rawVars) : {}

        const themeKey = `${theme}Vars`

        if (vars[themeKey]) {
            delete vars[themeKey]
            localStorage.setItem('vite-ui-theme-vars', JSON.stringify(vars))
            const defaultVars = theme === 'light' ? { '--background': '#ffffff' } : { '--background': '#000000' }
            saveThemeVar(theme, '--background', defaultVars['--background'])
            reapplyThemeVariables(theme)
        }
    }

    return (
        <Drawer
            direction={'right'}
        >
            <DrawerTrigger asChild>
                <Settings
                    className="cursor-pointer w-5 h-5"
                />
            </DrawerTrigger>


            <DrawerContent
                className="flex flex-col "
            >
                <DrawerHeader

                >
                    <DrawerTitle
                        className={'border-b pb-4 flex items-center justify-between'}
                    ><p>Chose Your Own colors </p>   <SSdarkmodeSwitch/></DrawerTitle>
                    <DrawerDescription>


                    </DrawerDescription>
                </DrawerHeader>
                <Tabs defaultValue="colors" className="flex-1 px-4">
                    <TabsList>
                        <TabsTrigger value="colors">colors</TabsTrigger>
                        <TabsTrigger value="etc">etc</TabsTrigger>
                    </TabsList>
                    <TabsContent   value="colors">
                        <ColorPickers />
                    </TabsContent>
                    <TabsContent value="etc">Change your password here.</TabsContent>
                </Tabs>

                <DrawerFooter>
                    <Button
                        onClick={resetThemeVars}
                    >Reset</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default SScolorDrawer


const ColorPickers = () => {

    const { theme } = useTheme()

    const handleChange = (key: string) => (value: string) => {
        saveThemeVar(theme, key, value)
        reapplyThemeVariables(theme)
    }

    const background = useThemeVariable('--background', theme)
    const foreground = useThemeVariable('--foreground', theme)
    const card = useThemeVariable('--card', theme)
    const cardForeground = useThemeVariable('--card-foreground', theme)


    return (
        <div>

            <ColorPicker
                label="Background"
                color={background}
                onChange={handleChange('--background')}
            />
            <ColorPicker
                label="Foreground"
                color={foreground}
                onChange={handleChange('--foreground')}
            />
            <ColorPicker
                label="Card"
                color={card}
                onChange={handleChange('--card')}
            />

            <ColorPicker
                label="CardForeground"
                color={cardForeground}
                onChange={handleChange('--card-foreground')}
            />



        </div>
    )
}



