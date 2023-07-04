import * as Yup from 'yup';
import Curso from '../models/Curso';

class CursoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      curso: Yup.string().required(),
      status: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const cursoExists = await Curso.findOne({
      where: { curso: req.body.curso },
    });

    if (cursoExists) {
      return res.status(400).json({ error: 'Curso já cadastrado.' });
    }

    const { id, curso, status } = await Curso.create(req.body);

    return res.json({
      id,
      curso,
      status,
    });
  }
  
}

export default new CursoController();