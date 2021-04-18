export type Users = {
  data: [
    {
      data: {
        email: string
        instagram?: string
        verified?: boolean
        invite?: {
          exhibition_name: string
          custom_text: string
          subscription_price?: number
        }
      }
    }
  ]
}

export type User = {
  ref: {
    id: string
  }
  data: {
    email: string
    instagram?: string
    verified?: boolean
    invite?: {
      exhibition_name: string
      custom_text: string
      subscription_price?: number
    }
  }
}

export type Subscribers = {
  data: [
    {
      data: {
        subscriptions: {
          influencer: string
          subscribed_at: string
        }[]
        subscriber_instagram: string
        subscriber_telegram: string
        subscriber_email: string
        status: string
      }
    }
  ]
}

export type Subscriber = {
  data: {
    subscriptions: {
      influencer: string
      subscribed_at: string
    }[]
    subscriber_instagram: string
    subscriber_telegram: string
    subscriber_email: string
    status: string
  }
}
