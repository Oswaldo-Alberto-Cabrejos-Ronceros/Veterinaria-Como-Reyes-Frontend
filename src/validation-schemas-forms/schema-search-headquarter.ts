import * as yup from 'yup'

export const schema = yup.object({
  location: yup.string().max(255, 'Dirección debe ser menor a 255 caracteres'),
  province:yup.string(),
  district: yup.string(),
  phone: yup
    .string()
    .matches(/^$|^9\d{0,8}$/, 'Celular inválido, debe empezar con 9 y como máximo 9 dígito'),
  email: yup.string().email('Formato de email inválido'),
})

export type FormValues = yup.InferType<typeof schema>
