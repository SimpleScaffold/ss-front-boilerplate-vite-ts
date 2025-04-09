import { createBrowserRouter, RouteObject } from 'react-router'
import HomePage from 'src/pages/HomePage'
import React, { lazy, Suspense } from 'react'

// NOTE: https://reactrouter.com/start/data/routing
// TODO: lazy loading 적용 완료

// 동적으로 페이지를 import하는 부분을 lazy로 변경
const MODULES = import.meta.glob('src/pages/url/**/*.tsx', { eager: false }) as Record<string, () => Promise<{ default: React.FC }>>;

function withMinimumDelay<T>(promise: Promise<T>, delay = 300): Promise<T> {
    return Promise.all([promise, new Promise((res) => setTimeout(res, delay))]).then(([result]) => result);
}

const generateRoutes = (modules: Record<string, () => Promise<{ default: React.FC }>>): RouteObject[] => {
    return Object.entries(modules).map(([path, module]) => {
        const routePath = path
            .replace(/.*src\/pages\/url\//, '')
            .replace(/\.tsx$/, '')
            .replace(/Page$/, '')
            .replace(/\[(.*?)]/g, ':$1')
            .toLowerCase();

        const Component = lazy(() => withMinimumDelay(module(), 300)); // 최소 300ms 딜레이

        return {
            path: `/${routePath}`,
            element: (
                <Suspense fallback={<>zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</>}> {/* 혹은 prettier한 Skeleton */}
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
