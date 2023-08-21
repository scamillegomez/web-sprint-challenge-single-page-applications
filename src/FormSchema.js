import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('name is required')
        .min(2,'name must be at least 2 characters'),
    pizzaSize: yup
        .string()
        .oneOf(['Personal (6")', 'Medium (8")', 'Large (12")', 'Extra Large (16")']),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    onions: yup.boolean(),
    bellPeppers: yup.boolean(),
    specialInstructions: yup
        .string()
        .trim()
})

export default formSchema;