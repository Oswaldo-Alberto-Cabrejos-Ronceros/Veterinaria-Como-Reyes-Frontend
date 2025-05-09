import * as yup from 'yup';
import { subYears } from 'date-fns'
const dateLimit = subYears(new Date(), 18)

export const schema = yup.object({
    phone: yup.string().required('El celular es obligatorio').matches(/^9\d{8}$/, 'Celular inválido (debe empezar con 9 y tener 9 dígitos)'),
    address: yup.string().required('La dirección es obligatoria'),
    birthdate: yup.date().required('La fecha es obligatorio').max(dateLimit,'Debe de haber nacido hace 18 años'),
    headquarterId :yup.number().required('La sede es obligatorio')
  }
)

export type FormValues = yup.InferType<typeof schema>
