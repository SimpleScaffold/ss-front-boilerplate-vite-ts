import { BrowserRouter, Route, Routes } from "react-router";

// Modules 타입 정의
type Modules = {
    [key: string]: {
        default: React.ComponentType;
    }
};

// MODULES의 타입 단언(type assertion)
const rawModules: Record<string, unknown> = import.meta.glob('/src/pages/**/*.tsx', { eager: true });

// MODULES를 Modules 타입으로 검증 및 캐스팅
const MODULES: Modules = Object.fromEntries(
    Object.entries(rawModules).map(([key, value]) => {
        // 각 모듈이 기본(default) React 컴포넌트를 내보내는지 검사
        if (typeof value === 'object' && value !== null && 'default' in value) {
            return [key, value as { default: React.ComponentType }];
        }
        throw new Error(`Module at ${key} does not conform to expected type.`);
    })
);

// 모듈에서 라우트를 생성하는 함수
const generateRoutes = (modules: Modules) => {
    return Object.keys(modules).map(filePath => {
        const pathParts = filePath.split('/');
        pathParts.pop(); // 파일명 제거

        // 라우트 경로 계산
        const routePath = pathParts.slice(3).join('/').toLowerCase(); // '/src/pages/' 부분 제거

        // 추출한 컴포넌트로 Route를 생성
        const Component = modules[filePath].default;
        return <Route key={routePath} path={routePath} element={<Component />} />;
    });
};

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {generateRoutes(MODULES)}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;