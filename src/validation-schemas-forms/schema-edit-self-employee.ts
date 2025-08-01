import * as yup from 'yup';

export const schema = yup.object({
    phone: yup.string().required('El celular es obligatorio').matches(/^9\d{8}$/, 'Celular inválido (debe empezar con 9 y tener 9 dígitos)'),
    address: yup.string().required('La dirección es obligatoria'),
    headquarterId :yup.number().required('La sede es obligatorio'),
    dirImage:yup.string().required('La imagen es obligatoria')
  }
)

export type FormValues = yup.InferType<typeof schema>
