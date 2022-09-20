//Log setup
var logFile = new java.io.FileWriter("./logs/main/CSAR4-gxp-Workflow.log", false); 
var logWriter = new java.io.BufferedWriter(logFile); 
var currentDateTime = new java.util.Date().toString();
var returnValue = false;

function getCustomFields(iWorkItem){
	
	var a = getCustomFieldValues(iWorkItem, ["gxp_q1","gxp_q2","gxp_q3","gxp_q4","gxp_q5","gxp_q6","gxp_q7","gxp_q8","gxp_q9","21cfr_q1","21cfr_q2","21cfr_q3"]);
}
	
function getCustomFieldValues(iWorkItem, customFieldNames){
	var isNull=false;
	for(var x in customFieldNames){	
		var cFieldValue = iWorkItem.getCustomField(customFieldNames[x]);
		if(cFieldValue == null){
			isNull=true;
		}
	}
	if(isNull){
		returnValue = "Please fill All Mandatory Gxp and ERES Questionnaire below ";
	}else{
		returnValue = true;
	}
}		


// Main Business Logics Starts Here
try {
    var workItem = workflowContext.getTarget();
	getCustomFields(workItem);
	

    logWriter.write(currentDateTime + "\CSAR4-gxp-workflow script condition called on WorkItem ID: "+ " with Project ID: " +  "\n");
	
} catch (runtimeException) {
    logWriter.write(currentDateTime + "\tRuntime Exception Occured: " + runtimeException + "\n");
	
}
logWriter.flush();
returnValue;
