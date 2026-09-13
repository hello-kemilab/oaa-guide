import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// site: 메인 도메인. base: '/guide' — 최종적으로 oaalife.com/guide/* 경로로 서비스할
// 예정이라, 로컬 개발/빌드 단계부터 실제 배포 경로와 동일하게 맞춰서 링크 깨짐을
// 미리 잡아낸다. 나중에 메인 앱(oaa-guide 아님, OAA 오아 본체) 쪽 vercel.json에
// `/guide/:path*` -> 이 프로젝트의 Vercel 배포 URL(경로 그대로 유지)로 리라이트를
// 걸면 된다 -- prefix를 벗기지 않는 1:1 패스스루 리라이트여야 base 설정과 맞다.
export default defineConfig({
  site: 'https://oaalife.com',
  base: '/guide',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
