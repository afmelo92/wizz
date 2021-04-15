export type Users = {
  data: [
    {
      ref: string
      ts: number
      data: {
        email: string
        instagram?: string
        invite?: {
          exhibition_name: string
          custom_text: string
        }
      }
    }
  ]
}
