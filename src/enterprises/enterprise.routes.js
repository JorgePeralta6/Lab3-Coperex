import { Router } from "express";
import { check } from "express-validator";
import { saveEmpresa, getEmpresa, updateEmpresa, deleteEmpresa, listAZ, listZA, listCategoria, listAnios } from "./enterprise.controller.js";
import { generarExcel, /*descargarExcel*/ } from "./enterprise.excel.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existeEnterprise } from "../helpers/db-validator.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarAdminRole } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        validarAdminRole,
        validarCampos
    ],
    saveEmpresa
)

router.get("/", getEmpresa)

router.delete(
    "/:id",
    [
        validarJWT,
        validarAdminRole,
        check("id").custom(existeEnterprise),
        validarCampos
    ],
    deleteEmpresa
)

router.put(
    "/:id",
    [
        validarJWT,
        validarAdminRole,
        check("id").custom(existeEnterprise),
        validarCampos
    ],
    updateEmpresa
)

router.get(
    "/empresaAZ",
    listAZ
)

router.get(
    "/empresaZA",
    listZA
)

router.get(
    "/empresaCategoria",
    listCategoria
)

router.get(
    "/empresaAnios",
    listAnios
)

router.get(
    "/excel", 
    generarExcel
)

/*router.get(
    "/dexcel",
    descargarExcel
)*/

export default router;