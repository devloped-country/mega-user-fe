export class DateFormat {
  static formatYYYYMMDD(timeStampDate) {
    const newDate = new Date(timeStampDate);

    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const twoDigitDate = date < 10 ? '0' + date : date;

    return `${year}-${month}-${twoDigitDate}`;
  }
}
