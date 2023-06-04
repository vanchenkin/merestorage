// получение timestamp в текущем часовом поясе
export const getLocalTimestamp = (date: number): string => {
    const offset = new Date().getTimezoneOffset() * 60000;
    return new Date(date - offset).toISOString().slice(0, -1);
};
