import { createBrowserRouter } from 'react-router'
import HomePage from 'src/pages/HomePage.jsx'

//NOTE https://reactrouter.com/start/data/routing


// todo lazy loading 적용해야 할까?

const MODULES = import.meta.glob('src/pages/url/**/*.tsx', { eager: true })

const generateRoutes = (modules) => {
    return Object.entries(modules).map(([path, module]) => {
        // 파일 경로에서 'src/pages/url/' 이후의 경로를 추출
        let routePath = path
            .replace(/.*src\/pages\/url\//, '') // 'src/pages/url/' 부분 제거
            .replace(/\.tsx$/, '') // 확장자 제거
            .replace(/Page$/, '') // 'Page' 접미사 제거
            .replace(/\[(.*?)]/g, ':$1') // [param] -> :param 변환
            .toLowerCase()

        const Component = module.default

        return {
            path: `/${routePath}`,
            element: <Component />,
        }
    })
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    ...generateRoutes(MODULES),
])

export default router
