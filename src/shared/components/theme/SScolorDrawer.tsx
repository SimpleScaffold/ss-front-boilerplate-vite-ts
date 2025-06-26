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
import { ScrollArea } from 'src/shared/lib/shadcn/components/ui/scroll-area.tsx'

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
                        </TabsContent></ScrollArea>
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
    const [card, setCard] = useState(getColor('--card'))
    const [cardForeground, setCardForeground] = useState(getColor('--card-foreground'))
    const [popover, setPopover] = useState(getColor('--popover'))
    const [popoverForeground, setPopoverForeground] = useState(getColor('--popover-foreground'))
    const [primary, setPrimary] = useState(getColor('--primary'))
    const [primaryForeground, setPrimaryForeground] = useState(getColor('--primary-foreground'))
    const [secondary, setSecondary] = useState(getColor('--secondary'))
    const [secondaryForeground, setSecondaryForeground] = useState(getColor('--secondary-foreground'))
    const [muted, setMuted] = useState(getColor('--muted'))
    const [mutedForeground, setMutedForeground] = useState(getColor('--muted-foreground'))
    const [accent, setAccent] = useState(getColor('--accent'))
    const [accentForeground, setAccentForeground] = useState(getColor('--accent-foreground'))
    const [destructive, setDestructive] = useState(getColor('--destructive'))
    const [border, setBorder] = useState(getColor('--border'))
    const [input, setInput] = useState(getColor('--input'))
    const [ring, setRing] = useState(getColor('--ring'))
    const [chart1, setChart1] = useState(getColor('--chart-1'))
    const [chart2, setChart2] = useState(getColor('--chart-2'))
    const [chart3, setChart3] = useState(getColor('--chart-3'))
    const [chart4, setChart4] = useState(getColor('--chart-4'))
    const [chart5, setChart5] = useState(getColor('--chart-5'))
    const [sidebar, setSidebar] = useState(getColor('--sidebar'))
    const [sidebarForeground, setSidebarForeground] = useState(getColor('--sidebar-foreground'))
    const [sidebarPrimary, setSidebarPrimary] = useState(getColor('--sidebar-primary'))
    const [sidebarPrimaryForeground, setSidebarPrimaryForeground] = useState(getColor('--sidebar-primary-foreground'))
    const [sidebarAccent, setSidebarAccent] = useState(getColor('--sidebar-accent'))
    const [sidebarAccentForeground, setSidebarAccentForeground] = useState(getColor('--sidebar-accent-foreground'))
    const [sidebarBorder, setSidebarBorder] = useState(getColor('--sidebar-border'))
    const [sidebarRing, setSidebarRing] = useState(getColor('--sidebar-ring'))


    // 최초 마운트 시 한 번만 실행
    useEffect(() => {
        setDefaultThemeVars(theme)
        applyThemeVariables(theme)
        setBackground(getColor('--background'))
        setForeground(getColor('--foreground'))
        setCard(getColor('--card'))
        setCardForeground(getColor('--card-foreground'))
        setPopover(getColor('--popover'))
        setPopoverForeground(getColor('--popover-foreground'))
        setPrimary(getColor('--primary'))
        setPrimaryForeground(getColor('--primary-foreground'))
        setSecondary(getColor('--secondary'))
        setSecondaryForeground(getColor('--secondary-foreground'))
        setMuted(getColor('--muted'))
        setMutedForeground(getColor('--muted-foreground'))
        setAccent(getColor('--accent'))
        setAccentForeground(getColor('--accent-foreground'))
        setDestructive(getColor('--destructive'))
        setBorder(getColor('--border'))
        setInput(getColor('--input'))
        setRing(getColor('--ring'))
        setChart1(getColor('--chart-1'))
        setChart2(getColor('--chart-2'))
        setChart3(getColor('--chart-3'))
        setChart4(getColor('--chart-4'))
        setChart5(getColor('--chart-5'))
        setSidebar(getColor('--sidebar'))
        setSidebarForeground(getColor('--sidebar-foreground'))
        setSidebarPrimary(getColor('--sidebar-primary'))
        setSidebarPrimaryForeground(getColor('--sidebar-primary-foreground'))
        setSidebarAccent(getColor('--sidebar-accent'))
        setSidebarAccentForeground(getColor('--sidebar-accent-foreground'))
        setSidebarBorder(getColor('--sidebar-border'))
        setSidebarRing(getColor('--sidebar-ring'))
    }, [theme, getColor])


    const handleColorChange = (key: string) => (color: string) => {
        saveThemeVar(theme, key, color)
        applyThemeVariables(theme)
    }


    return (
        <div className="space-y-4 mt-4">
            <ColorPicker
                color={background}
                label="Background Color"
                onChange={handleColorChange('--background')}
            />
            <ColorPicker color={foreground} label="Foreground Color" onChange={handleColorChange('--foreground')} />
            <ColorPicker color={card} label="Card Color" onChange={handleColorChange('--card')} />
            <ColorPicker color={cardForeground} label="Card Foreground"
                         onChange={handleColorChange('--card-foreground')} />
            <ColorPicker color={popover} label="Popover" onChange={handleColorChange('--popover')} />
            <ColorPicker color={popoverForeground} label="Popover Foreground"
                         onChange={handleColorChange('--popover-foreground')} />
            <ColorPicker color={primary} label="Primary" onChange={handleColorChange('--primary')} />
            <ColorPicker color={primaryForeground} label="Primary Foreground"
                         onChange={handleColorChange('--primary-foreground')} />
            <ColorPicker color={secondary} label="Secondary" onChange={handleColorChange('--secondary')} />
            <ColorPicker color={secondaryForeground} label="Secondary Foreground"
                         onChange={handleColorChange('--secondary-foreground')} />
            <ColorPicker color={muted} label="Muted" onChange={handleColorChange('--muted')} />
            <ColorPicker color={mutedForeground} label="Muted Foreground"
                         onChange={handleColorChange('--muted-foreground')} />
            <ColorPicker color={accent} label="Accent" onChange={handleColorChange('--accent')} />
            <ColorPicker color={accentForeground} label="Accent Foreground"
                         onChange={handleColorChange('--accent-foreground')} />
            <ColorPicker color={destructive} label="Destructive" onChange={handleColorChange('--destructive')} />
            <ColorPicker color={border} label="Border" onChange={handleColorChange('--border')} />
            <ColorPicker color={input} label="Input" onChange={handleColorChange('--input')} />
            <ColorPicker color={ring} label="Ring" onChange={handleColorChange('--ring')} />
            <ColorPicker color={chart1} label="Chart 1" onChange={handleColorChange('--chart-1')} />
            <ColorPicker color={chart2} label="Chart 2" onChange={handleColorChange('--chart-2')} />
            <ColorPicker color={chart3} label="Chart 3" onChange={handleColorChange('--chart-3')} />
            <ColorPicker color={chart4} label="Chart 4" onChange={handleColorChange('--chart-4')} />
            <ColorPicker color={chart5} label="Chart 5" onChange={handleColorChange('--chart-5')} />
            <ColorPicker color={sidebar} label="Sidebar" onChange={handleColorChange('--sidebar')} />
            <ColorPicker color={sidebarForeground} label="Sidebar Foreground"
                         onChange={handleColorChange('--sidebar-foreground')} />
            <ColorPicker color={sidebarPrimary} label="Sidebar Primary"
                         onChange={handleColorChange('--sidebar-primary')} />
            <ColorPicker color={sidebarPrimaryForeground} label="Sidebar Primary Foreground"
                         onChange={handleColorChange('--sidebar-primary-foreground')} />
            <ColorPicker color={sidebarAccent} label="Sidebar Accent"
                         onChange={handleColorChange('--sidebar-accent')} />
            <ColorPicker color={sidebarAccentForeground} label="Sidebar Accent Foreground"
                         onChange={handleColorChange('--sidebar-accent-foreground')} />
            <ColorPicker color={sidebarBorder} label="Sidebar Border"
                         onChange={handleColorChange('--sidebar-border')} />
            <ColorPicker color={sidebarRing} label="Sidebar Ring" onChange={handleColorChange('--sidebar-ring')} />

        </div>
    )
}

