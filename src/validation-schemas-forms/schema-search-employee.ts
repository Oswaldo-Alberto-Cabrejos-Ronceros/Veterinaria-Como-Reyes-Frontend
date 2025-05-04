import * as yup from 'yup';

export const schema = yup.object({
  dni: yup.string().matches(/^\d{1,8}$/, 'DNI debe tener entre 1 y 8 dígitos numéricos'),
  cmvp:yup.string().matches(/^\d{1,8}$/, 'CMVP debe tener entre 1 y 8 dígitos numéricos'),
  names:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
  lastnames:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
  rol:yup.number()
})

export type FormValues = yup.InferType<typeof schema>

