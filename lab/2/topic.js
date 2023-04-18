let topic = ["尚未開學", "國定假日", "環境準備", "隨機性", "重複性"];

var startDate = new Date(); 
function setMonthAndDay(startMonth, startDay){
    //一次設定好月份與日期
    startDate.setMonth(startMonth-1,startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

// $("#submit").on("click",function(){
//     let firstDate=$("#firstDate").val()

//     console.log(firstDate)
//     firstDate=new Date(firstDate)
//     setMonthAndDay(firstDate.getMonth()+1,firstDate.getDate())
// })

//setMonthAndDay(4,1);
