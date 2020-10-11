export const personOfTheWeek = 'person-of-the-week';
export const wordOfTheWeek = 'word-of-the-week';
export const bookOfTheWeek = 'book-of-the-week';

const options = {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }

const formatter = new Intl.DateTimeFormat([], options);

export {formatter}