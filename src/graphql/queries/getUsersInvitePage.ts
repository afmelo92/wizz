import { gql } from 'graphql-request'

import graphQLClient from '../graphql-client'

const getUsersInvitePage = async () => {
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
        }
      }
    }
  `

  const response = await graphQLClient.request(query)
  const data = JSON.parse(JSON.stringify(response))

  return data.allUsers.data
}

export default getUsersInvitePage
