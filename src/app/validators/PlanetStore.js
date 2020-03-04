import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .max(255)
        .required('Nome do planeta é obrigatório'),
      climate: Yup.string()
        .max(255)
        .required('Clima é obrigatório'),
      terrain: Yup.string()
        .max(255)
        .required('Terreno é obrigatório'),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({
      error: 'Falha na validação dos campos',
      description: err.errors,
    });
  }
};
