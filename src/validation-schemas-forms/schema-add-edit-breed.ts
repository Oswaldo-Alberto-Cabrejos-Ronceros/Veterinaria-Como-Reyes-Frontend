import * as yup from 'yup'

export const schema = yup.object({
    name:yup.string().required('Nombre es obligatorio').max(50,'Nombre debe tener como maximo 50 caracteres'),
    specieId:yup.number().required('Especie es obligatorio'),
    dirImagen:yup.string().required('Imagen es obligatoria')
})

export type FormValues = yup.InferType<typeof schema>
