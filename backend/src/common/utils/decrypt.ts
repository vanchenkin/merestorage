import { createDecipheriv } from "crypto";

export const decrypt = (data: string): any => {
    const cipher = createDecipheriv(
        "aes-256-cbc",
        process.env.SECRET_KEY || "",
        process.env.INIT_VECTOR || ""
    );

    let decrypted = cipher.update(data, "hex", "utf-8");

    decrypted += cipher.final("utf-8");

    return JSON.parse(decrypted);
};
