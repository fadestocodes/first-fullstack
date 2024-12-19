
export const getInitials = (string) => {
    const arrayedName = string.split(' ');
    const firstInitial = arrayedName[0][0].toUpperCase();
    const lastInitial = arrayedName[1][0].toUpperCase();
    return ( `${firstInitial}${lastInitial}` )
}