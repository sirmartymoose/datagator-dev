if (Meteor.isClient) {


    Template.viewSheet.rendered = function () {

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


            sharedEmailArray = []


            sharedEmailArray = getGridEmailValues()


            sharedEmails = {sharedEmails: sharedEmailArray}
            sheetDefinitions.update({_id: Session.get('mySheetId')}, {$set: sharedEmails})
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


            $("#shareSheet").click(function () {
                var sampleDataArray = getSharedEmails()
                var shareLength = sampleDataArray.length;
                if (shareLength > 0) {
                    var emailListOutputHTML = ''
                    $(sampleDataArray).each(function (x, y) {
                        var emailLine = '<li>' + y + '</li>'
                        emailListOutputHTML = emailListOutputHTML + emailLine

                    })
                    $("#emailList").html(emailListOutputHTML)
                } else {

                    // $("#emailList").html(sampleDataArray)
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
                addSharedEmails()
                client_email_notifyShared_newUser()
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