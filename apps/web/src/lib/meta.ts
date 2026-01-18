// Application constants
const APP_NAME = "Muhammad (Salah)"
const APP_DESCRIPTION =
  "For better experience, use a desktop device. Modern 3D portfolio built with React Router and Three.js"
const AUTHOR = "Muhammad (Salah)"
const TWITTER_HANDLE = "@salahbm"
const THEME_COLOR = "var(--background)"

/**
 * Default meta tags for the application
 */
export const defaultMeta = (): Array<{ [key: string]: string }> => {
  return [
    { title: APP_NAME },
    { name: "description", content: APP_DESCRIPTION },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
    { name: "author", content: AUTHOR },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: TWITTER_HANDLE },
    { name: "twitter:title", content: APP_NAME },
    { name: "twitter:description", content: APP_DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:title", content: APP_NAME },
    { property: "og:description", content: APP_DESCRIPTION },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "en_US" },
    { name: "theme-color", content: THEME_COLOR },
    { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    { name: "msapplication-navbutton-color", content: THEME_COLOR },
  ]
}

/**
 * Create meta tags for a specific page
 */

type MetaTag = { title: string } | { name: string; content: string } | { property: string; content: string }

export const createPageMeta = ({
  title,
  description = APP_DESCRIPTION,
  image,
  themeColor = THEME_COLOR,
}: {
  title: string
  description?: string
  image?: string
  themeColor?: string
}): (() => Array<MetaTag>) => {
  const pageTitle = `${title} | ${APP_NAME}`

  return () => {
    const meta = [
      { title: pageTitle },
      { name: "description", content: description },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: description },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { name: "theme-color", content: themeColor },
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      { name: "msapplication-navbutton-color", content: themeColor },
    ]

    // Add image meta tags if an image is provided
    if (image) {
      meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image })
    }

    return meta
  }
}
