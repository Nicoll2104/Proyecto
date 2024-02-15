import Ficha from "../models/ficha.js";

const helpersFicha = {
    validarDiferenciaFechas: async ({ fecha_inicio, fecha_fin }) => {
        try {
            // Buscar la ficha en la base de datos
            const ficha = await Ficha.findOne({ fecha_inicio, fecha_fin });
            
            // Verificar si la ficha existe
            if (!ficha) {
                throw new Error('La ficha no existe');
            }
            
            // Calcular la diferencia en meses
            const diffFechas = Math.abs(fecha_fin.getMonth() - fecha_inicio.getMonth()) + 12 * (fecha_fin.getFullYear() - fecha_inicio.getFullYear());

            // Verificar si la diferencia es menor a seis meses
            if (diffFechas < 6) {
                throw new Error('La diferencia entre la fecha de inicio y la fecha de fin debe ser de al menos 6 meses');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default helpersFicha;

