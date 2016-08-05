  'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
  $scope.name1="Sultan";
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

click1(movie)
{

sessionStorage.setItem('movietitle', movie.title);
// response.send(a);
//this.$http.session.val="dd";
   window.location = "/info";


}

    $onInit() {
      this.$http.get('/api/omdbiendpoints')
        .then(response => {
          this.awesomeThings = response.data;

          this.socket.syncUpdates('thing', this.awesomeThings);
        });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('merafilmApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
