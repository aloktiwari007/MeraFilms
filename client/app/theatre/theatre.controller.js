'use strict';

(function(){

class TheatreComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];
    this.omdbi=[];


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }


 $onInit() {
    this.$http.get('/api/theatres')
      .then(response => {
        this.awesomeThings =response.data;

//this.awesomeThings=JSON.stringify(this.awesomeThings));

     //window.alert(JSON.stringify(this.awesomeThings));
        this.socket.syncUpdates('thing', this.awesomeThings);

      });
  }

updatetheater(theater)
{

//var seat1=document.getElementById('useat').value;
//console.log(theater._id);
//var seat=theater.useat;
if(theater.seat==80 || theater.seat==100 ||theater.seat==130 )
{


  this.$http.put( '/api/theatres/'+theater._id ,JSON.stringify(theater));



  }
  else {
  alert('wrong seat entry please enter 80 or 100 0r 130 ');
  }
}

deletetheater(theater)
{
    this.$http.delete('/api/theatres/' + theater._id);

}


  getdata(){


    this.$http.get('http://www.omdbapi.com/?t='+this.t+'&y='+this.y)
      .then(response => {

        this.omdbi =response.data;


        if(this.omdbi.Poster==null)
        {
alert("no data found")

        }


        this.socket.syncUpdates('thing', this.omdbi);

      });
      }




  addThing() {

      this.$http.post('/api/theatres', {

        state:this.state,
        location:this.location1,
        seat:this.seat




      });
window.alert("data inserted");
this.state="";
this.location1="";
this.seat="";
      this.newThing = '';
    }



  //   update(thearupdate)
  //   {
  //
  //       this.$http.put('/api/theatres/'+ '578cf866677c5b84183f730d', {
  //         countery:this.country,
  //         state:[{
  //           s_name:this.state,
  //         city:[{
  //         c_name:this.city,
  //         address:this.address,
  //       }],
  //
  //         }],
  //
  //       });
  // window.alert("data updated");
  //       this.newThing = '';
  //     }}

}


angular.module('merafilmApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
  //  controllerAs: Omdbi
  });

})();
