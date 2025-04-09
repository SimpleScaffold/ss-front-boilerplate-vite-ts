import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useTheme } from 'src/shared/components/lib/shadcn/components/ThemeProvider.tsx'

const HomePage = () => {

    const { setTheme } = useTheme()

    useEffect(() => {
        setTheme("dark")
    }, [])


    const navigate = useNavigate();
    return <div className={' h-screen w-screen bg-primary text-lg font-bold'}>


                aaa
    </div>
}

export default HomePage
