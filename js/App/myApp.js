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

myapp.controller('DataCtrl',function($scope,$http,$stateParams,JSONData,GetTags,GetMembers)
{
    
    $scope.JsonData=JSONData;
    $scope.state=$stateParams;
    $scope.routeTID=$stateParams.TID;
    $scope.routePID=$stateParams.PID;

    $scope.arrayOfTags=GetTags;
    $scope.arrayOfMembers=GetMembers;
    

    //Get the index of TID from the JsonData array
    $scope.getIndexOf=function(TID)
    {
        for (var i = 0; i < $scope.JsonData.length; i++) 
        {
            if(TID==$scope.JsonData[i].TID)
                return i;
        };
    }



    
    //On Change of checkbox eventHandler
    // $scope.updateSelection=function(e,TID)
    // {
        
    //     // console.log(e);
    //     // console.log(e.srcElement.checked);
    //     TaskName='inputTaskName'+TID;
    //     // console.log(TaskName);
    //     ModData=
    //     {
    //         "TID":TID,
    //         "PID":$scope.JsonData[$scope.getIndexOf(TID)].PID,
    //         "TN":document.getElementById(TaskName).value,
    //         checked:e.srcElement.checked
    //     };
    //     console.log(ModData);
    //     $scope.updateTask(ModData);
    // }


    // $scope.updateTaskOnEnter=function(e,TID)
    // {
    //     TaskName='inputTaskName'+TID;
    //     ModData=
    //     {
    //         "TID":TID,
    //         "PID":$scope.JsonData[$scope.getIndexOf(TID)].PID,
    //         "TN":document.getElementById(TaskName).value,
    //         checked:$scope.JsonData[$scope.getIndexOf(TID)].checked
    //     };
    //     // console.log(ModData);
    //     $scope.updateTask(ModData);


    //     //Make New Task
    //     $scope.createNewTask(e);
    // }
    
    
    //To update the task whenever return key is pressed for a task
    //It updates only the 'TN' and the 'done'
    // $scope.updateTask=function(sendJSONdata)
    // {
    //     // console.log(sendJSONdata);
    //     //Send sendJSONdata to the server for updation
    // }


    // Creating a new Task
    //The argument e will tell after which the new task is to be created
    // $scope.createNewTask=function(e)
    // {
    //     //Just send all the details to the server in a JSON file 
    //     //DO NOT send TID. TID will be generated by the server


    //     //Manipulation of the DOM to add a new task row just below the row where the user
    //     //pressed the return key
    //     console.log(e);
    //     //using jquery to add an element of individual task row below the row where the 
    //     // user pressed the return key

    //     //Extracting the TID from the inputTaskName{{TID}}
    //     var TID=e.srcElement.id.slice(13);
    //     // console.log(TID);
    //     var htmlCode="appendedHTMLcode";
    //     var string='#TaskRow'+TID;
    //     console.log(string);

    //     $(string).after(
    //         "<div id=\"TaskRow99\" class=\"row IndividualTaskRow\">\n\t\n\t<div class=\"IndividualTaskRowTID\">\n\t\t99\n\t</div>\n\n\t<div class=\"IndividualTaskRowCheckBox\">\n\t\t<input id=\"checkbox99\" type=\"checkbox\" ng-model=\"false\" ng-click=\"updateSelection($event,99)\">\n\n\t</div>\n\n\t<div class=\"IndividualTaskRowInput\">\n\t\t<!-- 13 is keyCode for return key -->\n\t\t<input id=\"inputTaskName99\" ui-keypress=\"{13:\'updateTaskOnEnter($event,99)\'}\" value=\"DummyValue\" class=\"input-large\">\n\t\t<a href=\"#//task/99\"><button class=\"btn btn-info\">Details</button></a>\n\t</div>\n\n</div>");
        
        



    //     $scope.JsonData.push(
    //             {
    //                 "PID":99,
    //                 "TID":99,
    //                 "TN":"Temporary Task",
    //                 "TD":"tempTAsk Description",
    //                 "TC":"Comments",
    //                 "fol":[1,2],
    //                 "DueDate":"2013-1-24", "tags":["JS","AJAX","C#","iOS"],
    //                 checked:false
    //             });

    //     console.log($scope.JsonData);
    //     // Add a new item in JsonData



    //     // Send all the details to the server except TID
    //     // TID will be returned from the server to the client
        
    //     // TID=sendNewTasktoServer(DATA);
    // }

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