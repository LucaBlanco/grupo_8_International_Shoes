window.addEventListener("load", function(){
    let emailInput = document.querySelector("#email");
    let passwordInput = document.querySelector("#password");
    passwordInput.disabled = true;
    let validForm = false;

    console.log("Se han completado las declaraciones");

    function isEmailRegistered(email) {
        fetch("/api/users/"+emailInput.value)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                if(data.exist && data.exist == "no"){
                    document.querySelector("#errorMail").innerHTML = "Tu e-mail no está registrado";
                    emailInput.classList.remove("registro");
                    emailInput.classList.add("registro-invalido");
                    passwordInput.disabled = true;                    
                }else{
                    document.querySelector("#errorMail").innerHTML = "";
                    emailInput.classList.remove("registro-invalido");
                    emailInput.classList.add("registro");
                    passwordInput.disabled = false;
                }
            })
            .catch(function(error){
                console.log("No se pudo validar email")
            })    
    }

    emailInput.addEventListener("blur", function(){
        validForm = validator.isEmail(emailInput.value);
        if(validForm == true){
            let email = emailInput.value;
            isEmailRegistered(email)
        }else{
            document.querySelector("#errorMail").innerHTML = "Debes ingresar un e-mail válido, ej. nn@mail.com";
            emailInput.classList.remove("registro");
            emailInput.classList.add("registro-invalido");
        }

    })
    passwordInput.addEventListener("blur", function(){
        validForm = validator.isStrongPassword(passwordInput.value);
        if (validForm == false) {
            passwordInput.classList.remove("registro");
            passwordInput.classList.add("registro-invalido");
            document.querySelector("#errorPassword").innerHTML = "Longitud > = 8 incluya letras mayúsculas, minúsculas, un número y un carácter especial.";            
        }else{
            passwordInput.classList.remove("registro-invalido");
            passwordInput.classList.add("registro");
            document.querySelector("#errorPassword").innerHTML = ""; 
        }

    })

    let form = document.querySelector("#login");
    form.addEventListener("submit", function(e){
        if( validator.isEmail(emailInput.value) && validator.isStrongPassword(passwordInput.value)){
            console.log("Exito")
        }else{
            console.log("Errores en formulario");
            e.preventDefault();
        }
     
    })

})
