
document.getElementById('issueInputForm').addEventListener('submit',saveIssue);
function fetchData(){
	
	var editore=document.getElementById('editor');
	var id=JSON.parse(localStorage.getItem('editID'));
	var issues=JSON.parse(localStorage.getItem('issues'));
	
	
	for(var i=0;i<issues.length;i++){
		if (issues[i].id=id){
			
		  var type=issues[i].type;
		  var name=issues[i].name;
		  var description=issues[i].description;
		  var status=issues[i].status;
		  var createdAt=issues[i].createdAt;
		  var createdBy=issues[i].createdBy;
		  var assignedBy=issues[i].assigne;
		  var tasks=issues[i].tasks;
		  var comments=issues[i].comments;
		  var updateAt=issues[i].updatedAt;
			
			
			
			
			
		}
	}
	
	if(type =="Feature")
	
	sez='<option selected value="Feature">Feature</option>'+
		  '<option value="Bug">Bug</option>'+
		  '<option value="Task">Task</option>'+
		'</select>'+
		'</div>';
		
	if(type =="Bug")
	
	sez='<option  value="Feature">Feature</option>'+
		  '<option  selected value="Bug">Bug</option>'+
		  '<option value="Task">Task</option>'+
		'</select>'+
		'</div>';
		
		var task=0;
	
	if(type =="Task"){
	
	sez='<option value="Feature">Feature</option>'+
		  '<option value="Bug">Bug</option>'+
		  '<option selected value="Task">Task</option>'+
		'</select>'+
		'</div>';
	task=1;
	}
	sez2='<div class="form-group">'+
		'<label for="issueSprintInput">Sprint</label>'+
		'<select id="issueSprintInput" class="form-control">'+
		  
		'</select>'+
		'</div>'+
		
		'<div class="form-group">'+
		'<label for="issueNameInput">Name</label>'+
		'<input type="text" class="form-control" id="issueNameInput" value="'+name+'"'+
		'</div>'+
		'<div class="form-group">'+
		'<label for="issueDescInput">Description</label>'+
		'<input type="text" class="form-control" id="issueDescInput" value="'+description+'">'+
		'</div>'+
		'<div class="form-group">'+
		'<label for="issueStatusInput">Status</label>'+
		'<select id="issueStatusInput" class="form-control">';
		
	
	
	
	
   if (status=='New')
   sez3='<option selected value="New">New</option>'+
		'<option value="In Progress">In Progress</option>'+
		'<option value="Feedback">Feedback</option>'+
		'<option value="Rework">Rework</option>'+
		'<option value="Resolved">Resolved</option>'+
		'<option value="Ready for Testing">Ready for Testing</option>';
	if (status=='In Progress')
   sez3='<option  value="New">New</option>'+
		'<option selected value="In Progress">In Progress</option>'+
		'<option value="Feedback">Feedback</option>'+
		'<option value="Rework">Rework</option>'+
		'<option value="Resolved">Resolved</option>'+
		'<option value="Ready for Testing">Ready for Testing</option>';
	if (status=='Feedback')
   sez3='<option value="New">New</option>'+
		'<option value="In Progress">In Progress</option>'+
		'<option selected value="Feedback">Feedback</option>'+
		'<option value="Rework">Rework</option>'+
		'<option value="Resolved">Resolved</option>'+
		'<option value="Ready for Testing">Ready for Testing</option>';
	if (status=='Rework')
   sez3='<option  value="New">New</option>'+
		'<option selected value="In Progress">In Progress</option>'+
		'<option value="Feedback">Feedback</option>'+
		'<option selected value="Rework">Rework</option>'+
		'<option value="Resolved">Resolved</option>'+
		'<option value="Ready for Testing">Ready for Testing</option>';
	if (status=='Resolved')
   sez3='<option value="New">New</option>'+
		'<option value="In Progress">In Progress</option>'+
		'<option value="Feedback">Feedback</option>'+
		'<option value="Rework">Rework</option>'+
		'<option selected value="Resolved">Resolved</option>'+
		'<option value="Ready for Testing">Ready for Testing</option>';
	if (status=='Ready for Testing')
   sez3='<option  value="New">New</option>'+
		'<option selected value="In Progress">In Progress</option>'+
		'<option value="Feedback">Feedback</option>'+
		'<option value="Rework">Rework</option>'+
		'<option value="Resolved">Resolved</option>'+
		'<option selected value="Ready for Testing">Ready for Testing</option>';

	sez4='</select>'+
		'</div> ';
	sez6=' <button type="submit" class="btn btn-success">Update</button>';
	sez5='';	
		
	if (task==0){
		
		sez5='<div class="form-group">'+
		'<label for="issueTaskInput">Task</label>'+
		'<select id="issueTaskInput" class="form-control">';
		
		for (i=0;i<issues.length;i++){
			if(issues[i].type=="Task")
			sez5+='<option  value="'+issues[i].name+'">'+issues[i].name+'</option>';
		}
		
		sez5+='</select>'+
		'</div> ';
		
	}
	
	editor.innerHTML=
		'<div class="form-group">'+
		'<label for="issueTypeInput">Type</label>'+
		'<select id="issueTypeInput" class="form-control">'+sez+sez2+sez3+sez4+sez5+sez6;
		
		
		
	
	issues='';
	fetchSprint();
	
	
}



	function saveIssue(e){
		var id=JSON.parse(localStorage.getItem('editID'));
		var issueType=document.getElementById('issueTypeInput').value;
		var issueName=document.getElementById('issueNameInput').value;
		var issueDesc=document.getElementById('issueDescInput').value;
		var issueSprint=document.getElementById('issueSprintInput').value;
		var issueStatus=document.getElementById('issueStatusInput').value;
		if (issueType!="Task")
		var issueTasks=document.getElementById('issueTaskInput').value;
		
		
		var issues=JSON.parse(localStorage.getItem('issues'));
		
		for (var i=0;i<issues.length;i++)
			if(issues[i].id==id){
				issues[i].type=issueType;
				issues[i].name=issueName;
				issues[i].description=issueDesc;
				issues[i].status=issueStatus;
				
				
				issues[i].tasks=issueTasks;
			}
			
		localStorage.setItem('issues',JSON.stringify(issues));
		
		document.getElementById('issueInputForm').reset();
		
	e.preventDefault();
		
		document.location.href="index.html";
		
	
		
	}

	







	function fetchSprint(){
		 
		 var sprints=JSON.parse(localStorage.getItem('sprints'));
		 var issueSprintInpute=document.getElementById('issueSprintInput');
		 
		issueSprintInput.innerHTML='';
		
		for (var i=0;i<sprints.length;i++){
		
		var name=sprints[i].name;
		
		issueSprintInput.innerHTML+='<option value="Feature">'+name+'</option>';
		 
		 
		 
		 
		}
		 
	 }