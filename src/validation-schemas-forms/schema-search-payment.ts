import * as yup from 'yup'

const dateLimit=new Date()

export const schema= yup.object({
dni: yup.string().matches(/^\d{0,8}$/, 'DNI debe tener hasta 8 dígitos numéricos'),
headquarterId:yup.number(),
serviceId:yup.number(),
date:yup.date().max(dateLimit,'La fecha debe ser máximo de hoy')
})


export type FormValues = yup.InferType<typeof schema>
