import React from "react";
import { ReactNode } from "react";
import { ResourceType } from "../../../../../../common/types/ResourceType";
import { SageQueryForm } from "../queryForms/SageQueryForm";
import { SimpleQueryForm } from "../queryForms/SimpleQueryForm";

export const MetricComponentMapper: Record<ResourceType, ReactNode> = {
    [ResourceType.Cassandra]: <SimpleQueryForm />,
    [ResourceType.Postgres]: <SimpleQueryForm />,
    [ResourceType.Sage]: <SageQueryForm />,
};
