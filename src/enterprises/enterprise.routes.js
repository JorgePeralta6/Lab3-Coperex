import { Router } from "express";
import { check } from "express-validator";
import { saveEmpresa, getEmpresa, updateEmpresa, deleteEmpresa, listAZ, listZA } from "./enterprise.controller.js";
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

export default router;