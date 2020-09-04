const player='X';
const computer='O';

const WinningOptions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
];

const LogicOptions=[
  [1, 6, 0],
  [2, 3, 0],
  [0, 5, 2],
  [1, 8, 2],
  [0, 7, 6],
  [3, 8, 6],
  [2, 7, 8],
  [5, 6, 8],
  [7, 5, 8],
  [1, 3, 0],
  [3, 7, 6],
  [1, 5, 2],
  [2, 6, 1],
  [0, 8, 1],
  [1, 7, 0],
  [3, 5, 0],
  [4, 6, 8],
  [4, 8, 2],
  [0, 4, 2],
  [2, 4, 0]
];

const Massive=['', '', '', '', '', '', '', '', '']
var Step=0;
const Edges=[0, 2, 6, 8];
const random=Math.floor(Math.random()*Edges.length);


function ResetGame(){
  location.reload();
  StartGame()
  document.getElementById("endgameDraw").style.display="none";
  document.getElementById("endgameLose").style.display="none";
};


function StartGame(){
  $(".cell").click(function() 
  { 
    
    $(this).append(player);
    $(this).unbind();
    Massive[$(this).attr("id")]=player;
    Step++;
    if (Massive[4]=="")
      {
        setTimeout( function(){ 
          $("#4" ).append(computer); 
        }  , 500 );
       
        $("#4").unbind();
        Massive[4]=computer;
        Step++; 
      }
    else if ($(this).attr("id")==4) 
      { 
        setTimeout( function(){ 
          $("#"+Edges[random]).append(computer); 
        }  , 500 );
       
        $("#"+Edges[random]).unbind();
        Massive[(Edges[random])]=computer; 
        Step++; 
      }
      //console.log(Massive); 
  
      // Indexes of Empty cells//
      function getAllIndexes(arr, val) {
      var indexes_of_Empty = [], i = -1;
      while ((i = arr.indexOf(val, i+1)) != -1)
        {
          indexes_of_Empty.push(i);
        }
          return indexes_of_Empty;
      }
      var indexes_of_Empty=getAllIndexes(Massive, "");
      console.log(indexes_of_Empty);
  
      // Indexes of X//
      function getAllIndexes(arr, val) {
      var indexes_X = [], i = -1;
      while ((i = arr.indexOf(val, i+1)) != -1)
      {
        indexes_X.push(i);
      }
        return indexes_X;
      }
      var indexes_X=getAllIndexes(Massive, "X");
      console.log(indexes_X);
  
      // Indexes of O//
      function getAllIndexes(arr, val) {
      var indexes_O = [], i = -1;
      while ((i = arr.indexOf(val, i+1)) != -1)
      {
        indexes_O.push(i);
      }
        return indexes_O;
    }
      var indexes_O=getAllIndexes(Massive, "O");
      console.log(indexes_O);
      
      attack(WinningOptions, Massive, indexes_O, indexes_of_Empty)
      defense(WinningOptions, Massive, indexes_X, indexes_of_Empty)
      logic(LogicOptions, Massive, indexes_X, indexes_of_Empty, indexes_O)
      draw()
      
  });
}

