$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>")


    $("#submit").on("click",function(){
        let firstDate=$("#firstDate").val()
    
        console.log(firstDate)
        firstDate=new Date(firstDate)
        setMonthAndDay(firstDate.getMonth()+1,firstDate.getDate())

        let topicCount=topic.length

    let millisecsPerDay=24*60*60*1000
    const options={month:'numeric',day:'numeric'}
    for(let i=0;i<topicCount;++i){
        if(i%2==0){
            $("#courseTable").append(
                '<tr style="background-color:red">'+
                `<td>${i+1}</td>`+
                `<td>${(new Date(startDate.getTime()+7*i*millisecsPerDay)).toLocaleDateString('zh-TW',options)}</td>`+
                `<td>${topic[i]}</td>`+
                "</tr>"
            )
        }else{
            $("#courseTable").append(
                '<tr style="background-color:blue">'+
                `<td>${i+1}</td>`+
                `<td>${(new Date(startDate.getTime()+7*i*millisecsPerDay)).toLocaleDateString('zh-TW',options)}</td>`+
                `<td>${topic[i]}</td>`+
                "</tr>"
            )
        }
        
    }
    })
    
})

