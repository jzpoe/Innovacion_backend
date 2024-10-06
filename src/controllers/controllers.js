import novedadModel from "../model/model.js";

const novedades = {
  async create(req, res) {
    try {
      const createNovedad = new novedadModel({
        compras: req.body.compras,
        provedores: req.body.provedores,
        empleado: req.body.empleado,
        arriendo: req.body.arriendo,
        gastos: req.body.gastos,
        transporte: req.body.transporte,
        ganancia: req.body.ganancia,
        fecha: req.body.fecha
      });

      const saveNovedad = await createNovedad.save();
      res.status(201).json(saveNovedad);
    } catch (error) {
      res.status(500).json({ message: "Error al agregar la novedad", error });
    }
  },

  async novedadeGet(req, res) {
    try {
      const datos = await novedadModel.find();
      res.status(200).json(datos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los datos", error });

    }
  },

  async  filtradosGet(req, res) {
    const { filterFront } = req.query;
  
    try {
      // Si no hay filtro, retorna todas las novedades
      if (!filterFront || filterFront.trim() === "") {
        const todasNovedades = await novedadModel.find({});
        return res.json(todasNovedades);
      }
  
      // Realiza la búsqueda en los campos especificados (usa una expresión regular para búsqueda flexible)
      const novedadesFiltradas = await novedadModel.find({
        $or: [
          { compras: { $regex: filterFront, $options: "i" } },
          { proveedores: { $regex: filterFront, $options: "i" } },
          { empleado: { $regex: filterFront, $options: "i" } },
          { arriendo: { $regex: filterFront, $options: "i" } },
          { gastos: { $regex: filterFront, $options: "i" } },
          { transporte: { $regex: filterFront, $options: "i" } },
          { ganancia: { $regex: filterFront, $options: "i" } }
        ]
      });
  
      res.json(novedadesFiltradas);
  
    } catch (error) {
      console.error('Error al filtrar novedades:', error);
      res.status(500).json({ error: 'Error al filtrar novedades' });
    }
  }
};

export default novedades;
