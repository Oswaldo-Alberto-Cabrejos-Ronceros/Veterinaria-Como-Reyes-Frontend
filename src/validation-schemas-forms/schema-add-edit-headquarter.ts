import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .required('Nombre es obligatorio')
    .max(50, 'Nombre debe ser menor a 50 caracteres'),
  phone: yup
    .string()
    .required('Teléfono es obligatorio')
    .matches(/^$|^9\d{0,8}$/, 'Celular inválido, debe empezar con 9 y tener 9 dígitos'),
  address: yup
    .string()
    .required('Dirección es obligatoria')
    .max(255, 'Dirección debe ser menor a 255 caracteres'),
  email: yup.string().required('Email es obligatorio').email('Formato de email inválido'),
  district: yup.string().required('Distrito es obligatorio'),
  province: yup.string(),
  departament: yup.string(),
})

export type FormValues = yup.InferType<typeof schema>
