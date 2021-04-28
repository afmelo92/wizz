import * as yup from 'yup'

export const inviteFormSchema = yup.object().shape({
  subscriber_instagram: yup.string().required('Nome de exibição obrigatório'),
  subscriber_email: yup
    .string()
    .email('Email inválido')
    .required('Email obrigatório'),
  subscriber_telegram: yup
    .string()
    .min(11, 'O formato deve ser 11 9 9999 9999')
    .max(11, 'O formato deve ser 11 9 9999 9999')
    .required('Telegram obrigatório')
})

export const leadFormSchema = yup.object().shape({
  exhibition_name: yup.string().required('Nome de exibição obrigatório'),
  custom_text: yup.string().max(180, 'No máximo 180 caracteres'),
  subscription_price: yup.string().required('Preço da mensalidade obrigatório')
})

export const validateFiles = (value: FileList) => {
  if (value?.length < 1) {
    return 'Arquivos obrigatórios'
  }
  for (const file of Array.from(value)) {
    if (!file.type.match(/image\/.*/gi)) {
      return 'Apenas aquivos de imagem ou pdf são permitidos'
    }
  }
  for (const file of Array.from(value)) {
    const fsMb = file.size / (1024 * 1024)
    const MAX_FILE_SIZE = 10
    if (fsMb > MAX_FILE_SIZE) {
      return 'Tamanho máximo do arquivo 10mb'
    }
  }
  return true
}
