import { validationResult } from "express-validator"

const validarcampos = async (req, res, next) => {
    const errors = validationResult(req);
if(! errors.isEmpty()){

    if (req.codeError) {
        return res.status(req.codeError).json({ error: errors });
    }

    return res.status(400).json({ error: errors.errors[0].msg });
}

next();
}
export {validarcampos} 