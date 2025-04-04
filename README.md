TODO LIST
- 스토리북 설정 디테일 하게 보기 > 현재 있는 스토리 폴더 삭제후 컴포넌트 쪽으로 옴겨서 확인 
- 스토리북 탬플릿 자동화 (plop 을통해 파일 생성 가능) https://velog.io/@jh5717/.stories-%ED%8C%8C%EC%9D%BC-%EC%9E%90%EB%8F%99%EC%9C%BC%EB%A1%9C-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0-plop
- 예시 컴포넌트 제작
- 모바일, pc , 테블릿 관련 설정 추가
- css 예외 처리 (몇몇 페이지만 새로 시작할 경우)
- 배포 처리 만들기 (도커를 통한 배포 자동화 스토리북으로도 하는 부분이 있으니 확인 필요) 
- 쿠버내티스 배포까지? 는 백앤드 하고 디비 기본적인 설정 마치면 차후에







| Script         | 설명                                                       | Description                                           |
|----------------|----------------------------------------------------------|-------------------------------------------------------|
| `yarn dev`     | 개발 서버를 시작합니다.                                            | Starts the development server.                        |
| `yarn build`   | TypeScript 프로젝트를 빌드하고, 프로덕션 빌드를 생성합니다.                   | Builds the TypeScript project and generates a production build. |
| `yarn lint`    | ESLint를 사용하여 코드 린트 작업을 수행합니다.                            | Runs linting on the codebase using ESLint.            |
| `yarn preview` | 빌드된 프로젝트를 미리 보기 위해 로컬 서버를 실행합니다. (lighthouse 와 같은 성능 측정) | Runs a local server to preview the built project.     |
| `yarn test`    | 모든 테스트 파일을 대화식으로 실행합니다.                                  | Runs tests interactively for all test files.          |
| `yarn test:run`| 터미널에서 모든 테스트를 자동으로 실행합니다.                                | Executes all tests automatically in the terminal.     |