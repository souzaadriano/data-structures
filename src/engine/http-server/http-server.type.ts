export const abc = {}
declare global {
    namespace Express {
        interface Request {
        input: any;
        }
    }
}