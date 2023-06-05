import { ApplicationError } from "@/protocols/error.protocols";

export function unauthorizedError(): Omit<ApplicationError, "email"> {
  return {
    name: 'UnauthorizedError',
    message: 'You must be signed in to continue',
  };
}
