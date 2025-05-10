import * as yup from 'yup'

export const schema = yup.object({
name:yup.string().required('Nombre es obligatorio').max(50,'Nombre debe tener menos de 50 caracteres'),
description:yup.string().required("Descripción es obligatorio"),
price:yup.number().required('Precio es obligatorio').positive('Precio debe ser negativo').test('precio','Debe tener como máximo 6 enteros y 2 decimales',
  (value)=>value===undefined || /^\d{1,6}(\.\d{1,3})?$/.test(value.toString())
),
duration:yup.string().required('La duración es obligatoria').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,'Formato inválido (HH:mm)'),
dirImage:yup.string(),
specieId:yup.number().required('Especie es obligatorio'),
categoryId:yup.number().required("Categoria es obligatoria"),
})

export type FormValues=yup.InferType<typeof schema>
