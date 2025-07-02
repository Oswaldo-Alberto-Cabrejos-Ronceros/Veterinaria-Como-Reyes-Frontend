import * as yup from 'yup'

export const schema = yup.object({
  headquarterVetServiceId: yup.number().required('El servicio es obligatorio'),
  ownerDni: yup.string().matches(/^\d{8}$/, 'Dni inválido (debe tener 8 dígitos)').required('DNI es obligatorio'),
  ownerId: yup.number().required('El animal es obligatorio'),
  ownerName: yup.string().required('Busque un cliente'),
  petId: yup.number().required('El animal es obligatorio'),
    employeeId: yup.number().required('El empleado es obligatorio'),
})
export type FormValues = yup.InferType<typeof schema>
