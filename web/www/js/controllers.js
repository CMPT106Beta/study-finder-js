angular.module('starter.controllers',[])

    .controller('AuthController',function ($auth, $state, $http, $rootScope) {

        var vm = this;

        vm.loginError = false;
        vm.loginErrorText = '';

        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials).then(function() {

                // Return an $http request for the now authenticated
                // user so that we can flatten the promise chain
                return $http.get('api/authenticate/user');

                // Handle errors
            }, function(error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;

                // Because we returned the $http.get request in the $auth.login
                // promise, we can chain the next promise to the end here
            }).then(function(response) {

                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('app.studygroups');
            });
        }
        vm.signup = function(){
             var credentials = {
                email: vm.email,
                password: vm.password,
            };
			if (credentials.email.search("@sfu.ca")==-1) {
				alert('Must use SFU email!!');
			}else if(credentials.password != vm.repeatPassword){
				alert('Passwords must match!')
			}else{
            $http.post('api/signup', credentials)
            .success(function(data){
               vm.login();
            });
        }    
        }
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicSlideBoxDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	
	//fucntion that changes the slide for authView
	$scope.changeSlide = function(index){
		$ionicSlideBoxDelegate.slide(index,500);
	}
	
	$scope.nextSlide = function() {
		$ionicSlideBoxDelegate.next();
	}
	
})
.controller('studygroupsCtrl', function($scope,$http) {
    $http.get("/api/groups")
    .success(function(response) {
        $scope.studygroups = response;
     });
/*
  $scope.studygroups = [
    { title: 'Pop', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
*/
  
})
.controller('profileController', function($scope,$http) {
    $scope.profile = { 
	  picture: '',
	  username: 'username',
	  email: 'email',
	  program: 'program',
	  userID: 1
	};
	$scope.updateProfile = function() {
	  $http.post('/api/user/update', $scope.profile)
		.success(function(data) {
			$scope.profile = data;
			console.log(data);
			})
		.error(function(data) {
			console.log('Error: ' + data)
		});
	};
    })

.controller('createCtrl', function($scope,$http, $state) {
	$scope.codes = {
		options: ["ACMA","ALS","APMA","ARAB", "ARCH", "ASC", "BISC", "BOT", "BPK", "BUEC", "BUS", "CHEM", "CHIN", "CMNS", "CMPT", "COGS", "CRIM", "DEVS", "DIAL", "DMED", "EAS", "EASC", "EBP", "ECO", "ECON", "EDPR", "EDUC", "ENGL", "ENSC", "ETEC", "EVSC", "EXPL", "FAL", "FAN", "FNLG", "FNST", "FPA", "FREN", "GEOG", "GERM", "GERO", "GRK", "GS", "GSWS", "HIST", "HS", "HSCI", "HUM", "IAT", "IS", "ISPO", "ITAL", "JAPN", "LANG", "LAS", "LBRL", "LBST", "LING", "LS", "MACM", "MASC", "MATH", "MBB", "MSE", "MSSC", "MTEC", "NUSC", "ONC", "PERS", "PHIL", "PHYS", "PLCY", "POL", "PSYC", "PUB", "REM", "SA", "SAR", "SCD", "SCI", "SPAN", "STAT", "URB", "WL"]
};
	$scope.create = {
		courseCode: 'ACMA',
		courseNumber: null,
		startTime: '9:00',
		location: null,
		description: null,
		date: null,
		capacity: '1',
	};
	
	$scope.createInput = function() {
	  $http.post('/api/groups', $scope.create)
		.success(function(data) {
			$scope.create = data;
            $state.go('app.studygroups');
			})
		.error(function(data) {
			console.log('Error: ' + data)
		});
	};
	})
.controller('studyGroupCtrl', function($scope, $http, $location, $stateParams, $state){
    var id = $stateParams.id;
    $http.get('/api/groups/'+id).success(function(data) {
        $scope.group = data;
      });
	  
	  $scope.del = function() {
		$http.delete('/api/groups/'+id)
			.success(function(data) {
				$state.go('app.studygroups');
			})
			.error(function(data) {
				console.log('Error: ' + data);
		});
	};
})

.controller('searchCtrl', function($scope,$http) {
	$scope.search = {
		courseCode: 'ACMA',
		courseNumber: null,
		capacity: null,
		groupID: null
	};
	
	$scope.codes = {
		options: ["ACMA","ALS","APMA","ARAB", "ARCH", "ASC", "BISC", "BOT", "BPK", "BUEC", "BUS", "CHEM", "CHIN", "CMNS", "CMPT", "COGS", "CRIM", "DEVS", "DIAL", "DMED", "EAS", "EASC", "EBP", "ECO", "ECON", "EDPR", "EDUC", "ENGL", "ENSC", "ETEC", "EVSC", "EXPL", "FAL", "FAN", "FNLG", "FNST", "FPA", "FREN", "GEOG", "GERM", "GERO", "GRK", "GS", "GSWS", "HIST", "HS", "HSCI", "HUM", "IAT", "IS", "ISPO", "ITAL", "JAPN", "LANG", "LAS", "LBRL", "LBST", "LING", "LS", "MACM", "MASC", "MATH", "MBB", "MSE", "MSSC", "MTEC", "NUSC", "ONC", "PERS", "PHIL", "PHYS", "PLCY", "POL", "PSYC", "PUB", "REM", "SA", "SAR", "SCD", "SCI", "SPAN", "STAT", "URB", "WL"]
		};
		
	$scope.searchInput = function() {
	$scope.results = [];
	console.log($scope.search);
	  $http.get('/api/groups/search', {params: $scope.search})
		.success(function(data) {
			$scope.results = data;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

})

/*.controller('joinGroup', function($scope,$http) {
	$scope.join = function() {
		var id = $stateParams.id;
		$http.post('/api/groups/'+id+'/join').success(function(data) {
			console.log('got it')
	}
	};
})*/


