import GenericError from "./genericError";

export default class WrongCredentialsError extends GenericError {
  constructor() {
    super("Wrong Credentials, Please try login again!", 401);
  }
}
