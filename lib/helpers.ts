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



export const convertChapterDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let timeString = '';

    if (hours > 0) {
        timeString += hours + ' saat ';
    }

    if (minutes > 0) {
        timeString += minutes + ' dakika ';
    }

    if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
        timeString += remainingSeconds + ' saniye';
    }

    return timeString.trim();
}

export function convertSecondsToMMSS(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(remainingSeconds).padStart(2, '0');

    return `${minutesString}:${secondsString}`;
}

export function formatJoinDate(date: Date): string {
    const months = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `Katılım: ${months[monthIndex]} ${year}`;
}


export const formatReviewDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('tr-TR', options).format(date);
    return formattedDate;
};


