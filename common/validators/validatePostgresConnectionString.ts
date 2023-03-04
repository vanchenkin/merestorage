export const validatePostgresConnectionString = (url: string): boolean => {
    const pattern =
        /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/;
    return pattern.test(url);
};
