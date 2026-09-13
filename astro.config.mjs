import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// base:'/guide' + site(경로 없이 origin만)가 정확한 조합이다. 한때 이걸 빼고
// site에 직접 '/guide' 경로를 넣어본 적이 있는데, @astrojs/sitemap 내부 코드
// (node_modules/@astrojs/sitemap/dist/index.js)가 `new URL(config.base, config.site)`로
// 최종 URL을 만들어서 -- base가 기본값 '/'인 채로 site에 경로를 넣으면 `new URL('/', site)`가
// JS 표준 URL 해석 규칙상 경로를 통째로 지워버려(sitemap/canonical에서 /guide가 사라짐).
// site는 origin만, base가 하위 경로를 맡는 게 이 생태계의 정상적인 사용법이다.
//
// 빌드 산출물(dist/)의 실제 파일은 base 설정과 무관하게 항상 루트에 그대로 생성된다
// (dist/2026-wedding-checklist/index.html 등, dist/guide/... 가 아님) -- Astro static
// 빌드가 base를 "내부 링크/사이트맵 URL 생성용"으로만 쓰고 물리적 출력 경로에는 반영하지
// 않기 때문. 그래서 메인 앱(OAA 오아 본체) vercel.json에서 prefix를 벗기는 리라이트
// (`/guide/:path*` -> 이 배포의 `/:path*`)로 연결해야 한다 -- 이 배포 자체는 항상 루트
// 기준으로 서빙되고, base 덕분에 페이지 안의 링크/canonical/sitemap만 /guide가 붙은
// 최종 공개 주소를 정확히 가리키게 된다.
export default defineConfig({
  site: 'https://oaalife.com',
  base: '/guide',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
