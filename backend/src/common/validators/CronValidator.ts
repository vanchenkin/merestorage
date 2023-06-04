import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

import { parseExpression } from "cron-parser";

/**
 * Валидирует CRON
 */
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
        return "Cron строка не валидна.";
    }
}
