import { gql } from 'graphql-request'

import graphQLClient from '../graphql-client'

const getUser = async (email: string) => {
  const query = gql`
    query getUserData($email: String!) {
      userByEmail(email: $email) {
        _id
        instagram
        email
        verified
        invite {
          price_id
          exhibition_name
          custom_text
          product_id
          subscription_price
        }
        account {
          email
          firstname
          lastname
          cep
          user_email
          under_analysis
          cpf
          birthdate
          phone
          address_number
          under_analysis
          address_doc {
            url
            key
          }
          personal_doc {
            url
            key
          }
          instagram_print {
            url
            key
          }
        }
      }
    }
  `

  const variables = {
    email
  }

  const response = await graphQLClient.request(query, variables)

  const data = JSON.parse(JSON.stringify(response))

  console.log('GET USER QUERY:::', data.userByEmail.data)

  return data.userByEmail.data
}

export default getUser
