# Canary Lab

> 실험적인 기능을 적용하며 만드는 **풀스택 기술 블로그** 프로젝트입니다.

[![Production](https://img.shields.io/badge/Live-canary--lab.vercel.app-00C7B7?style=for-the-badge&logo=vercel)](https://canary-lab.vercel.app)  
[![Staging](https://img.shields.io/badge/Staging-Vercel-000?style=for-the-badge&logo=vercel)](https://canary-lab-stag.vercel.app)

---

## 목차

- [소개](#-소개)
- [데모](#-데모)
- [기술 스택](#-기술-스택)
- [주요 기능](#-주요-기능)
- [프로젝트 구조](#-프로젝트-구조)
- [기여](#-기여)

---

## 소개

**Canary Lab**은 최신 프론트엔드·백엔드 기술을 실험하고, 그 결과를 글로 정리하는 기술 블로그입니다.  
단순한 정적 블로그가 아니라 **인증·DB·스토리지·AI·PWA**까지 포함한 풀스택 웹 애플리케이션으로 설계했으며, 실제 서비스 수준의 배포·운영을 전제로 개발했습니다.

- **목표**: 기술 탐구 + 실서비스급 풀스택 경험
- **배포**: Vercel (Production / Staging 분리)
- **설계**: [Figma](https://www.figma.com/file/2VdpF0IhNz4CTdi7JEaGzH/canary-lab) 기반 UI

---

## 데모

| 환경 | URL |
|------|-----|
| **Production** | [canary-lab.vercel.app](https://canary-lab.vercel.app) |
| **Staging** | [canary-lab-stag.vercel.app](https://canary-lab-stag.vercel.app) |

---

## 기술 스택

### Frontend

| 구분 | 기술 |
|------|------|
| **Framework** | Next.js 16 (App Router), React 18 |
| **Language** | TypeScript |
| **State** | Redux Toolkit, Redux Persist, TanStack React Query |
| **Styling** | SASS (SCSS Modules) |
| **Editor** | Editor.js (헤더, 리스트, 코드, 이미지, 테이블 등 다수 플러그인), Markdown 에디터 |
| **UX** | GSAP, Three.js, react-type-animation |

### Backend & Infra

| 구분 | 기술 |
|------|------|
| **Runtime** | Node.js (≥24) |
| **Auth** | NextAuth v5 (Auth.js) — GitHub·Google 연동 (Apple, Naver, Kakao는 미연동) |
| **Database** | Vercel Postgres (SQL) |
| **Storage** | Vercel Blob (이미지·아바타·썸네일) |
| **AI** | OpenAI API (GPT·DALL·E 연동 코드 포함, 유료 계정 미사용으로 현재 비동작) |

### DevOps & Quality

| 구분 | 기술 |
|------|------|
| **Hosting** | Vercel |
| **PWA** | next-pwa (Workbox) |
| **Analytics** | Vercel Analytics, Vercel Speed Insights, Google Analytics |
| **SEO** | 메타데이터, Google/Naver 사이트 소유 인증 |
| **Testing** | Jest, Testing Library |
| **Lint/Format** | ESLint, Prettier |

---

## 주요 기능

### 블로그 코어

- **게시글 CRUD**: 목록·상세·작성·수정·삭제
- **검색·태그·인기/최신 글**: 태그 필터, 조회수·좋아요 기반 정렬
- **댓글**: 작성·수정·삭제, DB 연동

### 인증·사용자

- **소셜 로그인**: GitHub, Google 연동 (Apple, Naver, Kakao는 미연동)
- **계정 연동**: 한 사용자가 여러 OAuth 제공자를 하나의 계정으로 연결
- **마이페이지**: 프로필, 아바타 업로드(Vercel Blob), 로케일 설정

### 콘텐츠 작성

- **리치 에디터**: Editor.js 기반 (헤더, 리스트, 코드, 이미지, 테이블, 인라인 코드 등)
- **AI 보조** (구현됨, OpenAI 유료 미사용으로 현재 비동작)  
  - **마크다운 생성**: 프롬프트 → GPT로 본문 마크다운 생성  
  - **썸네일 생성**: 제목·본문 요약 또는 커스텀 프롬프트 → DALL·E 이미지 생성 후 Blob 저장

### UX·퍼포먼스

- **다크/라이트 테마**: Redux Persist로 테마 유지
- **다국어(i18n)**: 언어 전환 및 로케일 저장
- **PWA**: 오프라인·설치 가능
- **반응형 레이아웃**: 다양한 디바이스 대응
- **애니메이션**: Color Bends 배경, 스크롤 탑 버튼, 터미널/타이핑 효과 등

---

## 프로젝트 구조

```
canary-lab/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API Routes (posts, comments, tags, users, image)
│   │   ├── posts/              # 게시글 목록·상세·작성·수정
│   │   ├── mypage/             # 마이페이지
│   │   ├── login/              # 로그인
│   │   └── avatar/             # 아바타 업로드
│   ├── components/             # 공통·메인·에디터 컴포넌트
│   ├── store/                  # Redux (theme, modal, user, post, tag, language 등)
│   ├── hooks/                  # 커스텀 훅 (Redux, 번역, 이미지 업로드 등)
│   ├── constants/              # 메타데이터, 에디터 설정, 시퀀스 등
│   └── utils/                  # DB 스키마 보강, 유틸
├── auth.ts / auth.config.ts    # NextAuth 설정
├── next.config.js              # PWA, 이미지 도메인 등
└── scripts/seed.js             # 시드 데이터
```

---

## 기여

버그 수정, 문서 개선, 새 기능 제안 모두 환영합니다.  
자세한 절차는 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참고해 주세요.

1. 저장소 Fork
2. `canary` 브랜치 기준으로 feature 브랜치 생성
3. 변경 후 테스트·린트 확인
4. Pull Request 생성 (base: `canary`)

---

## 라이선스

이 프로젝트는 private 저장소이며, 라이선스는 저장소 소유자 정책을 따릅니다.

---

**Canary Lab** — 실험과 기록을 위한 기술 블로그
