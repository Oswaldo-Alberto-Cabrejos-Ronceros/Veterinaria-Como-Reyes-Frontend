import * as yup from 'yup';
import { subYears } from 'date-fns'
const fechaLimite = subYears(new Date(), 18)

export const schema = yup.object({
    celular: yup.string().required('El celular es obligatorio').matches(/^9\d{8}$/, 'Celular inválido (debe empezar con 9 y tener 9 dígitos)'),
    direccion: yup.string().required('La dirección es obligatoria'),
    fechaNac: yup.date().required('La fecha es obligatorio').max(fechaLimite),
    sede:yup.number().required('La sede es obligatorio')
  }
)

export type FormValues = yup.InferType<typeof schema>
