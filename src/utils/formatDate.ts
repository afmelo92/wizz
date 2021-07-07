import { UserSubscription } from 'graphql/generated/graphql'

export function formatUserSubscribersData(subscribers: UserSubscription[]) {
  return subscribers.map(item => ({
    ...item,
    created_at: new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(item._ts / 1000))
  }))
}
