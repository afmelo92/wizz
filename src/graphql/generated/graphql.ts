/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any
  Time: any
}

export type Account = {
  __typename?: 'Account'
  instagram_print?: Maybe<DocsUrl>
  email?: Maybe<Scalars['String']>
  personal_doc?: Maybe<DocsUrl>
  firstname?: Maybe<Scalars['String']>
  cep?: Maybe<Scalars['String']>
  user_email?: Maybe<Scalars['String']>
  under_analysis?: Maybe<Scalars['Boolean']>
  lastname?: Maybe<Scalars['String']>
  cpf?: Maybe<Scalars['String']>
  birthdate?: Maybe<Scalars['String']>
  address_doc?: Maybe<DocsUrl>
  address_number?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
}

/** 'Account' input values */
export type AccountInput = {
  under_analysis?: Maybe<Scalars['Boolean']>
  user_email?: Maybe<Scalars['String']>
  address_number?: Maybe<Scalars['String']>
  cep?: Maybe<Scalars['String']>
  birthdate?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  cpf?: Maybe<Scalars['String']>
  lastname?: Maybe<Scalars['String']>
  firstname?: Maybe<Scalars['String']>
  address_doc?: Maybe<DocsUrlInput>
  personal_doc?: Maybe<DocsUrlInput>
  instagram_print?: Maybe<DocsUrlInput>
}

export type CreateUserInput = {
  username: Scalars['String']
  password: Scalars['String']
}

export type DocsUrl = {
  __typename?: 'DocsUrl'
  url?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
}

/** 'DocsUrl' input values */
export type DocsUrlInput = {
  url?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
}

export type Invite = {
  __typename?: 'Invite'
  price_id?: Maybe<Scalars['String']>
  exhibition_name?: Maybe<Scalars['String']>
  custom_text?: Maybe<Scalars['String']>
  product_id?: Maybe<Scalars['String']>
  subscription_price?: Maybe<Scalars['Int']>
}

/** 'Invite' input values */
export type InviteInput = {
  exhibition_name?: Maybe<Scalars['String']>
  custom_text?: Maybe<Scalars['String']>
  subscription_price?: Maybe<Scalars['Int']>
  price_id?: Maybe<Scalars['String']>
  product_id?: Maybe<Scalars['String']>
}

export type LoginUserInput = {
  username: Scalars['String']
  password: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Update an existing document in the collection of 'User' */
  updateUser?: Maybe<User>
  /** Update an existing document in the collection of 'Subscriber' */
  updateSubscriber?: Maybe<Subscriber>
  createUser: User
  /** Create a new document in the collection of 'UserSubscription' */
  createUserSubscription: UserSubscription
  /** Delete an existing document in the collection of 'Subscriber' */
  deleteSubscriber?: Maybe<Subscriber>
  /** Update an existing document in the collection of 'UserSubscription' */
  updateUserSubscription?: Maybe<UserSubscription>
  loginUser: Scalars['String']
  /** Create a new document in the collection of 'Subscriber' */
  createSubscriber: Subscriber
  /** Delete an existing document in the collection of 'UserSubscription' */
  deleteUserSubscription?: Maybe<UserSubscription>
  /** Delete an existing document in the collection of 'User' */
  deleteUser?: Maybe<User>
}

export type MutationUpdateUserArgs = {
  id: Scalars['ID']
  data: UserInput
}

export type MutationUpdateSubscriberArgs = {
  id: Scalars['ID']
  data: SubscriberInput
}

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>
}

export type MutationCreateUserSubscriptionArgs = {
  data: UserSubscriptionInput
}

export type MutationDeleteSubscriberArgs = {
  id: Scalars['ID']
}

export type MutationUpdateUserSubscriptionArgs = {
  id: Scalars['ID']
  data: UserSubscriptionInput
}

export type MutationLoginUserArgs = {
  input?: Maybe<LoginUserInput>
}

export type MutationCreateSubscriberArgs = {
  data: SubscriberInput
}

