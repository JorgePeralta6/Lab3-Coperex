import Excel from 'excel4node';
import Enterprise from "./enterprise.model.js";
import path from 'path';
import fs from 'fs';

const filePath = path.resolve('empresas.xlsx');

export const generarExcel = async (req, res) => {
    try {
        const enterprises = await Enterprise.find({ status: true });

        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet('Empresas');

        const headers = ['nameE', 'nivelImpacto', 'añosT', 'category', 'contacts'];
        headers.forEach((header, i) => ws.cell(1, i + 1).string(header));

        ws.column(1).setWidth(30); // nameE
        ws.column(2).setWidth(25); // nivelImpacto
        ws.column(3).setWidth(15); // añosT
        ws.column(4).setWidth(20); // category
        ws.column(5).setWidth(50); // contacts
        
        enterprises.forEach((enterprise, index) => {
            const row = index + 2;
            ws.cell(row, 1).string(enterprise.nameE);
            ws.cell(row, 2).string(enterprise.nivelImpacto);
            ws.cell(row, 3).number(enterprise.añosT);
            ws.cell(row, 4).string(enterprise.category);
            ws.cell(row, 5).string(enterprise.contacts.join(', '));
        });

        wb.write(filePath, (err) => {
            if (err) {
                return res.status(500).json({ success: false, msg: "Error al guardar el archivo Excel", error: err });
            }

            res.json({ success: true, msg: "Archivo Excel actualizado correctamente", path: filePath });
        });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Error al generar el archivo Excel", error: error.message });
    }
};

/*export const descargarExcel = async (req, res) => {
    const filePath = path.resolve('empresas.xlsx');

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, msg: "El archivo Excel no existe" });
    }

    res.download(filePath, 'empresas.xlsx');
};*/
