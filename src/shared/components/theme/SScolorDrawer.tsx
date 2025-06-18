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
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Chose Your Own colors</DrawerTitle>
                    <DrawerDescription>
                        asd
                    </DrawerDescription>
                </DrawerHeader>
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