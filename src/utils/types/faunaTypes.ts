/* eslint-disable @typescript-eslint/no-explicit-any */
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
        underAnalysis?: boolean
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
    underAnalysis?: boolean
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
        subscriber_phone: string
        subscriber_email: string
        stripe_customer_id: string
        unsub_code: number
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
    subscriber_phone: string
    subscriber_email: string
    stripe_customer_id: string
    unsub_code: number
  }
}

export type Subscriptions = {
  data: Subscription[]
}

export type Subscription = {
  ref: {
    id: string
  }
  data: {
    id: string
    subscriberId: any
    influencerId: any
    status: string
    price_id: string
  }
}

export type FormattedSubscriptions = {
  data: [
    {
      status: string
      created_at: string
      subscriber: string
    }
  ]
}
