import * as yup from 'yup'

export const schema = yup.object({
  headquarterId: yup.number(),
  categoryId: yup.number(),
  date: yup.date(),
  status: yup.string(),
})

export type FormValues = yup.InferType<typeof schema>
