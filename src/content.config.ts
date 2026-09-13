import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 전략 문서(OAA 오아 전략 01)의 SEO/AEO 키워드 매핑을 그대로 스키마로 옮김:
// - title: SEO 롱테일 제목 ("2026 결혼 준비 체크리스트 순서 총정리")
// - aeoQuestion: AEO 질문형 헤드라인 ("결혼 준비는 무엇부터 시작해야 하나요?")
// - faq: FAQPage 구조화 데이터로 나갈 Q&A (AI 검색 스니펫 노출용)
// - affiliateCategory: 이 글이 어느 CPA/CPS 버티컬로 연결되는지 (cpa_leads.vertical과 맞춤)
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    aeoQuestion: z.string(),
    category: z.enum(['wedding', 'newlywed', 'parenting', 'asset']),
    affiliateCategory: z.enum(['wedding_hall', 'sdm', 'appliance', 'loan', 'subscription', 'jewelry', 'none']).default('none'),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

export const collections = { articles };
