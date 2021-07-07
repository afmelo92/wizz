import { gql } from 'graphql-request'

import graphQLClient from '../graphql-client'

const getAllUsers = async () => {
  const query = gql`
    query {
      allUsers {
        data {
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
          account {
            email
            firstname
            lastname
            cpf
            birthdate
            under_analysis
            user_email
            phone
            address_number
            personal_doc {
              url
              key
            }
            address_doc {
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
    }
  `

  const response = await graphQLClient.request(query)
  const data = JSON.parse(JSON.stringify(response))

  return data.allUsers.data
}

export default getAllUsers
