export const formatCategoryNameToUrl = (name: String) => {
    // türkçeden ingilizceye
    const turkishToEnglish = (str: String) => {
        return str
            .replaceAll(/ğ/g, 'g')
            .replaceAll(/Ğ/g, 'g')
            .replaceAll(/ü/g, 'u')
            .replaceAll(/Ü/g, 'u')
            .replaceAll(/ş/g, 's')
            .replaceAll(/Ş/g, 's')
            .replaceAll(/ı/g, 'i')
            .replaceAll(/İ/g, 'i')
            .replaceAll(/ö/g, 'o')
            .replaceAll(/Ö/g, 'o')
            .replaceAll(/ç/g, 'c')
            .replaceAll(/Ç/g, 'c')
            .replaceAll(/ /g, '-')
    };
    const formattedName = turkishToEnglish(name).toLowerCase();
    return formattedName;
};