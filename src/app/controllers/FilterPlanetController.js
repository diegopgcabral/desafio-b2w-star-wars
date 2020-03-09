import Planet from '../model/Planet';

class FilterPlanetController {
  async index(req, res) {
    try {
      const planet = await Planet.findOne(
        { name: req.params.name },
        'name climate terrain numberOfMovies'
      );

      if (planet) {
        return res.status(200).json(planet);
      }

      return res
        .status(404)
        .send({ message: `Planeta ${req.params.name} não está cadastrado.` });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao realizar a consulta.' });
    }
  }

  async show(req, res) {
    try {
      const planet = await Planet.findById(
        { _id: req.params.id },
        'name climate terrain numberOfMovies'
      );

      if (planet) {
        return res.status(200).json(planet);
      }

      return res.status(404).send({ message: 'ID inválido.' });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao realizar a consulta.' });
    }
  }
}

export default new FilterPlanetController();
