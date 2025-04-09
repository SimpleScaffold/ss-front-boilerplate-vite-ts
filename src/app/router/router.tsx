import { createBrowserRouter, RouteObject } from 'react-router';
import HomePage from 'src/pages/HomePage';
import React, { Suspense, lazy } from 'react';

// NOTE: https://reactrouter.com/start/data/routing
// TODO: lazy loading 적용 완료

// 동적으로 페이지를 import하는 부분을 lazy로 변경
const MODULES = import.meta.glob('src/pages/url/**/*.tsx', { eager: false }) as Record<string, () => Promise<{ default: React.FC }>>;

const generateRoutes = (modules: Record<string, () => Promise<{ default: React.FC }>>): RouteObject[] => {
    return Object.entries(modules).map(([path, module]) => {
        // 파일 경로에서 'src/pages/url/' 이후의 경로를 추출
        const routePath = path
            .replace(/.*src\/pages\/url\//, '') // 'src/pages/url/' 부분 제거
            .replace(/\.tsx$/, '') // 확장자 제거
            .replace(/Page$/, '') // 'Page' 접미사 제거
            .replace(/\[(.*?)]/g, ':$1') // [param] -> :param 변환
            .toLowerCase();

        // lazy loading으로 컴포넌트 동적으로 로드
        const Component = lazy(module);

        return {
            path: `/${routePath}`,
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Component />
                </Suspense>
            ),
        };
    });
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    ...generateRoutes(MODULES),
]);

export default router;
