if (Meteor.isClient) {



    Template.viewSheet.rendered = function () {
        Meteor.subscribe("ownerSheetDefinitions");
        cLog('subscribed to ownerSheetDefinitions')
        Meteor.subscribe("ownerSheetData");
        console.log('subscribed to ownerSheetData')





        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })


        // redundant. Needs refactoring.
        thisSheetId = Session.get('mySheetId')
        mySheetId = thisSheetId
        //console.log(mySheetId)
        sheetId = mySheetId;


        // Unclear. Remove priority 1
        sheetOwnerAuthor = "sirmartymoosez"


        // sheet Definitions data
        Sheets = sheetDefinitions.findOne({_id: sheetId})


        //Start  Share Functions

        // Start New Sharing Functionality
        // Note: is being tested with console.log(getGridEmailValues()) so you will need to roll it back

        shareSnippet = "<div class='modal-body'> <form id='shareSheetForm'>              <div class='form-group'>                <div id='modalContent'>                      <div class='row' id='shareSheetContent'>                    <div class='col-md-5'>                      <div class='row' id='shareSheetContentText'>                        <div class='col-md-12'>                            <h4> To share a sheet:</h4>                          <p>                          <li>Click into the first column</li>                          <li>Type the email address</li>                          <li>Click 'Share'</li>                          </p>                            </div>                            </div>                        </div>                    <div class='col-md-6' id='helpPromptImage'>                      <img src='../helpPrompt.png' width='320'/>                      </div>                  </div>                          </div>                  </div>            </form>            </div>          <div class='modal-footer'>              <button type='button' class='btn btn-primary' id='gotIt' data-dismiss='modal'>Got It!</button>          </div>"

        shareSnippetWithEmails = "                <div class='modal-body'>                      <form id='shareSheetForm'>                          <div class='form-group'>                              <div id='modalContent'>                                      <div class='row' id='shareSheetContent'>                                      <div class='row'>                                          <div class='col-md-1'></div>                                          <div class='col-md-11'>                                                <div class='row'>                                                  <h4>Share With the following Email Addresses:</h4>                                                  <ul>                                                      <div id='emailList'></div>                                                  </ul>                                              </div>                                              <div class='row'>                                                  <h4>What Happens Next?</h4>                                                  <ol>                                                      <li>User will receive email notification with a link to your sheet</li>                                                      <li>User will signup (if new user) and sign in</li>                                                      <li>User will fill out and save your sheet</li>                                                      <li>You can track progress in the dashboard</li>                                                    </ol>                                                </div>                                          </div>                                      </div>                                      </div>                                        </div>                              </div>                      </form>                    </div>                  <div class='modal-footer'>                      <button type='button' class='btn btn-default' data-dismiss='modal'>Cancel</button>                      <button type='button' class='btn btn-primary' id='submitShareForm'>Share</button>                  </div>"

        getGridEmailValues = function () {
            var outputObj = {}
            var outputArray = []
            var tableData = $("#HOT").handsontable('getData')
            for (i = 0; i < tableData.length - 1; i++) {
                outputArray.push(tableData[i]['sheetOwnerAuthor'])
            }

            outputArray = _.uniq(outputArray);
            outputArray = _.filter(outputArray, function (num) {
                return num.length > 0;
            });

            //outputObj['sharedEmails'] = outputArray
            return outputArray
        }


        function addSharedEmails() {
            console.log("AddSharedEmails function initiated")

            sharedEmailArray = []


            sharedEmailArray = getGridEmailValues()
            cLog("sharedEmailArray: " +sharedEmailArray)


            sharedEmails = {sharedEmails: sharedEmailArray}
            cLog("session sheet id: " + Session.get('mySheetId'))
            sheetDefinitions.update({_id: Session.get('mySheetId')}, {$set: sharedEmails})
            
            // Begin Saving for 0.06 Release
            
                lineIterator = 0
                saveData = $("#HOT").handsontable('getData');
                numLines = saveData.length
                $(saveData).each(function (x, y) {
                    //sheetData.insert(y)
                    dataId = y['_id']

                    if (lineIterator < numLines - 1) {
                        sheetData.update({_id: dataId}, y, {upsert: true})
                        lineIterator = lineIterator + 1;
                    }


                })
            
            // End
            
            
            return sharedEmailArray


        }


        function getSharedEmails() {
            console.log(getGridEmailValues())
            //shareResult = sheetDefinitions.find({_id: Session.get('mySheetId') }, {fields: {sharedEmails: 1}}).fetch()
            shareResult = getGridEmailValues()


            return shareResult


        }

        function populateShareForm() {


            $("#shareSheetForm").html("")
            var myShares = getSharedEmails()
            $(myShares).each(function (x, y) {
                formString = "<div class='form-group'><label for='shareEmail'>Share with</label><input type='email' class='form-control shareEmailAddress' disabled id='emailAddress' placeholder='" + y + "' value = '" + y + " ' ></div>"
                $("#shareSheetForm").append(formString)

            })

            //      var inputString = "<div class='form-group'><label for='shareEmail'>Share with</label><input type='email' class='form-control shareEmailAddress' id='emailAddress' placeholder='Enter Email Adress'></div>"
            //       $("#shareSheetForm").append(inputString)

        }


        // End Share Functions

        // Start Email functions

        function client_email_notifyShared_newUser() {

            var em_title = "DataGator: Someone has shared a sheet with you"
            var em_content = "<h4> A user has shared some content with you on datagator. <h4><br> <h1> test </h1> <br> <a href='http://datagator.us:3000'/>"

            Meteor.call('email_notifyShared_newUser',
                'sirmartymoose@gmail.com',
                'dave@datagator.us',
                em_title,
                em_content);

        }

        // End email functions

        $(document).ready(function () {


            $("#shareSheet").on('click', function () {


                var sampleDataArray = getSharedEmails()
                var shareLength = sampleDataArray.length;
                if (shareLength > 0) {
                    // Commenting out to fix but 17
                    //$("#modalContentSwap").html(shareSnippetWithEmails)
                    var emailListOutputHTML = ''
                    $(sampleDataArray).each(function (x, y) {
                        var emailLine = '<li>' + y + '</li>'
                        emailListOutputHTML = emailListOutputHTML + emailLine

                    })
                    $("#emailList").html(emailListOutputHTML)
                } else {
                    // Commenting out to fix bug 17
                    //$("#modalContentSwap").html(shareSnippet) 
                    
                }
            })

            // DOM Function for the Share Sheet Submit UI


            // DOM Function to add a blank share function
            $("#addFormEmail").click(function () {
                var inputString = "<div class='form-group'><label for='shareEmail'>Share with</label><input type='email' class='form-control shareEmailAddress' id='emailAddress' placeholder='Enter Email Adress'></div>"
                $("#shareSheetForm").append(inputString)
            })


            //DOM Function to add shared emails to the DB
            $("#submitShareForm").click(function () {
                console.log("submit share form button clicked")
                addSharedEmails()
                //client_email_notifyShared_newUser()
            })

            //DOM Function to toggle the left Nav

            $("#sheetName").click(function () {
                $("#leftNav").toggle()

            })

            // DOM Function to hide left nav by default
            $("#leftNav").hide()


            $("#sheetNameValue").html(getSheetTitle())

            yellowRenderer = function (instance, td, row, col, prop, value, cellProperties) {
                Handsontable.renderers.TextRenderer.apply(this, arguments);
                td.style.backgroundColor = "#ececec";

            };

            ownerEmailRenderer = function (instance, td, row, col, prop, value, cellProperties) {
                Handsontable.renderers.TextRenderer.apply(this, arguments);
                td.style.backgroundColor = "#5db85b";

            };


            console.log("VIEWSHEETLOADED")
            //console.log(_id)
            //console.log(thisSheetId)
            myData = sheetDefinitions.findOne({_id: thisSheetId})
            console.log(myData)
            $("#results").append(myData['title'])

            function getData() {
                resultArray = []
                loadData = sheetData.find({sheetId: sheetId}).fetch()

                $(loadData).each(function (x, y) {
                    resultArray.push(y)

                })

                return resultArray

            }

// Instead of creating a new Handsontable instance with the container element passed as an argument,
// you can simply call .handsontable method on a jQuery DOM object.
            var $container = $("#HOT");


            $container.handsontable({
                data: getData(),

                columnSorting: true,
                manualColumnResize: true,
                manualRowResize: true,
                manualColumnMove: true,
                manualRowMove: true,
                fixedColumnsLeft: 1,


                colHeaders: getHot_colHeaders(true),
                colWidths: getHot_colWidths(true),
                dataSchema: getHot_dataSchema(),
                columns: getHot_columns(true),
                stretchH: 'all',
                minSpareRows: 1

            });

// This way, you can access Handsontable api methods by passing their names as an argument, e.g.:
            hotInstance = $("#HOT").handsontable('getInstance');

            $("#saveSheet").click(function () {
                sheetEvent(Session.get("mySheetId"), "ownerSaved")
                lineIterator = 0
                saveData = $("#HOT").handsontable('getData');
                numLines = saveData.length
                $(saveData).each(function (x, y) {
                    //sheetData.insert(y)
                    dataId = y['_id']

                    if (lineIterator < numLines - 1) {
                        sheetData.update({_id: dataId}, y, {upsert: true})
                        lineIterator = lineIterator + 1;
                    }


                })


            })


        });

    }

}
