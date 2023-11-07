export const formatCategoryNameToUrl = (title: String) => {
    const cleanedTitle = title
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');


    const url = cleanedTitle.toLowerCase();

    const uniqueSuffix = Math.random().toString(36).substring(2);

    return `${url}_${uniqueSuffix}`;

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



