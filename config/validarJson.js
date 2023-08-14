//sirve para validar el peso del json que envia la solicitus(que viene del frontend)

export const validateJsonSize = (req, res, next) => {
    console.log(req.headers["content-length"] + " bytes");
    if (req.body && JSON.stringify(req.body).length > 200) {
        return res
            .status(413)
            .json({ error: "El JSON excede el tamaño permitido" });
    }
    next();
};