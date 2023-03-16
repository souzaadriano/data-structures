import { inputValidatorMiddleware } from "../../middlewares/input-validator/input-validator.middleware";
import { InputExampleSchema } from "./schema/input-example.schema";


export const inputExampleValidator = inputValidatorMiddleware(InputExampleSchema);
