import Planet from '../model/Planet';
import Logger from '../../utils/logger';

class FilterPlanetController {
  async index(req, res) {
    Logger.info(
      `FilterPlanetController::index => Consultando o planeta ${req.params.name} no BD.`
    );
    try {
      const { name } = req.params;
      const planet = await Planet.findOne(
        { name },
        'name climate terrain numberOfMovies'
      );

      if (planet) {
        return res.status(200).json(planet);
      }

      Logger.error(
        `FilterPlanetController::index => O planeta ${req.params.name} não está cadastrado no BD.`
      );
      return res
        .status(404)
        .send({ warn: `Planeta ${req.params.name} não está cadastrado.` });
    } catch (err) {
      Logger.error(
        'FilterPlanetController::index => Erro ao realizar consulta no BD.'
      );
      return res.status(500).send({ error: 'Erro ao realizar a consulta.' });
    }
  }

  async show(req, res) {
    Logger.info(
      `FilterPlanetController::show => Consultando o planeta de ID: ${req.params.id} no BD.`
    );
    try {
      const { id } = req.params;
      const planet = await Planet.findById(
        id,
        'name climate terrain numberOfMovies'
      );

      if (planet) {
        return res.status(200).json(planet);
      }

      Logger.error(
        `FilterPlanetController::show => O ID: ${req.params.id} não é válido.`
      );
      return res.status(404).send({ message: 'ID não cadastrado.' });
    } catch (err) {
      Logger.error(
        'FilterPlanetController::show => Erro ao realizar consulta no BD.'
      );
      return res.status(500).send({ error: 'Erro ao realizar a consulta.' });
    }
  }
}

export default new FilterPlanetController();
