import * as Yup from 'yup';

// import axios from 'axios';
import Planet from '../model/Planet';

class PlanetController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome do planeta é obrigatório'),
      climate: Yup.string().required('Clima do planeta é obrigatório'),
      terrain: Yup.string().required('Terreno do planeta é obrigatório'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    try {
      const checkPlanet = await Planet.findOne({ name: req.body.name });

      if (checkPlanet) {
        return res
          .status(400)
          .json({ error: `Planeta ${req.body.name} já cadastrado!` });
      }

      const planet = await Planet.create({ ...req.body });
      return res.status(200).send(planet);
    } catch (error) {
      return res
        .status(400)
        .json({ error: `Planeta ${req.body.name} já cadastrado!` });
    }
  }
}

export default new PlanetController();
