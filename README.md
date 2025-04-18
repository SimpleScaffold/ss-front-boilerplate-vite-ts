TODO LIST

- 스토리북 설정 디테일 하게 보기 > 현재 있는 스토리 폴더 삭제후 컴포넌트 쪽으로 옴겨서 확인
- 스토리북 탬플릿 자동화 (plop 을통해 파일 생성
  가능) https://velog.io/@jh5717/.stories-%ED%8C%8C%EC%9D%BC-%EC%9E%90%EB%8F%99%EC%9C%BC%EB%A1%9C-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0-plop
- 예시 컴포넌트 제작 (spin, 테이블, 동적 넓이 높이 추가 컴포넌트, 디바운스 처리된 인풋, 예시 래이아웃들)
- 모바일, pc , 테블릿 관련 설정 추가
- css 예외 처리 (몇몇 페이지만 새로 시작할 경우)
- 배포 처리 만들기 (도커를 통한 배포 자동화 스토리북으로도 하는 부분이 있으니 확인 필요)
- 쿠버내티스 배포까지? 는 백앤드 하고 디비 기본적인 설정 마치면 차후에
- readme 파일 스토리북 첫 페이지에 랜더링 하는 기능
- 리드미 추가 작성 (stack 로고로 변경, 목차 만들기 + 순서 정리, 설명 추가, 기술스택 용도별 분리, 라우팅 관련[라이브러리, 사용방법, 스토어 연동])
- rxjs 도입 고임 
- 새로고침시 깜빡임 이슈 - 아주 가끔씩 발생함 원인 불명 
- html 핼맷 도입 고민 < 19 는 그냥 써두 대지만 라우트별 다른 지원을 위해 도입 


<img src="https://capsule-render.vercel.app/api?type=waving&height=250&color=gradient&text=ss-react-boilerplate-ts&desc=Super%20Sexy&fontAlignY=30&descAlignY=55" style="width: 100%;" />



## Stack (로고로 변경)
- 언어

- 프레임워크
- 빌드도구:   
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" />

- 스타일링
- 라우팅
- 상태관리
- api통신
- 테스트
vitest
- Code Quality & Linting
- CI/CD & Deployment
- Version Control & Collaboration
- Architecture & Folder Structure




<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=Redux&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=shadcnui&logoColor=white" />
  <img src="https://img.shields.io/badge/Yarn4-2C8EBB?style=flat&logo=yarn&logoColor=white" />
</div>



----

# 설치 및 실행 How to Install 

yarn


nvm 추천 > Linux https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating (wsl)
window > https://github.com/coreybutler/nvm-windows
yarn 프로젝트별 관리 추천 > https://yarnpkg.com/getting-started/install


개발자 모드
yarn dev
배포 테스트 
yarn build
yarn preview

----

# 형상관리
{tag}: [{place}] 내용


```
feat: 기능 추가
modify: 버그 아닌 코드 수정
fix: 버그 수정
refactor: 코드 리팩토링
style: 코드 스타일(코드 컨벤션 추가) 수정
docs: 문서 작업
design: 프론트 CSS 수정
test: 테스트 코드 작성
chore: 프로젝트 설정 파일 수정
create: 프로젝트 생성
rename: 파일이나 폴더명을 수정하거나 옮기는 작업만 수행
remove: 파일을 삭제하는 작업만 수행
출처: https://ravenkim97.tistory.com/478 [Life Log:티스토리]


```
----


yarn4 + vite

cra 대비 테스트 결과
빌드속도 - 476 > 75 초


----

폴더 구조 
FSD 의 장점과 프로젝트의 성향에 맞게 수정





----

# 상태 관리

ㅋㅌㅊㅋㅌㅊㅁㄴㅇㅁㅇㄴ

------

# 라우팅



### 간단한 동적 라우팅 기능 
- 별도의 추가없이 src/pages/url/ 안에 경로에 맞게 파일 작성시 동적으로 url이 생성이 된다. 
- [  ] 안에 임의의 명칭을 넣어서 동적 url 형성 가능 
- feature랑 파일명 구분을 위해 Page를 뒤에 붙이는걸 권장 (Page 는 자동 제거됨)

### 졀도의 정적 라우팅 기능 (가장 메인은 여기에 해당[/])
- url 이외에 별도의 라우팅 처리는 src/app/router/router.tsx 안에 router 안에 추가하면 됩니다

### 예시 
``` 
├── pages
│     ├── HomePage.jsx            ------>[/]                     
│     └── url                   
│         ├── [name]               
│         │     └── TestPage.jsx  ------>[/harry/Test]              
│         └── sample                   
│             ├── SamplePage.jsx  ------>[/sample/sample]                
│             └── [Id].jsx        ------>[/sample/123]          

```





------

# 스타일
- tailwind 사용


## 폰트
기본 Pretendard

추가 혹은 변경 
> src/assets/fonts 에 폰트 추가 
> src/styles/typography.css 에 font-face 추가, layout 으로 테일윈드에 적용
> src/styles/base.pcss 에 기본적으로 사용할곳 지정 


현재는 개발자 모드에서는 FOUT 현상이 있음 
빌드시 preload 해주기에 문제 없음 > yarn preview 로 확인해 보기 



----

# 테스트 
단위 테스트 
vitest

E2E 테스트 , 통합 테스트  
Cypress 

----

| Script          | 설명                                                       | Description                                                     |
|-----------------|----------------------------------------------------------|-----------------------------------------------------------------|
| `yarn dev`      | 개발 서버를 시작합니다.                                            | Starts the development server.                                  |
| `yarn build`    | TypeScript 프로젝트를 빌드하고, 프로덕션 빌드를 생성합니다.                   | Builds the TypeScript project and generates a production build. |
| `yarn lint`     | ESLint를 사용하여 코드 린트 작업을 수행합니다.                            | Runs linting on the codebase using ESLint.                      |
| `yarn preview`  | 빌드된 프로젝트를 미리 보기 위해 로컬 서버를 실행합니다. (lighthouse 와 같은 성능 측정) | Runs a local server to preview the built project.               |
| `yarn test`     | 모든 테스트 파일을 대화식으로 실행합니다.                                  | Runs tests interactively for all test files.                    |
| `yarn test:run` | 터미널에서 모든 테스트를 자동으로 실행합니다.                                | Executes all tests automatically in the terminal.               |

# 추천 크롬 익스텐션

0. Reduc DevTools: state, action 관리해준다. DevTools 에서 확인 가능
    - [설치하기](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko)
    - https://github.com/reduxjs/redux-devtools

1. LocatorJS: 크롬에서 컴포넌트 alt + 마우스 좌클릭시 바로 에디터에서 해당 파일이 열림
    - [설치하기](https://chromewebstore.google.com/detail/locatorjs/npbfdllefekhdplbkdigpncggmojpefi)
    - https://www.locatorjs.com/
    - https://github.com/infi-pc/locatorjs

2. colorZilla: 크롬에서 스포이드로 색상 확인 및 복사
    - [설치하기](https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=ko)
    - https://www.colorzilla.com/

3. Page Ruler: 크롬 화면에서 영역 지정하여 길이 px 확인 가능
    - [설치하기](https://chromewebstore.google.com/detail/page-ruler/jcbmcnpepaddcedmjdcmhbekjhbfnlff?hl=ko)

   







