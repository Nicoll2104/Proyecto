import Pedido from "../models/pedido.js";
import Usuario from "../models/usuario.js";
import Destino from "../models/destino.js";

const httpPedido = {
    getPedido: async (req, res) => {
        try {
            const pedidos = await Pedido.find().populate('instructor_encargado').populate('destino');
            res.json(pedidos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getPedidoId: async (req, res) => {
        const { id } = req.params;
        try {
            const pedidos = await Pedido.findById(id).populate('instructor_encargado').populate('destino');
            if (!pedidos) {
                return res.status(404).json({ mensaje: 'Pedido no encontrado' });
            }
            res.json(pedidos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    postPedido: async (req, res) => {
        try {
            const { fecha_creacion, fecha_entrega, completado, instructor_encargado, destino, total } = req.body;
            const pedidos = new Pedido({ fecha_creacion, fecha_entrega, completado, instructor_encargado, destino, total });

            await pedidos.save();

            const rinst_encar = await Usuario.findById(instructor_encargado);
            const rdestino = await Destino.findById(destino);

            pedidos.instructor_encargado = rinst_encar;
            pedidos.destino = rdestino;

            res.status(201).json({ mensaje: 'Pedido agregado con éxito', pedidos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putPedido: async (req, res) => {
        const { id } = req.params;
        const { fecha_creacion, fecha_entrega, completado, instructor_encargado, destino, total } = req.body;

        try {
            const pedidos = await Pedido.findByIdAndUpdate(id, { fecha_creacion, fecha_entrega, completado, instructor_encargado, destino, total }, { new: true });
            if (!pedidos) {
                return res.status(404).json({ mensaje: 'Pedido no encontrado' });
            }
            
            await pedidos.save();

            const rinst_encar = await Usuario.findById(instructor_encargado);
            const rdestino = await Destino.findById(destino);

            pedidos.instructor_encargado = rinst_encar;
            pedidos.destino = rdestino;
            
            res.json({ mensaje: 'Pedido actualizado con éxito', pedidos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deletePedido: async (req, res) => {
        try {
            const { id } = req.params;
            const pedido = await Pedido.findByIdAndDelete(id);

            if (!pedido) {
                return res.status(404).json({ mensaje: 'Pedido no encontrado' });
            }
            res.json({ mensaje: 'Pedido eliminado con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const pedido = await Pedido.findByIdAndUpdate(id, { status: 0 }, { new: true }).populate('instructor_encargado').populate('destino');
            res.json({ pedido });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Se produjo un error' });
        }
    },

    putActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const pedido = await Pedido.findByIdAndUpdate(id, { status: 1 }, { new: true }).populate('instructor_encargado').populate('destino');
            res.json({ pedido });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Se produjo un error' });
        }
    },
};

export default httpPedido;
