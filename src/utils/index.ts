
/**
 * Capitalize the first letter of a string
 * @param {string | undefined} str String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str: string | undefined): string => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};
