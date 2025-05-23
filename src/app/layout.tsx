import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '@/app.css'

export const metadata = {
  title: 'Docs Starter Kit',
  description: 'A modern documentation site with Nextra and shadcn/ui',
}

const banner = <Banner storageKey="nextra-banner">Welcome to the Docs Starter Kit 🎉</Banner>
const navbar = (
  <Navbar
    logo={<b>Docs Starter</b>}
    projectLink="https://github.com"
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Docs Starter Kit.</Footer>

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/your-repo/docs"
          footer={footer}
          sidebar={{
            autoCollapse: true,
            defaultMenuCollapseLevel: 1,
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}