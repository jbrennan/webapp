
/*

	I'm not a javascript developer so I don't really have any concept of where values for the application state ought to go.
	I'm doing my best, and for now I'm going to keep some of these values in the global state.

*/

var buttonTitle = "Welcome";
var sendLogin = true;

var settings = {};

function login() {
	var data = {
		username: $("input[name=login_email]").val(),
		password: $("input[name=login_password]").val(),
	};
		
	var register = $("input[name=login_register]").attr("checked");
	$.ajax({
		
		type: "POST",
		url: sendLogin === true ? "/api/user/login" : "/api/user/create",
		contentType: 'application/json',
		data: JSON.stringify(data),
		success: function(r) {
			if (r.status == "OK") {
				document.cookie = 'auth=' + r.auth_token +
				'; expires=Thu, 1 Aug 2030 20:00:00 UTC; path=/';
				window.location.href = "/dashboard";
			} else {
				alert(r.error);
			}
		}
		
		
	});
	return false;
}

function logout() {
	document.cookie = encodeURIComponent("auth") + "=deleted; expires=" + new Date(0).toUTCString();
	window.location.replace("/");
}


function mainButton() {
	return $("input[name=do_login]");
}


function textChanged(event) {
	

	if (event.srcElement.classList.contains("text-replacement")) {
		var t = event.srcElement
		var sel = getInputSelection(t);
		t.value = jsprettify.prettifyStr(t.value);
		setInputSelection(t, sel.start, sel.end);
	}
	
	// return;
	this.sender = event.srcElement.id;
	this.cancelTimeout();
	this.timeoutID = window.setTimeout(function() {
		this.autosaveTimerFired();
		this.sender = null;
	}, 700);
	
}

///////////////////////
//
// Utilities
//
///////////////////////

function autosaveTimerFired() {
	console.log("AUTOSAVE!!");
	delete this.timeoutID;
	
	if (isEditorPage()) {
		console.log("it's an article");
		autosaveArticle();
	} else {
		// this is an ugly hack, I'm sure there's a better way to select senders
		var element = $("#" + this.sender);
		if (this.sender === "site_name_input") {
			console.log(element.val());
			saveSetting("site.name", {
				"apisecret" : apiSecret,
				"name"		: element.val()
			});
		} else if (this.sender === "account_name_input") {
			saveSetting("account.name", {
				"apisecret" : apiSecret,
				"name"		: element.val()
			});
		} else {
			autosaveFile();
		}
	}
}


function saveSetting(settingName, postObject) {
	// Could definitely be using this method in more places but right now who cares?
	$.ajax({
		type: "POST",
		url: "/api/settings/" + settingName,
		data: JSON.stringify(postObject),
		contentType: 'application/json; charset=UTF-8',
		success: function (response) {
			if (response.status == "OK") {
				console.log("Saved setting..." + settingName);
			} else {
				console.log(response);
				showError(response.error);
			}
		}
	});
}


function cancelTimeout() {
	if (typeof this.timeoutID == "number") {
		window.clearTimeout(this.timeoutID);
		delete this.timeoutID;
	}
}


$(document).ready(function() {
	
	// set up some of the initial app state


	mainButton().val(buttonTitle);
	this.cancelTimeout = function() {
		if (typeof this.timeoutID == "number") {
			window.clearTimeout(this.timeoutID);
			delete this.timeoutID;
		}
	};


	this.checkEmailExists = function(email) {
		if (email.length < 1)
			return;
		console.log("Will check for email " + email);
		var data = {
			username: $("input[name=login_email]").val(),
		};
		$.ajax({
			type: "GET",
			url: "/api/user/exists",
			data: data,
			success: function (response) {
				console.log(response);
				if (response.exists === true) {
					//alert("Yep!");
					console.log("yep!");
					$("input[name=do_login]").val("Log In");
					sendLogin = true;
				} else {
					//alert("Nope");
					console.log("nope");
					$("input[name=do_login]").val("Sign Up");
					sendLogin = false;
				}
			}
		});
		delete this.timeoutID;
	}

	var self = this;
	$("#login_email_input").keyup(function() {
		//console.log($(this).val());
		var email = $(this).val();

		self.cancelTimeout();


		self.timeoutID = window.setTimeout(function() {
			//console.log(email);
			self.checkEmailExists(email);
		}, 1000);
	})
	
	setupSettingsObjectIfNeeded();
	
	
	
});



// General functions

function contains(string, search) {
	return (string.indexOf(search) != -1);
}


function showError(error) {
	var autosaveLabel = $("#autosave_label");
	autosaveLabel.text(error);
}
