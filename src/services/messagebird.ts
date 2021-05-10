import initMB from 'messagebird'

const messagebird = initMB(process.env.MESSAGEBIRD_VERIFY_KEY)

export default messagebird
