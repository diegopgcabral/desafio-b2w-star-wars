import axios from 'axios';
import Planet from '../model/Planet';

import Cache from '../../lib/Cache';

class PlanetController {
  async index(req, res) {
    const cached = await Cache.get('planets');

    if (cached) {
      return res.json(cached);
    }

    try {
      const planets = await Planet.find(
        {},
        'name climate terrain numberOfMovies'
      );

      await Cache.set('planets', planets);

      return res.status(200).json(planets);
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao realizar a consulta.' });
    }
  }

  async store(req, res) {
    try {
      const checkPlanet = await Planet.findOne({ name: req.body.name });

      if (checkPlanet) {
        return res
          .status(400)
          .json({ error: `Planeta ${req.body.name} já cadastrado!` });
      }

      const response = await axios.get(process.env.SWAPI_URL, {
        params: { search: req.body.name },
      });

      let numberOfMovies = 0;

      if (response.data.count > 0) {
        numberOfMovies = response.data.results[0].films.length;
      }

      const { _id, name, climate, terrain } = await Planet.create({
        ...req.body,
        numberOfMovies,
      });

      await Cache.invalidate('planets');

      return res.status(201).json({
        _id,
        name,
        climate,
        terrain,
        numberOfMovies,
      });
    } catch (error) {
      return res.status(400).json({
        error: `Não foi possível cadastrar o Planeta ${req.body.name}!`,
        data: error,
      });
    }
  }

  async delete(req, res) {
    const existPlanet = await Planet.findByIdAndDelete({
      _id: req.params.id,
    }).exec();

    if (!existPlanet) {
      return res.status(404).json({
        error: 'ID inválido',
      });
    }

    await Cache.invalidate('planets');

    return res.status(200).json({
      message: 'Planeta removido com sucesso',
    });
  }
}

export default new PlanetController();
