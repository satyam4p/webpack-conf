
onmessage = (message)=>{
  console.log("messagebody:: ",message.data);
  if(message.data?.number){
    let dataObj = message.data;
    let num = message.data.number;
    let sum = 0;
    for(let i=0;i<num;i++){
      sum = sum + i;
    }
    console.log("sum is:: ",sum);
    dataObj['newNumber'] = 6785324
    dataObj['finalSum'] = sum;
    postMessage(dataObj);
  }

}

