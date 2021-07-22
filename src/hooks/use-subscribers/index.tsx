import { useQuery, UseQueryOptions } from 'react-query'

import { UserSubscription } from 'graphql/generated/graphql'
import getUserSubscriptions from 'graphql/queries/subscriptions'
import { ModifiersProps } from 'utils/types'

// export async function useSubscribers(
//   userEmail: string,
//   page: number,
//   options: UseQueryOptions
// ) {
//   return useQuery(
//     'subscriptions',
//     () =>
//       getUserSubscriptions(userEmail,) as Promise<
//         [UserSubscription & ModifiersProps]
//       >,
//     {
//       staleTime: Infinity,
//       ...options
//     }
//   )
// }
