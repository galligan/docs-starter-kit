import { useMDXComponents } from '@/mdx-components'
import { generateStaticParamsFor, importPage } from 'nextra/pages'

export const generateStaticParams = generateStaticParamsFor('slug')

export async function generateMetadata(props: any) {
  const params = await props.params
  const { metadata } = await importPage(params.slug)
  return metadata
}

const Nextra = async (props: any) => {
  const params = await props.params
  const result = await importPage(params.slug)
  const { default: MDXContent, toc, metadata } = result
  const mdxComponents = useMDXComponents()

  return <MDXContent {...props} components={mdxComponents} />
}

export default Nextra