'use strict';

(function(){

class PaymentComponent {
  constructor() {
    this.message = 'Hello';
    this.year=[];
this.movietitle;
this.time;
this.date;
this.theartername
this.state;
this.seat=[];
this.price;
this.v=0;
this.vat;
this.totalbill;
this.bookingfee=25;
this.s_tax=14;
this.sbharat=0.5;
this.krishi=0.5;
  }

totalpayablebill()
{
if(this.v==0)
{
  this.v++
}
else
{

    this.v--;


}}

 //  var t_bill=this.price;
 //   if(this.v==1)
 //   {
 //     var vat=15;
 //   this.vat=this.price*vat/100;
 // this.totalbill=this.price+this.vat;






 $onInit()
{

  var d=new Date();
  var y=d.getFullYear();

    for(var i=0;i<=10;i++)
  {
    var year=y+i;
    this.year.push(year);
  }


//session getting

  this.time=sessionStorage.getItem('time');
   this.movietitle=sessionStorage.getItem('movietitle');
   this.date=sessionStorage.getItem('date');
   this.theartername=sessionStorage.getItem('name');
   this.state=sessionStorage.getItem('state');
   this.seat.push(sessionStorage.getItem('seat'));
   this.price=sessionStorage.getItem('price');


   var t_bill=parseFloat(this.price);
   this.s_tax=parseFloat(t_bill*parseFloat(this.s_tax)/100);
   this.sbharat=parseFloat(t_bill*parseFloat(this.sbharat)/100);
   this.krishi=parseFloat(t_bill*parseFloat(this.krishi)/100);

  //vat=parseFloat(t_bill*vat/100);

 this.totalbill=parseFloat(t_bill+this.s_tax+this.sbharat+this.krishi);
 console.log(this.totalbill);


}


}

angular.module('merafilmApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    //controllerAs: Payment
  });

})();
