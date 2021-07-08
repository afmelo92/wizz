import { gql } from 'graphql-request'
import graphQLClient from 'graphql/graphql-client'

const getUsersSlugs = async () => {
  const query = gql`
    query {
      allUsers {
        data {
          instagram
        }
      }
    }
  `

  const response = await graphQLClient.request(query)

  const data = JSON.parse(JSON.stringify(response))

  return data.allUsers.data
}

export default getUsersSlugs
