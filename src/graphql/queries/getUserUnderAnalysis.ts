import { gql } from 'graphql-request'

import graphQLClient from '../graphql-client'

const getUserUnderAnalysis = async (email: string) => {
  const query = gql`
    query getUserAnalysisData($email: String!) {
      userByEmail(email: $email) {
        _id
        account {
          under_analysis
        }
      }
    }
  `

  const variables = {
    email
  }

  const response = await graphQLClient.request(query, variables)

  const data = JSON.parse(JSON.stringify(response))

  return data.userByEmail
}

export default getUserUnderAnalysis
