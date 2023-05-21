import { notification } from "antd";
import { Config } from "../../config";

export const fetchBase = (url: string, options?: RequestInit) => {
    return fetch(Config.ApiUrl + url, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    })
        .then((res) => res.text())
        .then((res) => (res ? JSON.parse(res) : res))
        .catch(() => {
            notification.error({
                message: "Что-то пошло не так",
            });
        });
};
