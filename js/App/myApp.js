// Add due date functionality
// Add Star Marked/Favorited functionality
// Add Followers functionality on individual Tasks
// Add Tags on Individual Tasks
// Add Filter based on Tags


hello=function()
{
    console.log("Hello");
}

var myapp=angular.module('myapp',['ui.state','ui.keypress']);



myapp.directive('ngBlur', function() {
  return function( scope, elem, attrs ) {
    elem.bind('blur', function() {
      scope.$apply(attrs.ngBlur);
    });
  };
});


myapp.directive('ngFocus', function( $timeout ) {
  return function( scope, elem, attrs ) {
    scope.$watch(attrs.ngFocus, function( newval ) {
      if ( newval ) {
        $timeout(function() {
          elem[0].focus();
        }, 0, false);
      }
    });
  };
});



myapp.controller('DataCtrl',function($scope,$http,$stateParams,$location,JSONData,GetTags,GetProjectIDs)
{
    
    $scope.state=$stateParams;
    $scope.routeTID=$stateParams.TID;
    $scope.routePID=$stateParams.PID;
    $scope.ListAllTags=GetTags;
    $scope.ListAllProjectIDs=GetProjectIDs;
    // $scope.sortOrder="PID";
    
    
    //Search Feature
    











    $scope.getIndexOf=function(TID)
    {
        for (var i = 0; i < $scope.JsonData.length; i++) 
        {
            if($scope.JsonData[i].TID==TID)
                return i;
        };
        
        // return ($scope.JsonData.indexOf(TID));
    }

    //This PutJSONData function needs to be separate I think. But I don't know where to put it. Maybe in services? Will figure it out later
    PutJSONData=function(DataToPut)
    {
        var STORAGE_ID='Stoopid';
        // console.log('In PutJSONData factory\n I am not sure whether a factory is used to update model');
        localStorage.setItem(STORAGE_ID,JSON.stringify(DataToPut));
    };

    $scope.CountOfChangesInJsonData=0;

    //Changes for every keystroke, it doesn't wait for the submit button to be pressed
    //Submit button is only to remove the input box and bring back the label
    $scope.$watch('JsonData',function()
    {
        $scope.CountOfChangesInJsonData++;
        console.log($scope.CountOfChangesInJsonData);
        PutJSONData($scope.JsonData);
        $scope.ListAllTags=GetTags;
    },true);
    

    //All these functions required for editing
    $scope.newTask = '';
    $scope.editedTaskName = null;
    $scope.editedProjectName=null;

    var tasksLocal = $scope.JsonData=JSONData;
    $scope.addTask = function () 
    {
        var newTask = $scope.newTask.trim();
        if (!newTask.length) 
        {
            return;
        }

        //Generate a TID which is not used by any other task
        //This immitates the server's functionality to ensure unique TIDs
        var occupiedTIDs = [];
        for(var i=0;i<$scope.JsonData.length;i++)
            occupiedTIDs.push($scope.JsonData[i].TID);

        var _TID;
        console.log(occupiedTIDs);
        for(var i=100;i>=0;i--)
            if(occupiedTIDs.indexOf(i)==-1)
            {
                _TID=i;
                break;
            }
            console.log(i);

        $scope.JsonData.push(
        {
            "PID":1,
            "TID":_TID,
            "TN":newTask,
            "TD":newTask+' Task Description ',
            "TC":"Task1C",
            "fol":[1,2,3,4,5],
            "star":1,
            "DueDate":"2013-1-24", 
            "tags":["JS","AJAX"],
            completed:true
        });
        
        $scope.newTask = '';
    };


    $scope.startEditing = function (task,editWhat) 
    {
        switch(editWhat)
        {
            case "taskName":
                task.editingTaskName=true;
                $scope.editedTaskName = task;
                break;

            case "projectName":
                task.editingProjectName=true;
                $scope.editedProjectName=task;
                break;
        }
        
    };

    //Submit button is only to remove the input box and bring back the label
    // The $scope.JsonData gets updated for every keystroke in the input as the input box is ng-model="task.TN"
    $scope.doneEditing = function (task, editWhat) 
    {
        switch(editWhat)
        {
            case "taskName":
                task.editingTaskName=false;
                task.TN = task.TN.trim();
                $scope.editedTaskName=null;
                if (!task.TN) 
                {
                    $scope.removeTask(task);
                }   
                break;
            case "projectName":
                task.editingProjectName=false;
                // task.PID = task.PID.trim();
                $scope.editedProjectName=null;
                if (!task.PID) 
                {
                    task.PID=0;
                }   
                break;
        }
         

    };


    $scope.removeTask = function (task) 
    {
        tasksLocal.splice(tasksLocal.indexOf(task), 1);
    };


    $scope.clearDoneTasks = function () 
    {
        $scope.JsonData = tasksLocal = tasksLocal.filter(function (val) 
        {
            return !val.completed;
        });
    };


    $scope.markAll = function (task) 
    {
        tasksLocal.forEach(function (task) 
        {
            tasksLocal.completed = done;
        });
    };

    $scope.addTag=function(index)
    {
        $scope.JsonData[index].tags.push($scope.newTag);
        $scope.newTag='';
    }

    $scope.removeTag=function(index,tag)
    {
        var ind=$scope.JsonData[index].tags.indexOf(tag);
        if(ind>-1)
            $scope.JsonData[index].tags.splice(ind,1);
    }

});


myapp.config(function($stateProvider,$urlRouterProvider,$routeProvider)
{
  //
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("") 
   

  $stateProvider
    .state('route1',
    {
        url:"/:PID",
        views:
        {
            "ProjectPane":
            {
            templateUrl:"css/partials/Tasks.html",
            controller:"DataCtrl"
            }            
        }
      
    })



        // .state('route1.task',
            .state('route1.task',
            {
                url:"/task/:TID",
                views:
                {
                    // The @ suffix addresses the view in the higher state
                    "TaskPane@": 
                    {
                        templateUrl:"css/partials/IndiTasks.html",
                        controller:"DataCtrl"        
                    }
                    
                }
                
            })


});