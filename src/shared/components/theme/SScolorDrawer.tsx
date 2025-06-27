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
    saveThemeVar, useTheme,
} from 'src/shared/utils/themeUtils.tsx'
import { oklchToHex } from 'src/shared/utils/color.tsx'
import { ScrollArea } from 'src/shared/lib/shadcn/components/ui/scroll-area.tsx'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'src/shared/lib/shadcn/components/ui/accordion.tsx'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from 'src/app/store/redux/reduxStore.tsx'

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

                    <ScrollArea
                        className={'h-[calc(100dvh-83px-36px-112px)] pr-4'}
                    >


                        <TabsContent value="colors">
                            <ColorPickers />
                        </TabsContent>
                        <TabsContent value="etc">Change your password here.</TabsContent>

                    </ScrollArea>

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


    useEffect(() => {

    }, [theme])


    const {
        colors,
    } = useSelector(
        (state: RootState) => ({
            colors: state.themeReducer.colors
        }),
        shallowEqual
    )




    const handleColorChange = (key: string) => (color: string) => {
        saveThemeVar(theme, key, color)
        applyThemeVariables(theme)
    }


    return (
        <div className="space-y-4 mt-4">
            <ColorPicker
                color={colors.background}
                label="Background Color"
                onChange={handleColorChange('--background')}
            />
            <ColorPicker color={colors.foreground} label="Foreground Color" onChange={handleColorChange('--foreground')} />
            {/*<ColorPicker color={card} label="Card Color" onChange={handleColorChange('--card')} />*/}
            {/*<ColorPicker color={cardForeground} label="Card Foreground"*/}
            {/*             onChange={handleColorChange('--card-foreground')} />*/}
            {/*<ColorPicker color={popover} label="Popover" onChange={handleColorChange('--popover')} />*/}
            {/*<ColorPicker color={popoverForeground} label="Popover Foreground"*/}
            {/*             onChange={handleColorChange('--popover-foreground')} />*/}
            {/*<ColorPicker color={primary} label="Primary" onChange={handleColorChange('--primary')} />*/}
            {/*<ColorPicker color={primaryForeground} label="Primary Foreground"*/}
            {/*             onChange={handleColorChange('--primary-foreground')} />*/}
            {/*<ColorPicker color={secondary} label="Secondary" onChange={handleColorChange('--secondary')} />*/}
            {/*<ColorPicker color={secondaryForeground} label="Secondary Foreground"*/}
            {/*             onChange={handleColorChange('--secondary-foreground')} />*/}
            {/*<ColorPicker color={muted} label="Muted" onChange={handleColorChange('--muted')} />*/}
            {/*<ColorPicker color={mutedForeground} label="Muted Foreground"*/}
            {/*             onChange={handleColorChange('--muted-foreground')} />*/}
            {/*<ColorPicker color={accent} label="Accent" onChange={handleColorChange('--accent')} />*/}
            {/*<ColorPicker color={accentForeground} label="Accent Foreground"*/}
            {/*             onChange={handleColorChange('--accent-foreground')} />*/}
            {/*<ColorPicker color={destructive} label="Destructive" onChange={handleColorChange('--destructive')} />*/}
            {/*<ColorPicker color={border} label="Border" onChange={handleColorChange('--border')} />*/}
            {/*<ColorPicker color={input} label="Input" onChange={handleColorChange('--input')} />*/}
            {/*<ColorPicker color={ring} label="Ring" onChange={handleColorChange('--ring')} />*/}
            {/*<ColorPicker color={chart1} label="Chart 1" onChange={handleColorChange('--chart-1')} />*/}
            {/*<ColorPicker color={chart2} label="Chart 2" onChange={handleColorChange('--chart-2')} />*/}
            {/*<ColorPicker color={chart3} label="Chart 3" onChange={handleColorChange('--chart-3')} />*/}
            {/*<ColorPicker color={chart4} label="Chart 4" onChange={handleColorChange('--chart-4')} />*/}
            {/*<ColorPicker color={chart5} label="Chart 5" onChange={handleColorChange('--chart-5')} />*/}
            {/*<ColorPicker color={sidebar} label="Sidebar" onChange={handleColorChange('--sidebar')} />*/}
            {/*<ColorPicker color={sidebarForeground} label="Sidebar Foreground"*/}
            {/*             onChange={handleColorChange('--sidebar-foreground')} />*/}
            {/*<ColorPicker color={sidebarPrimary} label="Sidebar Primary"*/}
            {/*             onChange={handleColorChange('--sidebar-primary')} />*/}
            {/*<ColorPicker color={sidebarPrimaryForeground} label="Sidebar Primary Foreground"*/}
            {/*             onChange={handleColorChange('--sidebar-primary-foreground')} />*/}
            {/*<ColorPicker color={sidebarAccent} label="Sidebar Accent"*/}
            {/*             onChange={handleColorChange('--sidebar-accent')} />*/}
            {/*<ColorPicker color={sidebarAccentForeground} label="Sidebar Accent Foreground"*/}
            {/*             onChange={handleColorChange('--sidebar-accent-foreground')} />*/}
            {/*<ColorPicker color={sidebarBorder} label="Sidebar Border"*/}
            {/*             onChange={handleColorChange('--sidebar-border')} />*/}
            {/*<ColorPicker color={sidebarRing} label="Sidebar Ring" onChange={handleColorChange('--sidebar-ring')} />*/}

        </div>
    )
}


const SScolorDrawerCategory = () => {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Product Information</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        Our flagship product combines cutting-edge technology with sleek
                        design. Built with premium materials, it offers unparalleled
                        performance and reliability.
                    </p>
                    <p>
                        Key features include advanced processing capabilities, and an
                        intuitive user interface designed for both beginners and experts.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Shipping Details</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        We offer worldwide shipping through trusted courier partners.
                        Standard delivery takes 3-5 business days, while express shipping
                        ensures delivery within 1-2 business days.
                    </p>
                    <p>
                        All orders are carefully packaged and fully insured. Track your
                        shipment in real-time through our dedicated tracking portal.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Return Policy</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        We stand behind our products with a comprehensive 30-day return
                        policy. If you&apos;re not completely satisfied, simply return the
                        item in its original condition.
                    </p>
                    <p>
                        Our hassle-free return process includes free return shipping and
                        full refunds processed within 48 hours of receiving the returned
                        item.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

