if (Meteor.isClient) {

    Template.viewSheet.rendered = function () {
        Session.set("isOwner", 1)

        guestFields = get_arrayOfFieldsWhereWhoEditIsGuest(Session.get('mySheetId'))
        // Server Data        
        Meteor.subscribe("ownerSheetDefinitions");
        Meteor.subscribe("ownerSheetData");
        Meteor.subscribe("rabbit", Session.get('mySheetId'));
        Sheets = sheetDefinitions.findOne({
            _id: Session.get('mySheetId')
        });
        rabbitCursor = messages.find({
            sheetId: Session.get('mySheetId')
        });
        var rabbitHandle = rabbitCursor.observe({
            added: function (post) {
                testMessagesUpdate(Session.get('mySheetId'))
            }
        });


        /// Dynamic Table 
        
        
        HOTCursor = sheetData.find({
          sheetId: Session.get('mySheetId')
        });
        
        
        /*
        var HOTHandle = HOTCursor.observe({
                added: function (post) {
                console.log("ADDED" + post)
            }, changed: function(post){
                console.log("CHANGED!" + post)
            }
        });
        
        */
        
        
        var HOTHandle = HOTCursor.observeChanges({
                added: function (id, fields) {
                cLog("database: observeChanges: Record Added: " + id + JSON.stringify(fields))
                hotInstance.loadData(getData())
                cLog("ReRendered Grid")
            }, changed: function(id, fields){
                var miniArray = []
                cLog("database: observeChanges: Record Changed: " + id + JSON.stringify(fields))
                // ONly change if a value in this format
                //{"sheetId":"sjBFqaBaffZGnP8ZP","sheetOwnerAuthor":null,"mycol":"pong","yourcol":null}
                // Matches a value in this format
                // ["yourcol"]
                fieldKeys = _.keys(fields)
                cLog("ID: XYY: fieldKeys are here: " + fieldKeys)
                testValues = guestFields
                cLog("ID: XYY: testValues to look against are here: " + testValues)
                isGuestField = 0
                $(testValues).each(function(x,y){
                    testValue = _.indexOf(fieldKeys, y);
                    if(testValue > -1){
                        isGuestField = 1
                    }
                })
                
                if (isGuestField == 1){
                                    miniFields = fields 
                miniFields['_id'] = id
                cLog(JSON.stringify(miniFields))
                miniArray.push(miniFields)
                updateCells(miniArray)
                cLog("ObserveChagnes: A GUEST Field has been updated, so the grid WAS updated: id: ABC: Updated")
                    
                } else {
                    
                    cLog("ObserveChagnes: Any Owner Field has been updated, so the grid was not updated: id: ABC: not Updated")
                    
                }

                
            }
        });  
  
        
        
        
        
        
        /// 


        // HTML Snippets
        nextStepsSnippetWithEmails = "<li>User will receive email notification with a link to your sheet</li><li>User will signup (if new user) and sign in</li> <li>User will fill out and save your sheet</li> <li>You can track progress in the dashboard</li>";
        nextStepsSnippetNoEmails = "<li>Add email addresses in the first column of the grid</li><li>Click the share button again </li> <li>Any rows with email addresses the user will have access to</li> <li>You can track progress in the dashboard</li>";

        function populateShareForm() {
            $("#shareSheetForm").html("");
            var myShares = getSharedEmails();
            $(myShares).each(function (x, y) {
                formString = "<div class='form-group'><label for='shareEmail'>Share with</label><input type='email' class='form-control shareEmailAddress' disabled id='emailAddress' placeholder='" + y + "' value = '" + y + " ' ></div>"
                $("#shareSheetForm").append(formString)
            })
        }

        $(document).ready(function () {
            // Superficial DOM Functions (That don't effect the DB)


            // Enable Tooltips
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            });

            // Hide the modal that shows if nobody has shared
            $("#noShareModal").hide();

            // show Confirmation
            function confirmShare() {
                confirmSnippet = "<div class='alert alert-success' role='alert' id='confirmedShareSnippet'> <span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span> <span class='sr-only'>Confirmed:</span>Sheet Shared Succesfully! </div>"
                $("#alertSpace").html(confirmSnippet)
            }

            // DOM Function to add a blank share function
            $("#addFormEmail").click(function () {
                var inputString = "<div class='form-group'><label for='shareEmail'>Share with</label><input type='email' class='form-control shareEmailAddress' id='emailAddress' placeholder='Enter Email Adress'></div>"
                $("#shareSheetForm").append(inputString)
            });

            //DOM Function to toggle the left Nav
            $("#sheetName").click(function () {
                $("#leftNav").toggle()
            });

            // DOM Function to hide left nav by default
            $("#leftNav").hide();

            // DOM Functions that do effect DB

            $("#shareSheet").on('click', function () {
                var sampleDataArray = getSharedEmails();
                var shareLength = sampleDataArray.length;
                if (shareLength > 0) {
                    $("#nextSteps").html(nextStepsSnippetWithEmails);
                    $("#submitShareForm").show();
                    var emailListOutputHTML = '';
                    $(sampleDataArray).each(function (x, y) {
                        var emailLine = '<li>' + y + '</li>';
                        emailListOutputHTML = emailListOutputHTML + emailLine
                    });
                    $("#emailList").html(emailListOutputHTML)
                } else {
                    $("#nextSteps").html(nextStepsSnippetNoEmails);
                    $("#submitShareForm").hide();
                    $("#emailList").html("You have not added any email addresses")
                }
            });

            //DOM Function to add shared emails to the DB
            $("#submitShareForm").click(function () {
                processEmails(newEmailFilter());
                addSharedEmails();
                confirmShare()
            });

            // DOM Function Show the Sheet Title
            $("#sheetNameValue").html(getSheetTitle());

            // Show the Sheet Title on the PAGE
            myData = sheetDefinitions.findOne({
                _id: Session.get('mySheetId')
            });
            $("#results").append(myData['title']);

            // Core HOT
            getData = function() {
                resultArray = [];
                loadData = sheetData.find({
                    sheetId: Session.get('mySheetId')
                }).fetch();
                $(loadData).each(function (x, y) {
                    resultArray.push(y)
                });
                return resultArray
            }

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
                dataSchema: getHot_dataSchema(true),
                columns: getHot_columns(true),
                stretchH: 'all',
                minSpareRows: 1, 
                afterChange: function(changes, source){
                    cLog("AfterChange: Initiated")
                    cLog("AfterChange: ChangesData: " + changes)
                    cLog("AfterChange: sourceData: " + source)
                    
                    
                    if('null' != changes){
                    
                        cLog("AfterChange: Route: If changes are not 'null'")
                        
                        if(!!changes){
                    
                            cLog("AfterChange: Route: If changes variable exists !!changes")
                    
                            if(changes.length > 0){
                                cLog("AfterChange: Route: If length of changes > 0")
                                cLog("AfterChange: DataType: Changes dataType is " + typeof(changes))
                                cLog("AfterChange: Data: Changes data is: " + changes)
                                cLog("AfterChange: Data: Changes[0] data is: " + changes[0])
                                testChangesVariable = changes[0]
                                cLog("AfterChange: Data: Source data is: " + source)

                                $(changes).each(function(x,y){
                                    cLog("AfterChange: Here is Y" + y)
                                    if(y[3] != null){
                                        cLog("AfterChange: Y3 (new Value) is not null. Here is Y: " + y)
                                        cLog("AfterChange: UpdateCellInDatabase called! Here is the data: updateCellInDatabase(" + y[0] +","+ y[1] + "," + y[3]+ " )")
                                        updateCellInDatabase(y[0], y[1], y[3])
                                    }
                                })
                                
                            }
                        }
                    } else{
                          cLog("CHANGES null: " + changes)
                          cLog("SOURCE: " + source)
                    }
        
                    
                }
                    
                
            });

            hotInstance = $("#HOT").handsontable('getInstance');

            $("#saveSheet").click(function () {
                sheetEvent(Session.get("mySheetId"), "ownerSaved")
                lineIterator = 0;
                saveData = $("#HOT").handsontable('getData');
                numLines = saveData.length;
                $(saveData).each(function (x, y) {
                    //sheetData.insert(y)
                    dataId = y['_id'];
                    if (lineIterator < numLines - 1) {
                        sheetData.update({
                            _id: dataId
                        }, y, {
                            upsert: true
                        });
                        lineIterator = lineIterator + 1;
                    }
                })
            });

            // End Core HOT

            // Chat Functions START
            userArray = getGridEmailValues();
            sheetId = Session.get('mySheetId');
            currentUser = Meteor.user();
            currentUser = currentUser['emails'][0]['address'];
            isOwner = 1;
            senderId = Meteor.userId();

            showList();

            $("#submitMessageButton").click(function () {
                var msg = $("#typeMessageText").val();
                Meteor.call('insertMessage', Session.get('mySheetId'), senderId, messageGuest, isOwner, msg)
                $("#typeMessageText").val("")
            });
            // Chat Functions END
        });
    }
}