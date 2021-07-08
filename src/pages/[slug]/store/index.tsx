import { GetStaticPaths, GetStaticProps } from 'next'
import StoreTemplate from 'templates/Store'

export default function UserStoreDynamicPage() {
  return <StoreTemplate />
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}
