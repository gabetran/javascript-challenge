
function onReady() {
	var states = document.getElementById("state");
	for(var i = 0; i < usStates.length; i++) {
		var state = usStates[i];
		var opt = document.createElement("option");
		opt.value = state.code;
		var text = document.createTextNode(state.name);
		opt.appendChild(text);
		states.appendChild(opt);
	}
	
	document.addEventListener('change', displayOther);
	var cancel = document.getElementById('cancelButton');
	cancel.addEventListener('click', noThanks);
	var signupForm = document.getElementById('signup');
	signup.addEventListener('submit', onSubmit);
}

function onSubmit(evt) {
	var valid = validateForm(this);
	if(!valid && evt.preventDefault) {
		evt.preventDefault();
	}
	evt.returnValue = valid;
	return valid;
}

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	var idx;
	var valid = true;
	valid &= validateZip();
	for(idx=0; idx < requiredFields.length; idx++) {
		valid &= validateRequiredFields(requiredFields[idx], form);
	}
	valid &= validateZip();
	if (displayOther()) {
		valid &=validateRequiredFields('occupationOther', form);
	};
	var birthdate = document.getElementById('birthdate').value;
	console.log(birthdate);
	valid &= validateAge(birthdate);
	return valid;

	

}

function validateRequiredFields(field, form) {
	if(form[field].value.trim().length == 0){
		form[field].className = 'invalid-field form-control';
		return false;
	} else {
		form[field].className = 'form-control';
		return true;
	}
}

function validateZip() {
	var zipCode = document.getElementById('zipcode');
	var zipRegExp = new RegExp('^\\d{5}$');
	var zipValid = zipRegExp.test(zipCode.value);
	if (zipValid == false) {
		zipCode.className = 'invalid-field form-control';
		return false;
	} else {
		zipCode.className = 'form-control';
		return true;
	}
}


function validateAge(dateString) {
	console.log('validating age');
    var today = new Date();
    var birthDate = new Date(dateString);
    console.log(birthDate.getFullYear());
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    console.log(age);
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    age = 0;
    if(age < 13) {
    	console.log('too young');
    	document.getElementById("birthdateMessage").innerHTML = "You must be at least 13 years old to sign up!";
    	return false;
    }else {
    	return true;
    }

}

function noThanks() {
	var leave = confirm("Do you really want to leave this page?");
	if (leave) {
		location.replace("http://google.com");
	};
}
function displayOther() {
	var selected = document.getElementById("occupation").value;
	var occupationOther = document.getElementsByName("occupationOther")[0]
	if (selected == "other") {
		occupationOther.style.display = "block";
		return true;
	}else {
		occupationOther.value = "";
		occupationOther.style.display = "none";
		return false;
	};
}

document.addEventListener('DOMContentLoaded', onReady);









