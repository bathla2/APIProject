 function displaySearchInfo() {
  $("#view").empty();
   
   var search = $("#movie-input").val().trim().toLowerCase();
   
   if(search.length == 0)
      {
        alert("Search field cannot be blank");
        return;
      }
   console.log(search);
   var queryURL = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
  
  
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
     
     var searchDiv = $("<div class='search'>");
    
      
      var count = 0;
      for (var i = 0; i < response.length; i++) 
      {
        
        if(response[i].keywords.includes(search))
        {
         count++; 
          var str = (response[i].body);
          var res = str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;nbsp;/g, " ").replace(/&quot;/g, ' " ');
          
          $("#view").append("<div class= 'row'><div class='col-1'><button type='button' class='btn btn-info'>*</button></div><div class='col-4'>" + response[i].title + "</div><div class='col-7'>"+res+"</div></div><hr>");
            
        }
      }
           
      if(count===0)
      {
        alert ("The given search keyword cannot be found, please try a different search term");
      }
         
      
    });
  }

 
  $("#add-search").on("click", function(event) {
    event.preventDefault();
    displaySearchInfo();
 });

 
