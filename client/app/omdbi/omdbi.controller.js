'use strict';

(function(){

class OmdbiComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }


  $onInit() {
    this.$http.get('http://www.omdbapi.com/?t=fan&y=2016&plot=short&r=json')
      .then(response => {
        this.awesomeThings = response.data;

        this.socket.syncUpdates('thing', this.awesomeThings);

      });
  }


  addThing() {
    if (this.details) {
      this.$http.post('/api/omdbiendpoints', {
        details: this.awesomeThings,
        //description:this.mdesc,
        //time:this.mtime
      });
      //this.newThing = '';
    }
  }

}


angular.module('merafilmApp')
  .component('omdbi', {
    templateUrl: 'app/omdbi/omdbi.html',
    controller: OmdbiComponent,
  //  controllerAs: Omdbi
  });

})();
