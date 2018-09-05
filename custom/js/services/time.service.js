class TimeService{

  static formatToday() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
  
    let mon = month < 10 ? `0${month}` : month;
    let d = day < 10 ? `0${day}` : day;
    
    return `${mon}/${d}/${year}`;
  }

  static changeFormatDateTime(time){
    let arr = time.split('/');
    let y = arr[2];
    let d = arr[1];
    let m = arr[0];
    return `${y}-${m}-${d}`;
  }

  static getCurrentDate(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    return { year, month, day };
  }
  
  static getYesterday(){
    let timestampe = Date.now();
    let yesterdayTimeStamp = timestampe - (1000*60*60*24);
    let yesterday = new Date(yesterdayTimeStamp);
    let year = yesterday.getFullYear();
    let month = yesterday.getMonth();
    let day = yesterday.getDate();
    return { year, month, day };
  }
  
  static getPreviousMonth(){
    let timestampe = Date.now();
    let prevMonthTimeStamp = timestampe - (1000*60*60*24*30);
    let prevMonth = new Date(prevMonthTimeStamp);
    let year = prevMonth.getFullYear();
    let month = prevMonth.getMonth();
    let day = prevMonth.getDate();
    return { year, month, day };
  }

  static getTomorrow(){
    let timestamp = Date.now();
    let tomorrowTimestamp = timestamp + (1000*60*60*24);
    let tomorrow = new Date(tomorrowTimestamp);
    let year = tomorrow.getFullYear();
    let month = tomorrow.getMonth();
    let day = tomorrow.getDate();
    return { year, month, day };
  }
  
  static getCurrentDateTime(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    return { year, month, day, hour, min, sec };
  }

  static getWeek( d ) { 

    // Create a copy of this date object  
    var target = new Date(d.valueOf());  
    
    // ISO week date weeks start on monday  
    // so correct the day number  
    var dayNr = (d.getDay() + 6) % 7;  
  
    // Set the target to the thursday of this week so the  
    // target date is in the right year  
    target.setDate(target.getDate() - dayNr + 3);  
  
    // ISO 8601 states that week 1 is the week  
    // with january 4th in it  
    var jan4 = new Date(target.getFullYear(), 0, 4);  
  
    // Number of days between target date and january 4th  
    var dayDiff = (target - jan4) / 86400000;    
  
    // Calculate week number: Week 1 (january 4th) plus the    
    // number of weeks between target date and january 4th    
    if(new Date(target.getFullYear(), 0, 1).getDay() < 5) {
      // Calculate week number: Week 1 (january 4th) plus the    
      // number of weeks between target date and january 4th    
      return 1 + Math.ceil(dayDiff / 7);    
    }
    else {  // jan 4th is on the next week (so next week is week 1)
      return Math.ceil(dayDiff / 7); 
    }
    
  }
  
  // Returns the ISO week of the date.
  static getWeek() {
    var date = new Date(Date.now());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  
  static weekOfYear(date){
    var d = new Date(+date);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
  };

}