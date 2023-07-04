import * as Yup from 'yup';
import Curso from '../models/Curso';
import Matricula from '../models/Matricula';

class MatriculaController {
  
  async index(req, res) {
    const matriculas = await Matricula.findAll({
      where: { user_id: req.userId },
    });

    return res.json(matriculas);
  }
  
 
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      curso: Yup.string().required(),

    });

    if ((await schema.isValid(req.body))) {
      
      const cursos = await Curso.findAll({
        where: { curso: cursos.curso, status: true },
      });

      if(!cursos){
        return res.status(400).json({ error: 'Falha ao cadastrar. ' });
      }

      
    }

    const { name, email, curso } = req.body;

    const matriculas = await Matricula.create({
      user_id: req.userId,
      name,
      email,
      curso,
      where: { user_id: req.userId },
    });

    return res.json(tasks);
  }

  async update(req, res) {
    const { matricula_id } = req.params;

    const matricula = await Matricula.findByPk(matricula_id);

    if (!matricula) {
      return res.status(400).json({ error: 'Matricula não encontrada.' });
    }

    await matricula.update(req.body);

    return res.json(matricula);
  }

  async delete(req, res) {
    const { matricula_id } = req.params;

    const matricula = await Matricula.findByPk(matricula_id);

    if (!matricula) {
      return res.status(400).json({ error: 'Matricula não encontrada.' });
    }

    await matricula.destroy();
    return res.send();
  }
}

export default new MatriculaController();