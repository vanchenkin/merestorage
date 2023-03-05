import { notification } from "antd";
import { Config } from "../../config";

export const fetchBase = (url: string, options?: RequestInit) => {
    return fetch(Config.ApiUrl + url, options)
        .then((res) => res.json())
        .catch(() => {
            notification.error({
                message: "Что-то пошло не так",
            });
        });
};
