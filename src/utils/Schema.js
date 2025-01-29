import * as Yup from 'yup';

const Schema = Yup.object().shape({
  title: Yup.string().required('Zorunlu alan'),
  description: Yup.string().required('Zorunlu alan'),
  startDate: Yup.date().required('Bir tarih seçin'),
  endDate: Yup.date().required('Bir tarih seçin'),
});

export default Schema;
