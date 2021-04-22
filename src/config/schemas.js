import * as yup from 'yup'

export const contactValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nombre es requerido'),
  lastname: yup
    .string()
    .required('Apellido es requerido'),
  phone: yup
    .string()
    .min(9, ({ min }) => `El teléfono debe tener al menos ${min} digitos`)
    .required('Teléfono es requerido'),
  email: yup
    .string()
    .email('Por favor ingrese un correo valido')
    .required('Correo electrónico es requerido')

})