// Attack//
function attack(WinningOptions, Massive, indexes_O, indexes_of_Empty) 
{

for (var i=0; i<WinningOptions.length; i++)
  {  
   var O_Is_Found = WinningOptions[i].filter(
    function(e) {
    return this.indexOf(e) > -1;
         },
    indexes_O
     );
     //console.log(O_Is_Found);
     
  var Empty_Is_Found = (WinningOptions[i]).filter(
  function(e) {
    return this.indexOf(e) > -1;
          },
      indexes_of_Empty
      );
      //console.log(Empty_Is_Found);
   if (O_Is_Found.length==2 && Empty_Is_Found.length==1 && Step%2)
   {
     var O_Is_Empty = WinningOptions[i].filter(
     function(e) {
       return this.indexOf(e) < 0;
     },
     indexes_O
     );
     console.log(O_Is_Empty);
     setTimeout( function(){ 
     $("#"+O_Is_Empty).append(computer); 
    }  , 500 );
     
     $("#"+O_Is_Empty).unbind();
     Massive[O_Is_Empty]=computer;
     Step++;
     setTimeout( function(){ 
     document.getElementById("endgameLose").style.display="block";
    }  , 1200 );
    $(".cell").off("click");  
     
    
    //Change Winning background-color//
     function getAllIndexes(arr, val) {
       var indexes_O = [], i = -1;
       while ((i = arr.indexOf(val, i+1)) != -1)
       {
         indexes_O.push(i);
       }
         return indexes_O;
     }
       var indexes_O=getAllIndexes(Massive, "O");
       console.log(indexes_O);
     for (var m=0; m<=WinningOptions.length; m++)
     {
       var O_Is_Full = WinningOptions[i].filter(
         function(e) {
         return this.indexOf(e) > -1;
              },
         indexes_O
          );
          console.log(indexes_O)
          
          setTimeout(function(){
          for (var j=0; j<O_Is_Full.length; j++)
                  { 
                      $("#"+O_Is_Full[j]).css("background-color", "#44c767");
                  } 
          }  , 800 ); 
     } 

  }
} 
}

  // End of Attack//    
    //Defense//

  function defense(WinningOptions, Massive, indexes_X, indexes_of_Empty) 
  {
    for (var i=0; i<WinningOptions.length; i++)
    {  
        var X_Is_Found = WinningOptions[i].filter(
          function(e) {
          return this.indexOf(e) > -1;
              },
          indexes_X
          );
            //console.log(X_Is_Found);
      
        var Empty_Is_Found = (WinningOptions[i]).filter(
          function(e) {
          return this.indexOf(e) > -1;
              },
          indexes_of_Empty
          );
            //console.log(Empty_Is_Found);
      
    if (X_Is_Found.length==2 && Empty_Is_Found.length==1 && Step%2)
        {
          var X_Is_Empty = WinningOptions[i].filter(
          function(e) {
          return this.indexOf(e) < 0;
          },
          indexes_X
          );
          setTimeout( function(){ 
            $("#"+X_Is_Empty).append(computer); 
          }  , 500 );
          //console.log(X_Is_Empty);
         
          $("#"+X_Is_Empty).unbind();
          Massive[X_Is_Empty]=computer;
          Step++;
        } 
    }
  }

  // End of Defense//
  
  //Logic//
  function logic(LogicOptions, Massive, indexes_X, indexes_of_Empty, indexes_O)
  {
  for (var i=0; i<LogicOptions.length; i++)
  {  
      var X_Is_Found = LogicOptions[i].filter(
        function(e) {
        return this.indexOf(e) > -1;
            },
        indexes_X
        );
        //console.log(X_Is_Found);
    
        var Empty_Is_Found = LogicOptions[i].filter(
          function(e) {
          return this.indexOf(e) > -1;
              },
          indexes_of_Empty
          );
          //console.log(Empty_Is_Found);
        if(X_Is_Found.length==2 && Empty_Is_Found.length==1 && Step%2)
        {
          var X_Is_Empty = LogicOptions[i].filter(
          function(e) {
          return this.indexOf(e) < 0;
          },
          indexes_X
          );
          //console.log(X_Is_Empty);
          setTimeout( function(){ 
            $("#"+X_Is_Empty).append(computer);
          }  , 500 );
          
          $("#"+X_Is_Empty).unbind();
          Massive[X_Is_Empty]=computer;
          Step++;
        } 
    
  }
}

// End ofLogic/

// Draw//
function draw ()
{
   if (Step==9)
   {
    setTimeout( function(){ 
     document.getElementById("endgameDraw").style.display="block";
     }  , 500 );
    $(".cell").off("click");
   }
}

  
  

   



  
    
 

 





