const { check, validationResult } = require("express-validator");

const doLoginValidators = [
  check("username")
    .isLength({
      min: 1,
    })
    .withMessage("Mobile number or email is require"),
  check("password").isLength({ min: 2 }).withMessage("Password is require"),
];

const doLoginValidationHandler=function(req,res,next){
    const errors=validationResult(req)
    const mappedError=errors.mapped()
    if(Object.keys(mappedError).length===0){
        next()
    }else{
        res.render('inbox',{
            data:{
                username:req.body.username,
            },
            errors:mappedError
        })
    }
}
module.exports = {
    doLoginValidators,
    doLoginValidationHandler
};
