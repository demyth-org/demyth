export const upperFirstCharLowerOthers = (input: string) => {
    const lowercaseString = input.trim().toLowerCase();
    return lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);
};
