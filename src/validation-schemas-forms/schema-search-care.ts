import * as yup from 'yup'

export const schema = yup.object({
  headquarterId: yup.number(),
  headquarterServiceId: yup.number(),
  date: yup.date(),
  status: yup.string(),
})

export type FormValues = yup.InferType<typeof schema>

