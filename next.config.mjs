import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/src/content',
  defaultShowCopyCode: true,
})

export default withNextra({
  reactStrictMode: true,
})