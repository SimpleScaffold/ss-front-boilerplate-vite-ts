import { useEffect } from 'react'
import { reapplyThemeVariables, useTheme } from 'src/shared/lib/shadcn/components/ThemeProvider.tsx'
import WhLayout from 'src/shared/layouts/WhLayout.tsx'
const HomePage = () => {

    const { theme , setTheme } = useTheme()

    useEffect(() => {

    }, [])


    return <WhLayout>
        asd
    </WhLayout>
}

export default HomePage
