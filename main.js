document.getElementById('issueInputForm').addEventListener('submit',saveIssue);
document.getElementById('sprintInputForm').addEventListener('submit',saveSprint);
document.getElementById('filter').addEventListener('submit',filterApp);
var gUserId='';
var gTasksId=2;
var gCommentsId=3;



	function initialize(){
		
		var userName='Sergiutzu';
		var userId=chance.guid();
		
		gUserId=userId;
		
		var user={
			id:userId,
			name:userName
			
		}
		
		
			var users=[];
			users.push(user);
			localStorage.setItem('users',JSON.stringify(users));
		
	}
	
	
	
	function saveSprint(e){
		
		var sprintName=document.getElementById('sprintNameInput').value;
		var sprintId=chance.guid();
		
		var sprint ={
			id:sprintId,
			name:sprintName
		}
		
		
		if(localStorage.getItem('sprints')==null){
			var sprints=[];
			sprints.push(sprint);
			localStorage.setItem('sprints',JSON.stringify(sprints));
		}else{
			var sprints=JSON.parse(localStorage.getItem('sprints'));
			sprints.push(sprint);
			localStorage.setItem('sprints',JSON.stringify(sprints));
			
		}
		document.getElementById('sprintInputForm').reset();
		
		fetchSprint();
		
		e.preventDefault();
		
	}


	function saveIssue(e) {
		
		var issueType=document.getElementById('issueTypeInput').value;
		var issueName=document.getElementById('issueNameInput').value;
		var issueDesc=document.getElementById('issueDescInput').value;
		var issueSprint=document.getElementById('issueSprintInput').value;
		var issueId=chance.guid();
		var issueStatus='New';
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();

		if(dd<10) {
			dd = '0'+dd
		} 

		if(mm<10) {
			mm = '0'+mm
		} 

		today = mm + '/' + dd + '/' + yyyy;
		
		var issueCreatedAt=today;
		
		var users=JSON.parse(localStorage.getItem('users'))
		for(var i=0;i<users.length;i++){
		if (users[i].id==gUserId){
		var issueCreatedBy=users[i].name;
		var issueAssigne=users[i].name;
		}
		}
		
		var issueTasks=gTasksId;
		var issueComments=gCommentsId;
		var issueUpdatedAt=today;
		
		var issue ={
			id:issueId,
			type:issueType,
			name:issueName,
			sprint:issueSprint,
			createdBy:issueCreatedBy,
			assigne:issueAssigne,
			description:issueDesc,
			status:issueStatus,
			tasks:issueTasks,
			comments:issueComments,
			updatedAt:issueUpdatedAt,
			createdAt:issueCreatedAt
		}
		
		if(localStorage.getItem('issues')==null){
			var issues=[];
			issues.push(issue);
			localStorage.setItem('issues',JSON.stringify(issues));
		}else{
			var issues=JSON.parse(localStorage.getItem('issues'));
			issues.push(issue);
			localStorage.setItem('issues',JSON.stringify(issues));
			
		}
		document.getElementById('issueInputForm').reset();
		
		fetchIssues();
		
		e.preventDefault();
	}





	function deleteIssue(id){
		var issues=JSON.parse(localStorage.getItem('issues'));
		
		
		for (var i=0; i<issues.length; i++){
			if(issues[i].id==id){
				issues.splice(i,1);
			}
		}
		
		localStorage.setItem('issues',JSON.stringify(issues));
		fetchIssues();
	}

	function fetchSprint(){
		 
		 var sprints=JSON.parse(localStorage.getItem('sprints'));
		 var issueSprintInpute=document.getElementById('issueSprintInput');
		 var issueSprintFiltere=document.getElementById('issueSprintFilter');
		issueSprintInput.innerHTML='';
		
		for (var i=0;i<sprints.length;i++){
		
		var name=sprints[i].name;
		
		issueSprintInput.innerHTML+='<option value="'+name+'">'+name+'</option>';
		issueSprintFilter.innerHTML+='<option value="'+name+'">'+name+'</option>';
		 
		 
		 
		}
		 
	 }
	 
	 
	function editIssue(id){
		
		
		localStorage.setItem('editID',JSON.stringify(id));
		document.location.href="edit.html";
		
		
		
	}

  function fetchIssues(){
	  initialize();
	  
	  var issues=JSON.parse(localStorage.getItem('issues'));
	  var issuesListe=document.getElementById('issuesList');
	  
	  var varType=document.getElementById('issueTypeFilter').value;
	  var varSprint=document.getElementById('issueSprintFilter').value;
	  
	
	  
	  
	  
	  issuesList.innerHTML='';
	  
	  
	  if(varType=="www" && varSprint=="www")
	  {
	  
	  for(var i=0; i<issues.length;i++){
		  var id=issues[i].id;
		  var type=issues[i].type;
		  var name=issues[i].name;
		  var sprint=issues[i].sprint;
		  var description=issues[i].description;
		  var status=issues[i].status;
		  var createdAt=issues[i].createdAt;
		  var createdBy=issues[i].createdBy;
		  var assignedBy=issues[i].assigne;
		  var tasks=issues[i].tasks;
		  var comments=issues[i].comments;
		  var updateAt=issues[i].updatedAt;
		  
		  issuesList.innerHTML+='<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + type + '</span></p>'+
                              '<h3>' + name + '</h3>'+
                              '<p><b>Created At:</b><span class="glyphicon glyphicon-time"></span> ' + createdAt + ' '+
                              '<span class="glyphicon glyphicon-menu-right"></span> ' + status+ '</p>'+
							  '<p><b>Create By:</b><span class="glyphicon glyphicon-user"></span> ' + createdBy+ '</p>'+
							   '<p><b>Assignee:</b><span class="glyphicon glyphicon-user"></span> ' + assignedBy+ '</p>'+
							  '<p> <span class="glyphicon glyphicon-forward"></span> ' + description+ '</p>'+
							  '<p><b>Tasks:</b> ' + tasks+ '</p>'+
							  '<p><b>Sprint:</b> ' + sprint+ '</p>'+
							  '<p><b>Comments:</b> ' + comments+ '</p>'+
							  '<p><b>Update At:</b><span class="glyphicon glyphicon-time"></span> ' + createdAt + '</p>'+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a> '+
							  '<a href="#" class="btn btn-success" onclick="editIssue(\''+id+'\')">Edit</a> '+
							  
                              '</div>';
		  
	  }

	  }
	 

  
   if(varType=="www" && varSprint!="www")
	
	  {
	
	  for(var i=0; i<issues.length;i++){
		  var id=issues[i].id;
		  var type=issues[i].type;
		  var name=issues[i].name;
		  var sprint=issues[i].sprint;
		  var description=issues[i].description;
		  var status=issues[i].status;
		  var createdAt=issues[i].createdAt;
		  var createdBy=issues[i].createdBy;
		  var assignedBy=issues[i].assigne;
		  var tasks=issues[i].tasks;
		  var comments=issues[i].comments;
		  var updateAt=issues[i].updatedAt;
		  
		  if(varSprint==sprint){
		  
		  issuesList.innerHTML+='<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + type + '</span></p>'+
                              '<h3>' + name + '</h3>'+
                              '<p><b>Created At:</b><span class="glyphicon glyphicon-time"></span> ' + createdAt + ' '+
                              '<span class="glyphicon glyphicon-menu-right"></span> ' + status+ '</p>'+
							  '<p><b>Create By:</b><span class="glyphicon glyphicon-user"></span> ' + createdBy+ '</p>'+
							   '<p><b>Assignee:</b><span class="glyphicon glyphicon-user"></span> ' + assignedBy+ '</p>'+
							  '<p> <span class="glyphicon glyphicon-forward"></span> ' + description+ '</p>'+
							  '<p><b>Tasks:</b> ' + tasks+ '</p>'+
							  '<p><b>Sprint:</b> ' + sprint+ '</p>'+
							  '<p><b>Comments:</b> ' + comments+ '</p>'+
							  '<p><b>Update At:</b><span class="glyphicon glyphicon-time"></span> ' + createdAt + '</p>'+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a> '+
							  '<a href="#" class="btn btn-success" onclick="editIssue(\''+id+'\')">Edit</a> '+
							  
                              '</div>';
		  
	  }
	  
	   
	  }
	  
	 }
	 
	 
	  if(varType!="www" && varSprint=="www")
	
	  {
	
	  for(var i=0; i<issues.length;i++){
		  var id=issues[i].id;
		  var type=issues[i].type;
		  var name=issues[i].name;
		  var sprint=issues[i].sprint;
		  var description=issues[i].description;
		  var status=issues[i].status;
		  var createdAt=issues[i].createdAt;
		  var createdBy=issues[i].createdBy;
		  var assignedBy=issues[i].assigne;
		  var tasks=issues[i].tasks;
		  var comments=issues[i].comments;
		  var updateAt=issues[i].updatedAt;
		  
		  if(varType==type){
		  
		  issuesList.innerHTML+='<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + type + '</span></p>'+
                              '<h3>' + name + '</h3>'+
                              '<p><b>Created At:</b><span class="glyphicon glyphicon-time"></span> ' + createdAt + ' '+
                              '<span class="glyphicon glyphicon-menu-right"></span> ' + status+ '</p>'+
							  '<p><b>Create By:</b><span class="glyphicon glyphicon-user"></span> ' + createdBy+ '</p>'+
							   '<p><b>Assignee:</b><span class="glyphicon glyphicon-user"></span> ' + assignedBy+ '</p>'+
							  '<p> <span class="glyphicon glyphicon-forward"></span> ' + description+ '</p>'+
							  '<p><b>Tasks:</b> ' + tasks+ '</p>'+
							  '<p><b>Sprint:</b> ' + sprint+ '</p>'+
							  '<p><b>Comments:</b> ' + comments+ '</p>'+
							  '<p><b>Update At:</b><span class="glyphicon glyphicon-time"></span> ' + createdAt + '</p>'+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a> '+
							  '<a href="#" class="btn btn-success" onclick="editIssue(\''+id+'\')">Edit</a> '+
							  
                              '</div>';
		  
	  }
	  
	   
	  }
	  
	 }
	 
	  if(varType!="www" && varSprint!="www")
	
	  {
	
	  for(var i=0; i<issues.length;i++){
		  var id=issues[i].id;
		  var type=issues[i].type;
		  var name=issues[i].name;
		  var sprint=issues[i].sprint;
		  var description=issues[i].description;
		  var status=issues[i].status;
		  var createdAt=issues[i].createdAt;
		  var createdBy=issues[i].createdBy;
		  var assignedBy=issues[i].assigne;
		  var tasks=issues[i].tasks;
		  var comments=issues[i].comments;
		  var updateAt=issues[i].updatedAt;
		  
		  if(varType==type && varSprint==sprint){
		  
		  issuesList.innerHTML+='<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + type + '</span></p>'+
                              '<h3>' + name + '</h3>'+
                              '<p><b>Created At:</b><span class="glyphicon glyphicon-time"></span> ' + createdAt + ' '+
                              '<span class="glyphicon glyphicon-menu-right"></span> ' + status+ '</p>'+
							  '<p><b>Create By:</b><span class="glyphicon glyphicon-user"></span> ' + createdBy+ '</p>'+
							   '<p><b>Assignee:</b><span class="glyphicon glyphicon-user"></span> ' + assignedBy+ '</p>'+
							  '<p> <span class="glyphicon glyphicon-forward"></span> ' + description+ '</p>'+
							  '<p><b>Tasks:</b> ' + tasks+ '</p>'+
							  '<p><b>Sprint:</b> ' + sprint+ '</p>'+
							  '<p><b>Comments:</b> ' + comments+ '</p>'+
							  '<p><b>Update At:</b><span class="glyphicon glyphicon-time"></span> ' + createdAt + '</p>'+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a> '+
							  '<a href="#" class="btn btn-success" onclick="editIssue(\''+id+'\')">Edit</a> '+
							  
                              '</div>';
		  
	  }
	  
	   
	  }
	  
	 }
  fetchSprint();
  }
	 
	function filterApp(e){
	fetchIssues();
	e.preventDefault();
	
}
