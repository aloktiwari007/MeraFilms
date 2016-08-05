'use strict';

(function(){

class InfoComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];
    this.newUniquestate=[];
    this.city=[];
    this.date=[];
    this.time=[];
    this.location1=[];
    this.name=[];
    this.state={};
    this.totaltime={};
    this.trailer={};
    this.seat;
this.d=0;
this.t=0;
this.tl=0;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

seatselect(name)
{

for(var a=0;a<this.city.length;a++)
{


if(this.city[a].location==name)
{
    this.seat=this.city[a].seat;
}


}
sessionStorage.setItem('seat', this.seat);
  sessionStorage.setItem('name', name);
  //console.log(name)
  window.location = "/seat";
}



vi()
{
  var a=this.awesomeThings.title;
  console.log(a);

  this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=PK&key=AIzaSyBda0gaY5pCnTsRz7rHNaDdRxQl-uIB03E')
    .then(response => {

      console.log(response.data.items[0].id.videoId);
//https://www.youtube.com/watch?v=82ZEDGPCkT8
});


}



  gettlocation(time)
  {
sessionStorage.setItem('time', time);

    var uniquename={};
    for(var i=0;i<=this.city.length;i++)
    {

     var a=this.city[i].start_time;

        var c=this.city[i].state;



      if(time==a && this.state==c)
      {

        uniquename[this.city[i].location]=this.city[i].location;

        var uname=[];


        for (var key in uniquename) {
        if (uniquename.hasOwnProperty(key)) {

        uname.push( uniquename[key] );

        }
        }

        this.name = uname;
        this.tl=1;

      }


  }


  }




gettime(date1)
{
sessionStorage.setItem('date', date1);

  var uniquetime={};
  for(var i=0;i<=this.city.length;i++)
  {
var a=this.city[i].date;
var b=this.city[i].state;


    if(date1==a && this.state==b)
    {

      uniquetime[this.city[i].start_time]=this.city[i].start_time;

      var utime=[];


      for (var key in uniquetime) {
      if (uniquetime.hasOwnProperty(key)) {

      utime.push( uniquetime[key] );

      }
      }

      this.time = utime;
this.t=1;
    }


}
}


getdate(state)
{
sessionStorage.setItem('state', state);
this.state=state;
console.log(this.city);
var uniquedate={};
for(var i=0;i<=this.city.length;i++)
{
   var a=this.city[i].state;
   console.log("stae name"+a);
  if(state==a)
  {
    // this.date.push(this.city[i].date);
    // this.location1.push(this.city[i].location);
    uniquedate[this.city[i].date]=this.city[i].date;

    var udate=[];


    for (var key in uniquedate) {
    if (uniquedate.hasOwnProperty(key)) {
    // console.log("ggh"+uniquedate[key]);
    udate.push( uniquedate[key] );
    console.log("ggh"+udate);
    }
    }

    this.date = udate;
    this.d=1;

  }


}















}


$onInit()
{

  var b=sessionStorage.getItem('movietitle');

  console.log("movie name"+b);
  this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+b+'trailer'+'&key=AIzaSyBda0gaY5pCnTsRz7rHNaDdRxQl-uIB03E')
    .then(response => {

var trailer_id=response.data.items[0].id.videoId;
console.log("trailer_id"+trailer_id);
var trailer="https://www.youtube.com/embed/"+trailer_id;


document.getElementById('player').setAttribute("src",trailer);


});


      this.$http.get('/api/omdbiendpoints/'+b)
        .then(response => {

          this.awesomeThings =response.data;

//convert min into hour.

              var t =this.awesomeThings[0].duration;

              var time=t.replace('min','');
              var t_hr=Math.floor(time/60);
              var t_min=time%60*1;

//convert if t_min(minuit) is greater then 59
            if(t_min>59)
            {

            var tmh=Math.floor(t_min/60);
            var tmm=t_min % 60*1;

this.totaltime=tmh+" "+"hr"+" "+tmm+" "+"min";


          }
          else {
            this.totaltime=t_hr+" "+"hr"+" "+t_min+" "+"min";

          }

          this.socket.syncUpdates('thing', this.awesomeThings);

        });


//fetch thearter record



this.$http.get('/api/theraterallocates/'+b )
  .then(response => {

    this.city =response.data;



        var uniquestate = {};


        console.log(response.data);

        for(var i = 0; i< response.data.length; i++)
        {

        if(uniquestate[(""+response.data[i].state).toLowerCase()] == undefined){
          // uniqueObj.push(data[i])
          uniquestate[(""+response.data[i].state).toLowerCase()] = (""+response.data[i].state);
        }
        }
        //


        var newUniquestate = [];

        for (var key in uniquestate) {
        if (uniquestate.hasOwnProperty(key)) {

        newUniquestate.push( uniquestate[key] );
        }
        }

        this.newUniquestate = newUniquestate;
//console.log(this.newUniquestate);







  });





this.socket.syncUpdates('city', this.newUniquestate);

}}

angular.module('merafilmApp')
  .component('info', {
    templateUrl: 'app/info/info.html',
    controller: InfoComponent,
  //  controllerAs: Info
  });

})();
