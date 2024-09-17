
var user=document.getElementById("user")
var pwd=document.getElementById("pwd")
var passworderror=document.getElementById("passworderror")
var usererror=document.getElementById("usererror")

function login(){
    usererror.innerText=""
    passworderror.innerText=""
    nonEmpty(validate);
}

function nonEmpty(callback){
    if(user.value.trim() === "" || pwd.value.trim() === ""){
        if (user.value.trim() === ""){
            usererror.innerText="username can't be empty"
        }
        if (pwd.value.trim() === ""){
            passworderror.innerText="password can't be empty"
        }
        return false
    }
    else{
        
        callback();
    }    
}


function validate(){
    if (user.value=="admin" && pwd.value=="12345"){
        window.location.href="home.html"
    }
    else{
        if(user.value != "admin"){
            usererror.innerText="invalid username"
        }
        if(pwd.value != "12345"){
            passworderror.innerText="invalid password"
        }
    }
}



