import * as yup from 'yup'

export const schema = yup.object({
  headquarter: yup.string(),
  category: yup.string(),
  date: yup.date(),
  status: yup.string(),
})

export type FormValues = yup.InferType<typeof schema>
