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

export const deleteEmpresa = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryToDelete = await Enterprise.findById(id);
        if (!categoryToDelete) {
            return res.status(404).json({
                success: false,
                msg: "Empresa no encontrada"
            });
        }

        const categoriaNew = await Category.findOne({name: "Deportes"})

        await Publication.updateMany({ category: categoryToDelete._id }, { category: categoriaNew._id });

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Categoría eliminada correctamente y publicaciones actualizadas"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar la categoría",
            error: error.message || error
        });
    }
};

export const updateCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const { _id, name, ...data} = req.body;

        const category = await Category.findByIdAndUpdate(id, data, {new: true});

        category.name = name;
        await category.save(); 

        res.status(200).json({
            success: true,
            msg: "Category actualizada exitosamente",
            category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la category",
            error: error.message || error
        })
    }
}