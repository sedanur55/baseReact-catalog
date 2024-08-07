import * as yup from 'yup';
import { object, string, number, date, InferType, ref } from 'yup';

export  const validationsCatalog = yup.object().shape({
    name: yup.string().required(),
    number: yup.string().required(),
});

export  const validationsGmm = yup.object().shape({
    name: yup.string().required(),
    number: yup.string().required(),
});
