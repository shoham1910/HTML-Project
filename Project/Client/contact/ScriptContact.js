function sendOK()
{
	var str="Please Enter Correct:";
	var name=document.getElementById("name").value;
	var phone=document.getElementById("phone").value;
	var mail=document.getElementById("Email").value;
	var flag=false;
	var cnt=0;
	var matches = name.match(/\d+/g);
	if (name.length<1 || matches != null) {
		document.getElementById("name").style.borderColor="#712b29";
		str+=" Name";
		flag=true;
		cnt++;
	}
	else{
		document.getElementById("name").style.borderColor="initial";
	}
	if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))){
		document.getElementById("Email").style.borderColor="#712b29";
		if(flag) str+=", Email";
		else str+=" Email";
		flag=true;
		cnt++;
	}
	if (!(/^05\d{8}$/g).test(phone)){
		document.getElementById("phone").style.borderColor="#712b29";
		if(flag) str+=", Phone";
		else str+=" Phone";
		flag=true;
		cnt++;
	}
	else{
		document.getElementById("phone").style.borderColor="initial";
	}

	
	if(flag){ 
		document.getElementById("alert-msg").textContent = str+".";
		return false;
	}
	return true;
}

function showAlert()
{
	var name=document.getElementById("name").value;
	var phone=document.getElementById("phone").value;
	var mail=document.getElementById("Email").value;
	if(!sendOK()){
		document.getElementById("alert-msg").style.visibility = "visible";
		return false;
	}
	document.getElementById("alert-msg").style.visibility = "hidden";
	return true;
}

function submitClick()
{
	return showAlert();
}