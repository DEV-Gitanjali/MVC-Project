import { body, validationResult } from 'express-validator'; // Import validationResult instead of validateRequest

const validateRequestMiddleware = async (req, res, next) => { // Rename the local function
    
    console.log(req.body);
    // 1. Setup rules for validation
    const rules = [
        body('name')
            .notEmpty()
            .withMessage('Name is required'),

        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price should be a positive value'),

        // body('imageURL')
        //     .isURL()
        //     .withMessage('Invalid URL'),
    ];

    // 2. Run those rules
    await Promise.all(rules.map(rule => rule.run(req)));

    // 3. Check if there are any errors running the rules
    const validationErrors = validationResult(req); // Use validationResult instead of validateRequest
    console.log(validationErrors);

    // 4. If errors, return the error message
    if (!validationErrors.isEmpty()) {
        return res.render('new-product', {
            errorMessage: 
            validationErrors
            .array()[0]
            .msg,  
        });
    }

    next();
};

export default validateRequestMiddleware; // Export the renamed function
