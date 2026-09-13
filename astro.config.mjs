import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// base:'/guide'를 썼더니 astro dev/preview 서버는 base를 인식해서 로컬 테스트가
// 멀쩡해 보였지만, 실제 빌드 산출물(dist/)은 파일이 루트에 그대로 생성돼서
// Vercel 정적 호스팅(파일 경로 그대로 서빙)과 어긋나 /guide/* 가 전부 404였음 --
// 배포 후 curl로 실제 확인하다가 발견. base는 빼고 사이트는 루트에 그대로
// 배포한 뒤, 메인 앱(OAA 오아 본체) 쪽 vercel.json에서 `/guide/:path*` ->
// 이 배포 URL의 `/:path*`(prefix를 벗기는 리라이트)로 연결한다. site에는
// 최종 공개 경로(/guide 포함)를 넣어서 sitemap/canonical만 올바른 절대경로로 나가게 한다.
export default defineConfig({
  site: 'https://oaalife.com/guide',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
