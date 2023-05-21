import { Global, Module } from "@nestjs/common";
import { MetricsModule } from "../../../routes/metrics/metrics.module";
import { OhmService } from "./ohm.service";

@Global()
@Module({
    providers: [OhmService],
    exports: [OhmService],
    imports: [MetricsModule],
})
export class OhmModule {}
