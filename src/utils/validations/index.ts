import * as yup from 'yup'

export const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Mínimo de 6 caracteres')
})

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

export const accountFormSchema = yup.object().shape({
  instagram_print: yup
    .mixed()
    .required('Arquivo obrigatório')
    .test('fileSize', 'Arquivo é muito grande. Máximo 2MB.', value => {
      return value && value[0].size <= 2000000
    })
    .test('fileType', 'Apenas arquivos de imagem permitidos', value => {
      return (
        value &&
        value[0].type.match(/(image\/(jpeg|jpg|png))|(application\/(pdf))/gi)
      )
    }),
  personal_doc: yup
    .mixed()
    .required('Arquivo obrigatório')
    .test('fileSize', 'Arquivo é muito grande. Máximo 2MB.', value => {
      return value && value[0].size <= 2000000
    })
    .test('fileType', 'Apenas arquivos de imagem permitidos', value => {
      return (
        value &&
        value[0].type.match(/(image\/(jpeg|jpg|png))|(application\/(pdf))/gi)
      )
    }),
  address_doc: yup
    .mixed()
    .required('Arquivo obrigatório')
    .test('fileSize', 'Arquivo é muito grande. Máximo 2MB.', value => {
      return value && value[0].size <= 2000000
    })
    .test('fileType', 'Apenas arquivos de imagem permitidos', value => {
      return (
        value &&
        value[0].type.match(/(image\/(jpeg|jpg|png))|(application\/(pdf))/gi)
      )
    }),
  firstname: yup.string().required('Nome obrigatório'),
  lastname: yup.string().required('Sobreome obrigatório'),
  cpf: yup
    .string()
    .length(11, '11 dígitos obrigatórios')
    .required('CPF obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  phone: yup
    .string()
    .length(11, '11 dígitos obrigatórios')
    .required('Telefone obrigatório'),
  birthdate: yup
    .date()
    .typeError('Data inválida')
    .max(new Date(), 'Você não pode nascer no futuro')
    .required('Data de nascimento obrigatória'),
  cep: yup
    .string()
    .min(8, '8 dígitos obrigatórios')
    .required('CEP obrigatório'),
  address_number: yup.string().required('Número obrigatório')
})
