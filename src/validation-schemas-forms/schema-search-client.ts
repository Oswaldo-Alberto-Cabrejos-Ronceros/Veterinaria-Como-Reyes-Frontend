import * as yup from 'yup';

export const schema = yup.object({
    dni: yup.string().matches(/^\d{0,8}$/, 'DNI debe tener hasta 8 dígitos numéricos'),
    names:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
    lastnames:yup.string().max(50,'Nombres debe tener menos de 50 dígitos'),
    phone: yup.string().matches(/^9\d{0-8}$/, 'Celular inválido, debe empezar con 9 y como máximo 9 dígito'),
    email: yup.string().email('Formato de email inválido')
})

export type FormValues = yup.InferType<typeof schema>
