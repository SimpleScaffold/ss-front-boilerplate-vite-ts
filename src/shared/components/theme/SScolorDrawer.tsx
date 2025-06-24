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
import { useEffect, useLayoutEffect, useState } from 'react'
import {
    applyThemeVariables,
    getCustomVarsFromLocalStorage,
    saveThemeVar, useTheme,
} from 'src/shared/utils/themeUtils.tsx'

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
                        onClick={() => {
                            const theme = document.documentElement.classList.contains('dark')
                                ? 'dark'
                                : 'light'
                            localStorage.removeItem('vite-ui-theme-vars')
                            applyThemeVariables(theme)
                        }}
                    >   Reset
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

    useLayoutEffect(() => {
    }, []);

    const { theme } = useTheme();

    return (
        <div className="space-y-4 mt-4">


        </div>
    )
}


