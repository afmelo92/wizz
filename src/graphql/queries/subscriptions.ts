import { gql } from 'graphql-request'
import graphQLClient from 'graphql/graphql-client'

type QueryProps = {
  email: string
  size?: number
  cursor?: string
}

const getUserSubscriptions = async ({
  email,
  size = null,
  cursor = null
}: QueryProps) => {
  const query = gql`
    query userSubscriptions($email: String!) {
      userSubsByUserEmail(email: $email, _size: ${size}, _cursor: ${cursor}) {
        after
        before
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

  return data.userSubsByUserEmail
}

export default getUserSubscriptions
