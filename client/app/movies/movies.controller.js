'use strict';

(function(){

class MoviesComponent {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('moviesendpoint');
    });
  }

  $onInit() {
    this.$http.get('/api/moviesendpoints')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('moviesendpoint', this.awesomeThings);
      });
  }

  addThing() {
    if (this.mname && this.mdesc && this.mtime) {
      this.$http.post('/api/moviesendpoints ', {
        name: this.mname,
        description:this.mdesc,
        time:this.mtime
      });
      this.newThing = '';
    }
  }

  deleteThing(moviesendpoint) {
    this.$http.delete('/api/moviesendpoints/' + moviesendpoint._id);
  }
//}


    editThing(thing)
    {
      console.log("this enter");
        console.log("i callled:f1");
        //$("tr").nextAll("input[type=text]").disabled=false;
        var container = document.getElementById(thing.name);

      // Find its child `input` elements
      var inputs = container.getElementsByTagName('input');
      for (var index = 0; index < inputs.length; ++index) {
          inputs[index].disabled = false;
      }

    }

    updateThing(movie) {
        this.$http.put('/api/moviesendpoints/'+movie._id,JSON.stringify(movie));
      }
    }


angular.module('merafilmApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent
    //controllerAs: Movies
  });

})();
