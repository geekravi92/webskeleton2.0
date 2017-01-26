'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('ProfileCtrl', function ($scope,profile) {

      var promise = profile.getData();
        promise.then(function(data){
            console.log("SUCCESS ",data);

            var print=data.data["0"];
            var userInfo=data.data["0"].userinfo;
//            console.log(data.data["0"].username);

            $scope.Email=print.useremail;
            $scope.uName=print.username;
            
            if(userInfo){
              console.log("insiode",userInfo);
                $scope.Name=userInfo.fullname;
                $scope.Area=userInfo.area;
                $scope.City=userInfo.city;
                $scope.Pincode=userInfo.pincode;
                $scope.State=userInfo.state;
                $scope.Country=userInfo.country;

            }
            
        },function(error){
            $scope.result = "error occured";
        });
      

          $scope.submitProfileForm=function (profForm) {  
              if(profForm.$valid && $scope.newCountry!=undefined){
                $scope.dataValid="Wait";
                $scope.changeProfile();
      
               // $scope.saveprof();
              }
              else if($scope.newCountry==undefined){
                $scope.dataValid="Choose a country";
              }
              else{
                $scope.dataValid="Wrong or Incomplete info";
              }

          };

          $scope.changeProfile=function () {
              var profileObject={
                "fullname":$scope.newName,
                "area":$scope.newArea,
                "city":$scope.newCity,
                "state":$scope.newState,
                "pincode":$scope.newPincode,
                "country":$scope.newCountry,

              };
              
              var promise=profile.setProfileData(profileObject);
              promise.then(function(data) {
                console.log("ddd",data);
             
              },function(error) {
                console.log("error occured");
                
              });
              
            };


          $scope.submitMobileForm=function(mobileForm){
             if(mobileForm.$valid){
                    $scope.changeMobile();
           
            }
            else{
              $scope.result="Enter a valid mobile number";
            }
          };


          var arePasswordsSame=false;
    
          $scope.checkPassword=function(){
          if($scope.newPassword2!=undefined)
          {   
              if($scope.newPassword===$scope.newPassword2)
              {   
                $scope.passwordMessage="Passwords match";
                arePasswordsSame=true;
                
              }
              else if($scope.newPassword==undefined){
                 $scope.passwordMessage=undefined;
                 arePasswordsSame=false;
              }
              else{
                $scope.passwordMessage="Passwords dont match";
                arePasswordsSame=false;
                
              }
          }
        };

          $scope.submitPasswordForm=function(passForm){
             if(passForm.$valid && arePasswordsSame==true){
                    $scope.changePassword();
                    $scope.result="Updating Password";
           
            }
            else{
              $scope.result="Enter correct passwords";
            }
          };



          $scope.changePassword=function () {  
              $scope.result="passchanged";
          };

  });
