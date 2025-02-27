import Enterprise from "./enterprise.model.js";

export const saveEmpresa = async(req, res) => {
    try{
        const data = req.body;

        const enterprise = new Enterprise({
            nameE: data.nameE,
        })

        await enterprise.save();

        res.status(200).json({
            success: true,
            enterprise
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            msg: "Error al crear la empresa"
        })

    }
}

export const getEmpresa = async(req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, enterprises] = await Promise.all([
            Enterprise.countDocuments(query),
            Enterprise.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            msg: "Empresa encontrada exitosamente",
            total,
            enterprises
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al obtener la empresa"
        })   
    }

}

export const updateEmpresa = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { _id, ...data } = req.body;

        const enterprise = await Enterprise.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Empresa actualizada',
            enterprise
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la empresa',
            error: error.message
        })
    }
}

export const deleteEmpresa = async (req, res) => {

    const { id } = req.params;

    try {

        await Enterprise.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            msg: 'Empresa eliminada exitosamente'
        });
    } catch (error) {
        console.log("hola")
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar la empresa',
            error
        })
    }
}