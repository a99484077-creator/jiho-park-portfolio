# Jiho Park — 3D Modeler

정적 포트폴리오 웹사이트입니다. 작품과 이력 내용, 이미지, GitHub Pages 배포 설정이 포함되어 있습니다.

## GitHub에 올리기

1. 새 GitHub 저장소를 만들고, 이 ZIP의 **내용물**을 저장소의 최상위 폴더에 올립니다. (`dist`, `generate-routes.mjs`, `pages-build.mjs`, `.github` 폴더가 최상위에 있어야 합니다.)
2. 기본 브랜치를 `main`으로 설정합니다.
3. 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
4. **Actions** 탭에서 `Publish portfolio` 작업이 끝나면 Pages 주소에서 확인할 수 있습니다. 새로 올릴 때마다 자동으로 다시 게시됩니다.

`.github`은 숨김 폴더이므로 업로드할 때 빠지지 않도록 확인하세요. `username.github.io` 형태의 저장소와 일반 저장소의 Pages 주소 모두 지원합니다. GitHub Pages를 공개 저장소로 게시하면 작품 이미지와 `content.json`도 공개됩니다.

## 작품과 이력 수정

- `dist/content.json`: `projects` 배열에서 작품 제목, 설명, 이미지 경로, 순서를 관리합니다. `featured: true`인 작품만 홈 슬라이드에 표시됩니다. `section: "additional"`인 작품은 Additional Work에 들어갑니다.
- 같은 파일의 `profile`: 리쥬메 정보와 연락처를 관리합니다.
- `dist/assets/`: 작품 이미지를 넣습니다. 이미지 추가 후 `content.json`에 `/assets/파일명`으로 입력하세요. 필요하면 `imageDimensions`에 원본 가로·세로 픽셀을 넣을 수 있습니다.
- `dist/style.css`: 디자인과 모바일 레이아웃. `dist/app.js`: 화면 동작과 탐색.

GitHub Pages 작업이 게시 전에 `node generate-routes.mjs`를 실행하므로 작품을 추가할 때도 `content.json`과 이미지를 올리면 됩니다. 새로운 작품의 `id`는 영문 소문자, 숫자, 하이픈으로 고유하게 지정하세요.

## 로컬 확인

Node.js가 있으면 저장소 폴더에서 `node generate-routes.mjs`를 실행한 뒤, `dist`를 정적 웹 서버로 열어 확인할 수 있습니다. `file://`로 HTML을 직접 열면 브라우저 보안 제한으로 정상 동작하지 않을 수 있습니다.

작품 제작: Jiho Park. AMP Suit는 Avatar 팬아트이며 장면의 식생에는 Megascans 에셋이 포함됩니다.
