function isLessThanFiveMinutes(date1, date2) {
    // const time1 = new Date(date1);
    // const time2 = new Date(date2);

    // Get the difference in milliseconds
    const diffMs = Math.abs(date1 - date2);

    // Convert milliseconds to minutes
    const diffMinutes = diffMs / (1000 * 60);

    return diffMinutes < 5;
}

export default isLessThanFiveMinutes