'use strict';

(function(){

class SeatComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

this.seat2=[];
this.seats=[];
this.ss=1;
this.totalprice;
this.time;
this.movietitle;
this.name1;
this.date;
this.selectedseat=[];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }



seat1(seat)
{
  var a=this.s
var b=seat;
var price=this.seats[0].price;


console.log(this.selectedseat);
var color=document.getElementById(seat).getAttribute("style");
var bcolor=document.getElementById(seat).getAttribute("style");

if(this.ss<=a && color!="fill:green" && bcolor!="fill:brown")
{
  document.getElementById(seat).setAttribute("style","fill:green");

this.totalprice=price*this.ss;

this.ss++;
this.selectedseat.push(seat);



}
else if(color=="fill:green")
{
  console.log(seat);
  document.getElementById(seat).setAttribute("style","fill:''");
this.ss--;
this.totalprice=this.totalprice-price;

var data=this.selectedseat.indexOf(seat);
if(data>-1)
{
  this.selectedseat.splice (data,1);
}


}

  else if(a==null)
  {
    alert("please choice number of seats ")
  }
  else if(bcolor=="fill:brown")
  {
    alert("seat already book");
  }
  else{
    alert("all seat selected ")

  }
  sessionStorage.setItem('seat',this.selectedseat);
  sessionStorage.setItem('price',this.totalprice);
}


paymentpage()
{

  window.location = "/payment";
}

$onInit() {


this.time=sessionStorage.getItem('time');
this.movietitle=sessionStorage.getItem('movietitle');
this.date=sessionStorage.getItem('date');
this.name1=sessionStorage.getItem('name');

  this.$http.get('/api/seats')
    .then(response => {
      this.awesomeThings = response.data;
  var s=sessionStorage.getItem("seat");
 for(var a=0;a<=this.awesomeThings.length;a++)
 {
   if(s==this.awesomeThings[a].seatPlan.count)
   {
     this.seats.push(this.awesomeThings[a].seatPlan);

     console.log(this.seats)
   }


 }




      this.socket.syncUpdates('thing', this.awesomeThings);
    });

    this.$http.get('/api/payments')
      .then(response => {
        this.seat2=response.data;
    //    console.log(this.seat2[0].selectedseat);
for(var i=0;i<=response.data.length;i++)
{
        if(this.date==this.seat2[i].showdate && this.time==this.seat2[i].Showtime && this.name1==this.seat2[i].theater)
        {
          var booked=this.seat2[i].selectedseat.toString();
          var d=booked.split(",")

          for(var i=0;i<=d.length;i++)
          {
          document.getElementById(d[i]).setAttribute("style","fill:brown");
          }
        }
}

      });
}}

angular.module('merafilmApp')
  .component('seat', {
    templateUrl: 'app/seat/seat.html',
    controller: SeatComponent,
  //  controllerAs: Seat
  });

})();
