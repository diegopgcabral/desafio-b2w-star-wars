import axios from 'axios';
import Planet from '../model/Planet';

import Cache from '../../lib/Cache';
import Logger from '../../utils/logger';

class PlanetController {
  async index(req, res) {
    Logger.info('PlanetController::index => Iniciando listagem de planeta(s)');
    const cached = await Cache.get('planets');

    if (cached) {
      Logger.info(
        'PlanetController::index => Planeta(s) retornado(s) com sucesso.'
      );
      return res.json(cached);
    }

    try {
      const planets = await Planet.find();

      await Cache.set('planets', planets);
      Logger.info(
        'PlanetController::index => Planeta(s) retornado(s) com sucesso.'
      );
      return res.status(200).json(planets);
    } catch (err) {
      Logger.error('PlanetController::index => Falha ao listar planeta(s)');
      return res.status(500).send({ error: 'Erro ao realizar a consulta.' });
    }
  }

  async store(req, res) {
    Logger.info(
      `PlanetController::store =>  Iniciando cadastro do planeta ${req.body.name}`
    );

    try {
      const hasPlanet = await Planet.findOne({ name: req.body.name });

      if (hasPlanet) {
        Logger.error(
          `PlanetController::store => Planeta ${req.body.name} já cadastrado`
        );
        return res
          .status(400)
          .json({ error: `Planeta ${req.body.name} já cadastrado!` });
      }

      Logger.info(
        `PlanetController::SWAPI => Iniciando consulta de participacoes em filmes.`
      );
      const response = await axios.get(process.env.SWAPI_URL, {
        params: { search: req.body.name },
      });

      if (response.data.count > 0) {
        Logger.info(
          `PlanetController::SWAPI => Participacoes em filmes encontrada com sucesso.`
        );
        req.body.numberOfMovies = response.data.results[0].films.length;
      } else {
        Logger.error(
          `PlanetController::PlanetController => Participacoes em filmes nao foi encontrada.`
        );
      }

      const planet = await Planet.create(req.body);

      await Cache.invalidate('planets');

      Logger.info(
        `PlanetController::store =>  Planeta ${req.body.name} cadastrado com sucesso.`
      );
      return res.status(201).json(planet);
    } catch (error) {
      Logger.error(
        `PlanetController::store => Erro ao cadastrar planeta ${req.body.name}`
      );
      return res.status(500).json({
        error: `Não foi possível cadastrar o Planeta ${req.body.name}!`,
        data: error,
      });
    }
  }

  async destroy(req, res) {
    Logger.info(
      `PlanetController::delete =>  Iniciando exclusão do planeta de ID: ${req.params.id}`
    );
    const { id } = req.params;
    const existPlanet = await Planet.findByIdAndDelete(id);

    if (!existPlanet) {
      Logger.warn(
        `PlanetController::delete =>  Planeta de ID ${req.params.id} não encontrado.`
      );
      return res.status(404).json({
        error: 'ID inválido',
      });
    }

    await Cache.invalidate('planets');

    Logger.info(
      `PlanetController::delete => Planeta de ID ${req.params.id} removido com sucesso.`
    );
    return res.status(200).json({
      message: 'Planeta removido com sucesso',
    });
  }
}

export default new PlanetController();
