var app =angular.module('contactApp', []);

    app.controller('AppCtrl', ['$scope','$http', function AppCtrl($scope,$http) {
      var refresh = function(){
        $http.get('/contactList').then(function successCallback(response){
          //console.log("Success " + JSON.stringify(response));
          $scope.contactList = response.data;
          $scope.contact = '';
        },function errorCallback(response){
          console.log("Error Encountered " + response);
        });
      };
      refresh();
        console.log("Hello world from controller");

        $scope.addContact = function(){
          console.log($scope.contact);
          $http.post('/contactList',$scope.contact).then(function successCallback(response){
            refresh();
            console.log('Succes post :: ' + response.status);
          },function errorCallback(response){
            console.log('Error Encountered in post :: ' + response.status );
          });
        }

        $scope.removeContact= function (id){
          console.log(id);
          $http.delete('/contactList/'+id).then(function successCallback(response){
            console.log("Delete success:: " + response.status);
            refresh();
          }, function errorCallback(response){
            console.log("Delete Error Encountered:: "+response.status);
          });
        };

        $scope.editContact = function(id){
          console.log(id);
          $http.get('/contactList/' + id).then(function successCallback(response){
            $scope.contact = response.data;
          }, function errorCallback(response){

          });
        }

        $scope.update = function(){
          $http.put('/contactList/'+$scope.contact._id, $scope.contact).then(function successCallback(response){
            refresh();
          },function errorCallback(response){
            console.log("Update Error:: " + response.status);
          });
        };
    }]);
