// import axios from 'axios';
import Planet from '../model/Planet';

class PlanetController {
  async store(req, res) {
    // const checkPlanet = await Planet.findOne({})
    const planet = await Planet.create(req.body);
    return res.json(planet);
  }
}

export default new PlanetController();
