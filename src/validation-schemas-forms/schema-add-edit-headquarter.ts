import * as yup from 'yup'

export const schema = yup.object({
  location: yup
    .string()
    .required('Dirección es obligatoria')
    .max(255, 'Dirección debe ser menor a 255 caracteres'),
  province: yup.string(),
  district: yup.string().required('Distrito es obligatorio'),
  phone: yup
    .string()
    .required('Teléfono es obligatorio')
    .matches(/^$|^9\d{0,8}$/, 'Celular inválido, debe empezar con 9 y tener 9 dígitos'),
  email: yup.string().required('Email es obligatorio').email('Formato de email inválido'),
})

export type FormValues = yup.InferType<typeof schema>
