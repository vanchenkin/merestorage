import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectProject } from "../../store/context/contextSlice";
import {
    useCreateProjectMutation,
    useGetAllProjectsQuery,
    useRemoveProjectMutation,
} from "../../store/projects/projectsApi";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";

type ProjectSelectProps = {
    style?: CSSProperties;
    size?: SizeType;
    navigateAfterSelect?: boolean;
};

export const ProjectSelect: React.FC<ProjectSelectProps> = ({
    style,
    size,
    navigateAfterSelect,
}) => {
    const dispatch = useAppDispatch();
    const project = useAppSelector((state) => state.context.project);
    const navigate = useNavigate();

    const { data: projects, isLoading: isLoadingAll } =
        useGetAllProjectsQuery();
    const [createProject, { isLoading: isLoadingAdd }] =
        useCreateProjectMutation();
    const [removeProject, { isLoading: isLoadingRemove }] =
        useRemoveProjectMutation();

    const [selectLocked, setSelectLocked] = useState(false);
    const [name, setName] = useState("");

    const handleSelect = (value: number) => {
        if (!selectLocked) {
            dispatch(selectProject(value));
            if (navigateAfterSelect) navigate("/reports");
        }
    };

    const handleCreateProject = () => {
        createProject({ name });
        setName("");
    };

    const options =
        projects?.map((project) => ({
            value: project.id,
            label: project.name,
        })) || [];

    return (
        <>
            <Select
                style={{ minWidth: 220, ...style }}
                size={size || "middle"}
                onChange={handleSelect}
                placeholder="Выберите проект..."
                showSearch
                loading={isLoadingAll || isLoadingAdd || isLoadingRemove}
                value={projects ? project : undefined}
                filterOption={(inputValue, option) =>
                    (option?.label as string)
                        ?.toLowerCase()
                        .includes(inputValue.toLowerCase()) || false
                }
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space style={{ padding: "0 8px 4px" }}>
                            <Input
                                placeholder="Добавить проект"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Button
                                type="text"
                                icon={<PlusOutlined />}
                                disabled={!Boolean(name)}
                                onClick={handleCreateProject}
                            />
                        </Space>
                    </>
                )}
            >
                {options.map((item) => (
                    <Select.Option
                        key={item.value}
                        value={item.value}
                        label={item.label}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>{item.label}</div>
                            {item.value !== project && (
                                <ConfirmModal
                                    message={`Вы уверены что хотите удалить проект ${item.label}?`}
                                    description="Также удалятся все метрики, ресурсы и отчеты привязанные к проекту"
                                    onConfirm={() => removeProject(item.value)}
                                    onOpen={() => {
                                        setSelectLocked(true);
                                    }}
                                    onClose={() => setSelectLocked(false)}
                                >
                                    <CloseCircleFilled />
                                </ConfirmModal>
                            )}
                        </div>
                    </Select.Option>
                ))}
            </Select>
        </>
    );
};
