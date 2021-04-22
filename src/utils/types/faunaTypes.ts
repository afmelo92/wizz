export type Users = {
  data: [
    {
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
          price_id?: string
          product_id?: string
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
      price_id?: string
      product_id?: string
    }
  }
}

export type Subscribers = {
  data: [
    {
      data: {
        subscriber_instagram: string
        subscriber_telegram: string
        subscriber_email: string
        stripe_customer_id: string
        subscriptions: {
          influencer: string
          subscribed_at: string
          status: string
        }[]
      }
    }
  ]
}

export type Subscriber = {
  ref: {
    id: string
  }
  data: {
    subscriber_instagram: string
    subscriber_telegram: string
    subscriber_email: string
    stripe_customer_id: string
    subscriptions: {
      influencer: string
      subscribed_at: string
      status: string
    }[]
  }
}

export type Subscriptions = {
  data: Subscription[]
}

export type Subscription = {
  status: string
  created_at: string
  subscriber: {
    subscriber_instagram: string
    subscriber_telegram: string
    subscriber_email: string
    stripe_customer_id: string
  }
}
