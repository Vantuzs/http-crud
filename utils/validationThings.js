const yup = require('yup');
/* 

При создании штуки:
1. Bodу не должен быть путсым
2. Body имеет длину от 3х до 100 символов

*/


const ThingSchema = yup.object({
    body: yup.string().required().min(3).max(100)
});

module.exports.validateThing = async (req,res,next) => {
    const {body} = req
    
    try {
        const validatedObject = await ThingSchema.validate(body);

        if(validatedObject){
            next();
        }
    } catch (error) {
        next(error)
    }
}