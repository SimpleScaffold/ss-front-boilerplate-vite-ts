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
import SSdarkmodeSwitch from 'src/shared/components/theme/SSdarkmodeSwitch.tsx'
import ColorPicker from 'src/shared/components/theme/SScolorPicker.tsx'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import {
    applyThemeVariables,
    getCustomVarsFromLocalStorage, handleReset,
    saveThemeVar, setDefaultThemeVars, useTheme,
} from 'src/shared/utils/themeUtils.tsx'
import { oklchToHex } from 'src/shared/utils/color.tsx'

const SScolorDrawer = () => {

    const { theme } = useTheme()


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
                    ><p>Chose Your Own colors </p>   <SSdarkmodeSwitch /></DrawerTitle>
                    <DrawerDescription>


                    </DrawerDescription>
                </DrawerHeader>
                <Tabs defaultValue="colors" className="flex-1 px-4">
                    <TabsList>
                        <TabsTrigger value="colors">colors</TabsTrigger>
                        <TabsTrigger value="etc">etc</TabsTrigger>
                    </TabsList>
                    <TabsContent value="colors">
                        <ColorPickers />
                    </TabsContent>
                    <TabsContent value="etc">Change your password here.</TabsContent>
                </Tabs>

                <DrawerFooter>
                    <Button
                        onClick={() => handleReset(theme)}
                    > Reset
                    </Button>
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

    const vars = useMemo(
        () => getCustomVarsFromLocalStorage()[`${theme}Vars`] || {},
        [theme],
    )

    const getColor = useCallback(
        (key: string) =>
            vars[key] ||
            oklchToHex(getComputedStyle(document.documentElement).getPropertyValue(key)),
        [vars],
    )


    const [background, setBackground] = useState(getColor('--background'))
    const [foreground, setForeground] = useState(getColor('--foreground'))


    // 최초 마운트 시 한 번만 실행
    useEffect(() => {
        setDefaultThemeVars(theme)
        applyThemeVariables(theme)
        setBackground(getColor('--background'))
        setForeground(getColor('--foreground'))
    }, [theme, getColor])



    const handleColorChange = (key: string) => (color: string) => {
        saveThemeVar(theme, key, color);
        applyThemeVariables(theme);
    };


    return (
        <div className="space-y-4 mt-4">
            <ColorPicker
                color={background}
                label="Background Color"
                onChange={handleColorChange('--background')}
            />
            <ColorPicker
                color={foreground}
                label="Foreground Color"
                onChange={handleColorChange('--foreground')}
            />
        </div>
    )
}

