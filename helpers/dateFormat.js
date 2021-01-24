const ymd = (date_obj)=>{
    const year = date_obj.getFullYear();
    
    const month = ("0"+(date_obj.getMonth() + 1)).slice(-2);
    const date = ("0"+date_obj.getDate()).slice(-2);

    const format = `${year}-${month}-${date}`;

    return format;
}

const changeTimezoneToLk=(date)=> {
    var invdate = new Date(date.toLocaleString('en-US', {
      timeZone: "Asia/Colombo"
    }));
    var diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff); 
  
  }

module.exports = {
    ymd:ymd,
    changeTimezoneToLk:changeTimezoneToLk,
}