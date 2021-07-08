import { gql } from 'graphql-request'
import graphQLClient from 'graphql/graphql-client'

const getUserByInstagram = async (instagram: string) => {
  const query = gql`
    query userByInsta($instagram: String!) {
      userByInstagram(instagram: $instagram) {
        _id
        email
        instagram
        verified
        invite {
          price_id
          exhibition_name
          custom_text
          product_id
          subscription_price
        }
      }
    }
  `

  const variables = {
    instagram
  }

  const response = await graphQLClient.request(query, variables)

  const data = JSON.parse(JSON.stringify(response))

  console.log('QUERY GET USER BY INSTA:::', data)

  return data.userByInstagram
}

export default getUserByInstagram
