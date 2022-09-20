//Log setup
var logFile = new java.io.FileWriter("./logs/main/cgcsar4-TestRun-Workflow-postApprove.log", false); 
var logWriter = new java.io.BufferedWriter(logFile); 
var currentDateTime = new java.util.Date().toString();

function getAvailableActionId(wItem, actionName){
    var availableActions = wItem.getAvailableActions();
    var actionId = null;
    for(var x=0; x<availableActions.length; x++){
        if(availableActions[x].getNativeActionId().equals(actionName)){
            actionId = availableActions[x].getActionId();
            break;
        }
    }
    return actionId;
}

function getNextStatusNativeActionId(currentStatus){
    switch(currentStatus){
        case "in_draft":
            return "send_for_preapproval";
        case "pre_approval":
            return "mark_postapproved";
        case "mark_postapproved":
            return "new_revision";
    }
}


try{
	var testRun = workflowContext.getTarget();
	var TestCases = testRun.getAllRecords();
	for(var i=0; i<TestCases.length; i++)
	{
		var TworkItem = TestCases[i].getTestCase();
		var workItemStatus = TworkItem.getStatus().getId();
		while(!workItemStatus.equals("post_approved"))
		{
			var nextStatus = getNextStatusNativeActionId(workItemStatus);
			logWriter.write(currentDateTime + "\tPerforming Status Action: " + nextStatus + "\n");
			TworkItem.performAction(getAvailableActionId(TworkItem, nextStatus));
			TworkItem.save();
			workItemStatus = TworkItem.getStatus().getId()
			logWriter.write(currentDateTime + "\tUpdated Status: " + workItemStatus + "\n");
			
		}
	}
	
	
	
	var returnValue = true;
	
} catch(ex){
	logWriter.write(currentDateTime + "\tException Occured\n");
	logWriter.write(currentDateTime + "\t" + ex + "\n");
	returnValue = "Something went wrong. Please try again, if the error still exists please contact to the Administrator.";
}

logWriter.flush();
returnValue;
