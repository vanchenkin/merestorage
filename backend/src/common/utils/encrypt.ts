import { createCipheriv } from "crypto";

/**
 * Зашифровывает c помощью AES
 */
export const encrypt = (data: unknown): string => {
    const cipher = createCipheriv(
        "aes-256-cbc",
        process.env.SECRET_KEY || "",
        process.env.INIT_VECTOR || ""
    );

    let encrypted = cipher.update(JSON.stringify(data), "utf-8", "hex");

    encrypted += cipher.final("hex");

    return encrypted;
};
