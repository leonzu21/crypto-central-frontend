export const GetCurrentDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
  
    return {
      currDate: `${year}${separator}${
        month < 10 ? `0${month}` : `${month}`
      }${separator}${date < 10 ? `0${date}` : `${date}`}`,
      day: date < 10 ? `0${date}` : `${date}`,
      month: month < 10 ? `0${month}` : `${month}`,
      year: year,
    };
  };