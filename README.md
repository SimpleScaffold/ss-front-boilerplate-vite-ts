FSD

app 레이어
애플리케이션의 진입점
전역 상태 관리, 라우팅 설정, 전역 스타일 정의
예: src/app/index.tsx, src/app/store.ts, src/app/routes.ts


pages 레이어
각 라우트에 해당하는 페이지 컴포넌트 정의
하위 위젯과 기능을 조합하여 전체 페이지 구성
예: src/pages/HomePage.tsx, src/pages/ProfilePage.tsx


widgets 레이어
독립적인 UI 블록으로, 여러 기능을 조합할 수 있음
페이지 레이아웃의 주요 부분을 구성
예: src/widgets/Header, src/widgets/Sidebar, src/widgets/ProductList


features 레이어
사용자가 수행할 수 있는 작업 또는 시나리오
UI 요소와 관련 비즈니스 로직을 포함
예: src/features/auth/LoginForm, src/features/cart/AddToCartButton


shared 레이어
프로젝트 전반에서 사용되는 공통 유틸리티 및 UI 컴포넌트
비즈니스 로직과 무관한 재사용 가능한 코드
예: src/shared/ui/Button, src/shared/lib/api, src/shared/config