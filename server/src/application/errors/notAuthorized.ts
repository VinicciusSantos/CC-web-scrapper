import GenericError from "./genericError";

export default class NotAuthorizedError extends GenericError {
  constructor() {
    super("Not Authorized, please Login!", 401);
  }
}
