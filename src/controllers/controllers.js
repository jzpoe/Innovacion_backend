import mongoose from "mongoose";
import novedadModel from "../model/model.js";

const novedades = {
  async create(req, res) {
    try {
      const createNovedad = new novedadModel({
        nombre: req.body.nombre,
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
          { nombre: { $regex: filterFront, $options: "i" } },
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
  },

  async deleteNovedad(req, res) {
    const { id } = req.params;
  
    try {
      // Verificar si el ID es válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Formato de ID inválido' });
      }
  
      // Convertir el ID a ObjectId
      const objectId = new mongoose.Types.ObjectId(id);
  
      // Eliminar el documento por ID
      const eliminarNovedad = await novedadModel.findByIdAndDelete(objectId);
  
      // Verificar si el documento existía
      if (!eliminarNovedad) {
        return res.status(404).json({ message: 'Elemento no encontrado' });
      }
  
      // Responder con éxito
      return res.status(200).json({ message: 'Elemento eliminado correctamente' });
    } catch (error) {
      console.error("Error en el servidor:", error);  // Registrar el error en la consola para depuración
      return res.status(500).json({ message: 'Error en el servidor', error: error.message || error });
    }
  }
};

export default novedades;
