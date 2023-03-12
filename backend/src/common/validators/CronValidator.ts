import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { CronTime } from "cron";

@ValidatorConstraint({ name: "cron", async: false })
export class CronValidator implements ValidatorConstraintInterface {
    validate(text: string) {
        try {
            new CronTime(text);

            return true;
        } catch (e) {
            return false;
        }
    }

    defaultMessage() {
        return "Cron timestamp is invalid.";
    }
}