export type MutationDeleteUserSubscriptionArgs = {
  id: Scalars['ID']
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  /** Find a document from the collection of 'UserSubscription' by its id. */
  findUserSubscriptionByID?: Maybe<UserSubscription>
  userSubsByUserEmail: QueryUserSubsByUserEmailPage
  allSubscribers: SubscriberPage
  allUsers: UserPage
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>
  userByEmail: User
  /** Find a document from the collection of 'Subscriber' by its id. */
  findSubscriberByID?: Maybe<Subscriber>
  allSubscriptions: UserSubscriptionPage
}

export type QueryFindUserSubscriptionByIdArgs = {
  id: Scalars['ID']
}

export type QueryUserSubsByUserEmailArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
  email: Scalars['String']
}

export type QueryAllSubscribersArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

export type QueryAllUsersArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

export type QueryFindUserByIdArgs = {
  id: Scalars['ID']
}

export type QueryUserByEmailArgs = {
  email: Scalars['String']
}

export type QueryFindSubscriberByIdArgs = {
  id: Scalars['ID']
}

export type QueryAllSubscriptionsArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** The pagination object for elements of type 'UserSubscription'. */
export type QueryUserSubsByUserEmailPage = {
  __typename?: 'QueryUserSubsByUserEmailPage'
  /** The elements of type 'UserSubscription' in this page. */
  data: Array<Maybe<UserSubscription>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

export type Subscriber = {
  __typename?: 'Subscriber'
  subscriber_instagram?: Maybe<Scalars['String']>
  subscriber_phone?: Maybe<Scalars['String']>
  /** The document's ID. */
  _id: Scalars['ID']
  stripe_customer_id?: Maybe<Scalars['String']>
  subscriber_email?: Maybe<Scalars['String']>
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/** 'Subscriber' input values */
export type SubscriberInput = {
  subscriber_instagram?: Maybe<Scalars['String']>
  subscriber_phone?: Maybe<Scalars['String']>
  subscriber_email?: Maybe<Scalars['String']>
  stripe_customer_id?: Maybe<Scalars['String']>
}

/** The pagination object for elements of type 'Subscriber'. */
export type SubscriberPage = {
  __typename?: 'SubscriberPage'
  /** The elements of type 'Subscriber' in this page. */
  data: Array<Maybe<Subscriber>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  /** The document's ID. */
  _id: Scalars['ID']
  invite?: Maybe<Invite>
  account?: Maybe<Account>
  instagram?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/** 'User' input values */
export type UserInput = {
  email: Scalars['String']
  instagram?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
  invite?: Maybe<InviteInput>
  account?: Maybe<AccountInput>
}

/** The pagination object for elements of type 'User'. */
export type UserPage = {
  __typename?: 'UserPage'
  /** The elements of type 'User' in this page. */
  data: Array<Maybe<User>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

export type UserSubsByUserEmailInput = {
  email: Scalars['String']
}

export type UserSubscription = {
  __typename?: 'UserSubscription'
  /** The document's ID. */
  _id: Scalars['ID']
  price_id?: Maybe<Scalars['String']>
  subscriber: Subscriber
  subscriber_id?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  user: User
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/** 'UserSubscription' input values */
export type UserSubscriptionInput = {
  subscriber_id?: Maybe<Scalars['String']>
  subscriber?: Maybe<UserSubscriptionSubscriberRelation>
  user?: Maybe<UserSubscriptionUserRelation>
  status?: Maybe<Scalars['String']>
  price_id?: Maybe<Scalars['String']>
}

/** The pagination object for elements of type 'UserSubscription'. */
export type UserSubscriptionPage = {
  __typename?: 'UserSubscriptionPage'
  /** The elements of type 'UserSubscription' in this page. */
  data: Array<Maybe<UserSubscription>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'UserSubscription' and 'Subscriber' using the field 'UserSubscription.subscriber'. */
export type UserSubscriptionSubscriberRelation = {
  /** Create a document of type 'Subscriber' and associate it with the current document. */
  create?: Maybe<SubscriberInput>
  /** Connect a document of type 'Subscriber' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

/** Allow manipulating the relationship between the types 'UserSubscription' and 'User' using the field 'UserSubscription.user'. */
export type UserSubscriptionUserRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
