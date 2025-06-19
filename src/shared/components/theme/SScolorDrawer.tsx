import { Settings } from 'lucide-react'
import {
    Drawer,
    DrawerTrigger,
    DrawerFooter,
    DrawerHeader,
    DrawerDescription,
    DrawerTitle,
    DrawerClose,
    DrawerContent,
} from 'src/shared/lib/shadcn/components/ui/drawer.tsx'
import { Button } from 'src/shared/lib/shadcn/components/ui/button.tsx'
import { ScrollArea } from 'src/shared/lib/shadcn/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/shared/lib/shadcn/components/ui/tabs'
import ColorPicker from 'src/shared/components/theme/SScolorPicker.tsx'
import { reapplyThemeVariables, saveThemeVar, useTheme, useThemeVariable } from 'src/shared/utils/themeUtils.tsx'
import SSdarkmodeSwitch from 'src/shared/components/theme/SSdarkmodeSwitch.tsx'


const SScolorDrawer = () => {
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
                <DrawerHeader>
                    <DrawerTitle>Chose Your Own colors</DrawerTitle>
                    <DrawerDescription
                        className={'border-b pb-4'}
                    >
                        <SSdarkmodeSwitch/>
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
                    <Button>Confilm</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
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

    return (
        <div>

            <ColorPicker
                label="Background"
                color={background}
                onChange={handleChange('--background')}
            />

        </div>
    )
}

