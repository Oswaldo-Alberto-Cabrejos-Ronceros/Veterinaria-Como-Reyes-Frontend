import * as yup from 'yup'

export const schema = yup.object({
  name:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
  ownerDni:yup.string().matches(/^\d{0,8}$/, 'El DNI del dueño debe tener hasta 8 dígitos numéricos'),
  specieId:yup.number(),
  breedId:yup.number(),
  gender:yup.string().max(1)
})

export type FormValues = yup.InferType<typeof schema>
