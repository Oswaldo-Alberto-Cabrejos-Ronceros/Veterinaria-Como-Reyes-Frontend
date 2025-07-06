
import * as yup from 'yup'

export const schema = yup.object({
    name:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
    specieId:yup.number(),
    categoryId:yup.number()
})

export type FormValues = yup.InferType<typeof schema>

