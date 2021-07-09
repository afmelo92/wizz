import { gql } from 'graphql-request'
import graphQLClient from 'graphql/graphql-client'
import { formatUserSubscribersData } from 'utils/formatDate'

// Adaptar para paginação

const getUserSubscriptions = async (email: string) => {
  const query = gql`
    query userSubscriptions($email: String!) {
      userSubsByUserEmail(email: $email) {
        data {
          _ts
          _id
          price_id
          subscriber_id
          status
          subscriber {
            _id
            subscriber_instagram
            subscriber_email
            stripe_customer_id
            subscriber_phone
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

  return formatUserSubscribersData(data.userSubsByUserEmail.data)
}

export default getUserSubscriptions
