import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

import { parseExpression } from "cron-parser";

@ValidatorConstraint({ name: "cron", async: false })
export class CronValidator implements ValidatorConstraintInterface {
    validate(text: string) {
        try {
            parseExpression(text);

            return true;
        } catch (e) {
            return false;
        }
    }

    defaultMessage() {
        return "Cron timestamp is invalid.";
    }
}
