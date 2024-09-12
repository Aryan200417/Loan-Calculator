
const ca=document.querySelector("#cal");
let cemi=document.querySelector("#cemi");
let cint=document.querySelector("#cint");
let cpay=document.querySelector("#cpay");
let b1=document.querySelector("#b1");
let b2=document.querySelector("#b2");
let chart=document.querySelector("#mychart");
let new_te;
let emi;
let int;
let total;
let pla;
let ti;
var chartInstance = null;

let am=document.querySelector("#amount");
let ra=document.querySelector("#rate");
let te=document.querySelector("#tenure");
let la=document.querySelector("#loan-amount");
let lar=document.querySelector("#int-rate");
let lat=document.querySelector("#ten");



la.addEventListener("input",(event)=>{
   am.value=la.value;    
});
am.addEventListener("input",(event)=>{
   la.value=am.value;
});

lar.addEventListener("input",(event)=>{
    ra.value=lar.value;    
 });
 ra.addEventListener("input",(event)=>{
    lar.value=ra.value;
 });

 lat.addEventListener("input",(event)=>{
    te.value=lat.value;    
 });
 te.addEventListener("input",(event)=>{
    lat.value=te.value;
 });

b1.addEventListener("click",(event)=>{
    event.preventDefault();
    b1.style.backgroundColor = 'pink';
    b2.style.backgroundColor = 'white';
    let te=document.querySelector("#tenure").value;
    new_te=te*12;// monthly interest rate,divide by 100 so that it changes from percentage to decimal
});

b2.addEventListener("click",(event)=>{
    event.preventDefault();
    b2.style.backgroundColor = 'pink';
    b1.style.backgroundColor = 'white';
    let te=document.querySelector("#tenure").value;
    new_te=te;
});

function EMI(amount,rate,tenure){
    let num=(amount*rate*(1+rate)**tenure);
    let denum=((1+rate)**tenure)-1;
    let emi=num/denum;
    return emi;
    
}
function interest(emi,tenure,amount){
    let int=(emi*tenure)-amount;
    return int;
}
function Total(emi,tenure){
    let t=(emi*tenure);
    return t;
}



ca.addEventListener("click",(event)=>{
    event.preventDefault();
    let am=document.querySelector("#amount").value;
    let ra=document.querySelector("#rate").value;
    let te=document.querySelector("#tenure").value;
   
    ra=ra/(12*100);// monthly interest rate,divide by 100 so that it changes from percentage to decimal
    te=new_te;//upadated value of tenure depending on chosing months or years as tenure
    emi=EMI(am,ra,te);
    let emi2=Math.floor(emi);
    const formatter = new Intl.NumberFormat('en-IN');
    emi2 = formatter.format(emi2);
    cemi.innerText=`${emi2}`;
    int=interest(emi,te,am)
   let n_int=Math.floor(int);
    n_int = formatter.format(n_int);
    cint.innerText=`${n_int}`;
    total=Total(emi,te);
   let n_total=Math.floor(total);
   n_total = formatter.format(n_total);
    cpay.innerText=`${n_total}`;

    ti=(int/total)*100;
    ti=Math.round(ti*100)/100;
    console.log("TI is",ti);
    pla=(am/total)*100;
    pla= Math.round(pla*100)/100;
    console.log("PLA is",pla);
    //pi chart calculations

    var xValues = ["Principle Loan Amount","Total Interest"];
    var yValues = [pla,ti];
    var barColors = [
      "#b91d47",
      "#00aba9",
    ];
    
    if (chartInstance) {
        // Destroy the existing chart instance before creating a new one
        chartInstance.destroy();
    }

    // Create a new chart instance
    chartInstance = new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
          title: {
            display: true,
          },
        },
      
      });
    
   
});









