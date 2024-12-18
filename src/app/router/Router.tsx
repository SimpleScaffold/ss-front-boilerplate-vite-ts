import {BrowserRouter, Route, Routes } from "react-router";


const MODULES = import.meta.glob('/src/pages/**/*.tsx', {eager: true});

// 각 모듈의 파일 경로를 기반으로 경로 및 컴포넌트를 생성
const generateRoutes = (modules) => {
    return Object.keys(modules).map(filePath => {
        // 파일 경로에서 디렉토리 경로만 추출 (파일명 제거)
        const pathParts = filePath.split('/');
        pathParts.pop(); // 파일명을 드롭합니다.

        // 'index' 파일은 그 자체로 경로로 간주 (e.g., sample/index.tsx -> 'sample/')
        const routePath = pathParts.slice(3).join('/').toLowerCase(); // '/src/pages/' 부분을 제거

        // 모듈을 컴포넌트로 변환하여 반환
        const Component = modules[filePath].default;
        return <Route key={routePath} path={routePath} element={<Component/>}/>;
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