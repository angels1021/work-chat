export const inputStringFromDate = new Intl.DateTimeFormat('en-CA').format

export const formatDateForDisplay = (date?: Date | number, showTime?: boolean) => new Intl.DateTimeFormat(
    'en-GB',
    {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...(showTime ? { hour: "numeric", minute: "numeric" } : {})
    }
).format(date);
