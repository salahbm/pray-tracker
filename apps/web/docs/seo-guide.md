# SEO Implementation Guide for Noor

This guide explains the comprehensive SEO implementation for the Noor website to ensure maximum visibility in search engines globally, in both Korean and English.

## 🎯 Overview

The Noor website is optimized for:

- **Multilingual SEO**: Full support for Korean (ko-KR) and English (en-US)
- **Search Engine Visibility**: Optimized for Google, Bing, and other major search engines
- **Structured Data**: Rich snippets using JSON-LD schema markup
- **Performance**: Fast loading times and mobile optimization
- **Accessibility**: WCAG compliant for better indexing

## 📋 Table of Contents

1. [Core SEO Features](#core-seo-features)
2. [Metadata Configuration](#metadata-configuration)
3. [Structured Data (JSON-LD)](#structured-data-json-ld)
4. [Sitemap & Robots](#sitemap--robots)
5. [Page-Level SEO](#page-level-seo)
6. [Best Practices](#best-practices)
7. [Verification & Analytics](#verification--analytics)
8. [Monitoring & Maintenance](#monitoring--maintenance)

## 🚀 Core SEO Features

### 1. Enhanced Metadata System

Located in `/src/lib/seo.ts`, the `meta()` function generates comprehensive metadata:

```typescript
import { meta } from "@/lib/seo"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params

  return meta({
    locale: locale as Locale,
    pathname: "/about",
    title: "About Us",
    description: "Learn about Noor's mission and team",
    keywords: ["company", "team", "mission"],
    image: "/images/about-og.jpg",
  })
}
```

**Features:**

- ✅ Title and description optimization
- ✅ Multilingual support (ko/en)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ Alternate language links (hreflang)
- ✅ Keywords optimization
- ✅ Google Search Console verification
- ✅ Mobile-optimized meta tags

### 2. Structured Data (JSON-LD)

We implement Schema.org structured data for better search engine understanding:

#### Organization Schema

```typescript
import { generateOrganizationSchema } from "@/lib/seo"

const schema = generateOrganizationSchema("ko")
```

#### Website Schema

```typescript
import { generateWebsiteSchema } from "@/lib/seo"

const schema = generateWebsiteSchema("en")
```

#### Article Schema (for blog posts/stories)

```typescript
import { generateArticleSchema } from "@/lib/seo"

const schema = generateArticleSchema({
  locale: "ko",
  title: "Article Title",
  description: "Article description",
  image: "/images/article.jpg",
  datePublished: "2026-01-20T00:00:00Z",
  url: "/ko/story/123",
})
```

#### Creative Work Schema (for portfolio items)

```typescript
import { generateCreativeWorkSchema } from "@/lib/seo"

const schema = generateCreativeWorkSchema({
  locale: "en",
  name: "Project Name",
  description: "Project description",
  image: "/images/project.jpg",
  dateCreated: "2026-01-15T00:00:00Z",
  url: "/en/work/456",
  keywords: ["web design", "UI/UX"],
})
```

#### Breadcrumb Schema

```typescript
import { generateBreadcrumbSchema } from "@/lib/seo"

const schema = generateBreadcrumbSchema([
  { name: "Home", url: "/ko" },
  { name: "Work", url: "/ko/work" },
  { name: "Project Name", url: "/ko/work/123" },
])
```

## 🗺️ Sitemap & Robots

### Sitemap (`/src/app/sitemap.ts`)

The sitemap automatically generates URLs for:

- All static pages in both languages
- Dynamic work items (when API is connected)
- Dynamic story items (when API is connected)

**Features:**

- ✅ Bilingual URLs (ko/en)
- ✅ Proper priority settings
- ✅ Change frequency hints
- ✅ Alternate language links
- ✅ Last modified dates

**Access:** `https://noorapp.uz/sitemap.xml`

### Robots.txt (`/src/app/robots.ts`)

Configured to:

- ✅ Allow all search engines
- ✅ Block API routes and admin areas
- ✅ Reference sitemap
- ✅ Specific rules for Googlebot and Bingbot

**Access:** `https://noorapp.uz/robots.txt`

## 📄 Page-Level SEO

### Homepage Example

```typescript
// src/app/[locale]/(site)/page.tsx
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params

  return meta({
    locale: locale as Locale,
    pathname: "/",
    title: locale === "ko" ? "홈" : "Home",
    description:
      locale === "ko"
        ? "모멘티는 혁신적인 디지털 경험을 창조하는 크리에이티브 에이전시입니다."
        : "Noor is a creative agency crafting innovative digital experiences.",
    keywords: ["creative agency", "web development", "design"],
  })
}
```

### Work Detail Page Example

```typescript
// src/app/[locale]/(site)/work/[id]/page.tsx
export async function generateMetadata({ params }: { params: { locale: string; id: string } }): Promise<Metadata> {
  const { locale, id } = await params
  const work = await fetchWork(id)

  return meta({
    locale: locale as Locale,
    pathname: `/work/${id}`,
    title: work.title,
    description: work.description,
    image: work.thumbnail,
    keywords: work.tags,
    type: "article",
    publishedTime: work.createdAt,
    modifiedTime: work.updatedAt,
  })
}
```

## 🎯 Best Practices

### 1. Title Optimization

- Keep titles under 60 characters
- Include primary keyword near the beginning
- Use unique titles for each page
- Format: `Page Title | Noor` (or `페이지 제목 | 모멘티`)

### 2. Description Optimization

- Keep descriptions between 150-160 characters
- Include call-to-action when appropriate
- Make it compelling and unique
- Include target keywords naturally

### 3. Keywords Strategy

- Use 5-10 relevant keywords per page
- Mix broad and specific terms
- Include Korean and English variations
- Avoid keyword stuffing

### 4. Image Optimization

- Use descriptive file names
- Add alt text to all images
- Optimize file sizes (use WebP when possible)
- Use responsive images
- Recommended OG image size: 1200x630px

### 5. URL Structure

- Use clean, descriptive URLs
- Include language prefix (`/ko/` or `/en/`)
- Use hyphens for word separation
- Keep URLs short and meaningful

### 6. Internal Linking

- Link to related content
- Use descriptive anchor text
- Maintain a logical site structure
- Implement breadcrumbs

## 🔍 Verification & Analytics

### Google Search Console Setup

1. **Add Property:**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add both `https://noorapp.uz` and language-specific versions

2. **Verify Ownership:**
   - Get verification code from Google
   - Add to `.env.local`:
     ```bash
     NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
     ```
   - The code will automatically be added to the `<head>` via the `meta()` function

3. **Submit Sitemap:**
   - Submit `https://noorapp.uz/sitemap.xml`
   - Monitor indexing status

### Bing Webmaster Tools

1. Visit [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add and verify your site
3. Submit sitemap
4. Monitor crawl stats

### International Targeting

In Google Search Console:

1. Go to Settings → International Targeting
2. Verify hreflang tags are working
3. Monitor country-specific performance

## 📊 Monitoring & Maintenance

### Regular Checks (Weekly)

- [ ] Monitor Google Search Console for errors
- [ ] Check indexing status of new pages
- [ ] Review Core Web Vitals
- [ ] Monitor mobile usability issues

### Monthly Tasks

- [ ] Analyze search performance by language
- [ ] Review and update meta descriptions for low-performing pages
- [ ] Check for broken links
- [ ] Update sitemap if new content types added
- [ ] Review keyword rankings

### Quarterly Reviews

- [ ] Comprehensive SEO audit
- [ ] Competitor analysis
- [ ] Update keyword strategy
- [ ] Review and update structured data
- [ ] Performance optimization

## 🌍 Multilingual SEO Checklist

- [x] Hreflang tags implemented
- [x] Language-specific URLs (`/ko/` and `/en/`)
- [x] Separate metadata for each language
- [x] Localized keywords
- [x] Proper canonical URLs
- [x] x-default hreflang for default language
- [x] Language selector in UI
- [x] Consistent translations across pages

## 🚨 Common Issues & Solutions

### Issue: Pages not being indexed

**Solutions:**

1. Check robots.txt isn't blocking pages
2. Verify sitemap is submitted
3. Check for noindex tags
4. Ensure pages are linked from other pages
5. Request indexing via Search Console

### Issue: Duplicate content

**Solutions:**

1. Verify canonical URLs are correct
2. Check hreflang implementation
3. Use 301 redirects for old URLs
4. Ensure consistent URL structure

### Issue: Low click-through rate

**Solutions:**

1. Improve title and description
2. Add structured data for rich snippets
3. Ensure meta descriptions are compelling
4. Test different variations

## 📚 Additional Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Hreflang Guide](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Core Web Vitals](https://web.dev/vitals/)

## 🔄 Future Enhancements

- [ ] Add blog/news section with article schema
- [ ] Implement FAQ schema for service pages
- [ ] Add video schema for video content
- [ ] Set up Google Analytics 4
- [ ] Implement event tracking
- [ ] Add review/rating schema for testimonials
- [ ] Create AMP versions for blog posts
- [ ] Implement progressive web app features

---

**Last Updated:** January 2026  
**Maintained By:** Noor Development Team
