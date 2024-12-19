
export const formatKebab = (input) => {
    return input
    .replace(/-/g, ' ') // Replace all '-' with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}