import * as Yup from 'yup';
import Logger from '../../utils/logger';

export default async (req, res, next) => {
  Logger.info(
    'PlanetStore::validate => Validando campos obrigatórios para planeta.'
  );
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
    Logger.info(
      'PlanetStore::validate => Campos obrigatórios validados com sucesso.'
    );
    return next();
  } catch (err) {
    Logger.error(
      'PlanetStore::validate => Um ou mais campos obrigatórios não foram informados.'
    );
    return res.status(400).json({
      error: 'Falha na validação dos campos',
      description: err.errors,
    });
  }
};
