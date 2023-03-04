import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { validatePostgresConnectionString } from "../../../../../common/validators/validatePostgresConnectionString";

@ValidatorConstraint({ name: "postgres", async: false })
export class IsPostgresString implements ValidatorConstraintInterface {
    validate(text: string) {
        return validatePostgresConnectionString(text);
    }

    defaultMessage() {
        return "Postgres connection string is invalid.";
    }
}
