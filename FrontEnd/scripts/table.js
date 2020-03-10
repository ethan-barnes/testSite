/**
 * Converts epoch time given by API into human time for display in table
 * 
 * @param {int} epoch epoch from the API
 * @returns {string} human readable date dd/mm/yyyy
 */
function epochToDate(epoch) {
  var date = new Date(epoch * 1000); // Multiplied by 1000 to convert to milliseconds for javascript.
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year  = date.getFullYear();

  var realDate = day + "/" + month + "/" + year;
  return realDate;
}

/**
 * Uses item id to delete item from the database
 * 
 * @param {int} item id of the item to be deleted
 *  
 */
function deleteItem(item) {
    if (confirm("Are you sure?")) {
        const xhr = new XMLHttpRequest();        
        xhr.open('DELETE', 'http://3.11.63.81/api/food/remove/' + item, true);
        xhr.send();
    }   
}
/**
 * Changes the data displayed in the table based on category chosen
 * 
 * @param  {string} sel category name taken from the url
 * @return {string} string of HTML that is used to create the table
 */
function change_myselect(sel) {
    const xhr = new XMLHttpRequest();
    var  x, txt = "";

    // Function is called when API returns a ready state.
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) { // True when request sent and server has returned a response. 
            if (xhr.status == 200) {
                jsonList = JSON.parse(this.responseText); // Creates an array of objects from the JSON returned by API.

                // txt is the html code for the table the data is presented in.
                txt += '<table class="table table-hover">';
                txt += '<tr><th>name</th><th>category</th><th>donationDate</th><th>expiryDate</th><th>staffID</th><th>quantity</th><th>unit</th><th></th></tr>'
                // x is the individual objected generated from API within the jsonList array.
                for (x in jsonList) {
                    if (jsonList[x].category == sel || sel == "all") { // True for each JSON object where the category matches the category chosen by user.
                        
                        txt += '<tr>';
                        txt += '<td>' + jsonList[x].name + '</td>';
                        txt += '<td>' + jsonList[x].category + '</td>';
                        txt += '<td>' + epochToDate(jsonList[x].donationDate) + '</td>';
                        txt += '<td>' + epochToDate(jsonList[x].expiryDate) + '</td>';
                        txt += '<td>' + jsonList[x].staffID + '</td>';

                        txt += '<td>';
                        txt += '<input type="number" step="0.01" min="0.01" class="form-control" value='+jsonList[x].quantity+' style="width:80px;">';
                        txt += '</td>';  

                        txt += '<td>' + jsonList[x].unit + '</td>';
                        txt += '<td><button type="button" class="btn btn-danger" id="sub" onclick="deleteItem(' + jsonList[x].id + ')">Delete</button></td>'
                        txt += '</tr>';

                    }
                }
                txt += '</table>';

                // If logged in == true
                if (true) {
                  txt += '<a id="add" href="addFood.html" class="btn btn-sq-lg">Add Food</a>';
                }

                // Table has been created and is inserted into page HTML.
                document.getElementById("table").innerHTML = txt; 
            }

            if (xhr.status == 404) {
                console.log('File or resource not found');
            }
        }
    };

    xhr.open('GET', 'http://3.11.63.81/api/food/all/1', true);
    xhr.send();
};

// Category is fetched from URL. Regular expression used to find string after question mark.
var cat = document.location.search.replace(/^.*?\=/,'').substring(1);
change_myselect(cat);
