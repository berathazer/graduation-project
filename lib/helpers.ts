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


export const formatProductPrice = (price: number) => {
    if (Number.isInteger(price)) {

        const formattedPrice = `${price}.00 TL`;
        return `${formattedPrice}`;
    } else if (typeof price === 'number') {

        const formattedPrice = price.toFixed(2);
        return `${formattedPrice} TL`;
    } else {

        return 'Geçersiz Fiyat';
    }
};



