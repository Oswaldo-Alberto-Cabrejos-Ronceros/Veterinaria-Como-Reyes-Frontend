import * as yup from 'yup'

const dateLimit = new Date()

export const schema = yup.object({
  dni: yup.string().matches(/^\d{0,8}$/, 'DNI debe tener hasta 8 dígitos numéricos'),
  headquarterId: yup.number(),
  serviceId: yup.number(),
  status: yup.string(),
  startDate: yup
    .date()
    .max(dateLimit, 'La fecha debe ser máximo de hoy')
    .nullable()
    .when('endDate', ([endDate], schema) => {
      return endDate
        ? schema.max(endDate, 'La fecha de inicio no puede ser después de la fecha fin')
        : schema
    }),
  endDate: yup
    .date()
    .max(dateLimit, 'La fecha debe ser máximo de hoy')
    .nullable()
    .when('startDate', ([startDate], schema) => {
      return startDate
        ? schema.min(startDate, 'La fecha de fin no puede ser antes de la fecha inicio')
        : schema
    }),
})

export type FormValues = yup.InferType<typeof schema>
