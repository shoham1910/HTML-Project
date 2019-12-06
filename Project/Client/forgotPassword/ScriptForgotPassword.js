function passwordOK()
{
	var pass=document.getElementById("password").value;
	if(pass.length<6)
		return false;
	var i,up=0,low=0,num=0,spacial=0,l;
	var n=/[0-9]/;
	var upper=/[A-Z]/;
	var lower=/[a-z]/;
	var letter=/[a-zA-Z]/
	for(i=0;i<pass.length;i++)
	{
		l=pass.charAt(i);
		if(pass.charAt(i).match(n))
		{
			if(num==0)
				num=1;
		}
		else if(pass.charAt(i).match(letter))
		{		
			if(up==0 && pass.charAt(i)==pass.charAt(i).toUpperCase())
				up=1;
			if(low==0 && pass.charAt(i)==pass.charAt(i).toLowerCase())
				low=1;
		}	
		else if(spacial==0) spacial=1;
		if(num==1 && low==1 && up==1 &&  spacial==1) return true;
	}
	return false;
}
function showAlert()
{
	var name=document.getElementById("username").value;
	var pass=document.getElementById("password").value;
	if(name.length<3 || name.split().length!=1 || !passwordOK()){
		document.getElementById("alert-msg").style.visibility = "visible";
		return false;
	}
	document.getElementById("alert-msg").style.visibility = "hidden";
	window.alert("Username: "+name+"\n"+"Password: "+pass);
	return true;
}

function submitClick()
{
	return showAlert();
}