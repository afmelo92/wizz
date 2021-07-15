import * as yup from 'yup'

export const emailSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido')
})

export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('Telefone obrigatório')
    .matches(/^\d+$/, 'Apenas números são permitidos')
    .min(11, 'Mínimo de 11 dígitos com DDD')
})

export const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Mínimo de 6 caracteres')
})

export const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Mínimo de 6 caracteres'),
  password_confirmation: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .oneOf(
      [yup.ref('password'), null],
      'A confirmação precisa ser igual a senha'
    )
})

export const inviteFormSchema = yup.object().shape({
  subscriber_instagram: yup.string().required('Nome de exibição obrigatório'),
  subscriber_email: yup
    .string()
    .email('Email inválido')
    .required('Email obrigatório'),
  subscriber_phone: yup
    .string()
    .matches(/^\d+$/, 'Apenas números são permitidos')
    .min(11, 'O formato deve ser 11 9 9999 9999')
    .required('Telegram obrigatório')
})

export const userInviteFormSchema = yup.object().shape({
  exhibition_name: yup.string().required('Nome de exibição obrigatório'),
  custom_text: yup.string().max(180, 'No máximo 180 caracteres'),
  price: yup.string().required('Preço da mensalidade obrigatório')
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
    .matches(/^\d+$/, 'Apenas números são permitidos')
    .length(11, '11 dígitos obrigatórios')
    .required('CPF obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  phone: yup
    .string()
    .matches(/^\d+$/, 'Apenas números são permitidos')
    .min(11, 'Mínimo de 11 dígitos com DDD')
    .required('Telefone obrigatório'),
  birthdate: yup
    .date()
    .typeError('Data inválida')
    .max(new Date(), 'Você não pode nascer no futuro')
    .required('Data de nascimento obrigatória'),
  cep: yup
    .string()
    .matches(/^\d+$/, 'Apenas números são permitidos')
    .min(8, '8 dígitos obrigatórios')
    .required('CEP obrigatório'),
  address_number: yup
    .string()
    .matches(/^\d+$/, 'Apenas números são permitidos')
    .required('Número obrigatório')
})

export const unsubConfirmFormSchema = yup.object().shape({
  unsub_code: yup
    .string()
    .required('O Código é obrigatório')
    .min(5, '5 dígitos obrigatórios')
    .max(5, '5 dígitos obrigatórios')
})
