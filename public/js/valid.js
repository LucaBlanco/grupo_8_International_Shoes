window.addEventListener("load", function(){
    let nameInput = document.querySelector("#firstName");
    let emailInput = document.querySelector("#email");
    let passwordInput = document.querySelector("#password");
    let imageInput = document.querySelector("#image");
    let validForm = false;
    
    imageInput.addEventListener("change", function(){
        var type = imageInput.files[0].type;
        if(validator.isMimeType(type) && validator.isIn(type, ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'])){
            console.log(type + " es un mimetype aceptado");  
            imageInput.classList.remove("registro-invalido");
            imageInput.classList.add("registro");
            document.querySelector("#errorImage").innerHTML = "";   
        }else{
            console.log(type + " NO es un mimetype aceptado");
            imageInput.classList.remove("registro");
            imageInput.classList.add("registro-invalido");
            document.querySelector("#errorImage").innerHTML = "La imagen debe ser JPG, JPEG, PNG o GIF.";   
        }        
    })
    nameInput.addEventListener("blur", function(){
        validForm = validator.isLength(nameInput.value, {min:2, max: undefined});
        console.log(validForm)
        if (validForm == false) {
            nameInput.classList.remove("registro");
            nameInput.classList.add("registro-invalido");
            document.querySelector("#errorName").innerHTML = "El nombre no puede estar vacío, debe contener al menos 2 caracteres";            
        }else{
            nameInput.classList.remove("registro-invalido");
            nameInput.classList.add("registro");
            document.querySelector("#errorName").innerHTML = ""; 
        }
    })
    emailInput.addEventListener("blur", function(){
        validForm = validator.isEmail(emailInput.value);
        if(validForm == true){
            let email = 'email='+emailInput.value;
            let settings = {
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                "body": email
            }
            fetch("/users/api", settings)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data)
                    if(data.exist == "yes"){
                        document.querySelector("#errorMail").innerHTML = "Email ya registrado";
                        emailInput.classList.remove("registro");
                        emailInput.classList.add("registro-invalido");
                    }else{
                        document.querySelector("#errorMail").innerHTML = "";
                        emailInput.classList.remove("registro-invalido");
                        emailInput.classList.add("registro");
                    }
                })
                .catch(function(error){
                    console.log("No se pudo validad email")
                })  
            console.log(settings)            
        }else{
            document.querySelector("#errorMail").innerHTML = "Debes ingresar un e-mail válido, ej. nn@mail.com";
            emailInput.classList.remove("registro");
            emailInput.classList.add("registro-invalido");
        }

    })
    passwordInput.addEventListener("blur", function(){
        //console.log(validator.isStrongPassword(passwordInput.value));
        validForm = validator.isStrongPassword(passwordInput.value);
        console.log(validForm)
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

    let form = document.querySelector("#register");
    form.addEventListener("submit", function(e){
        if (validForm === false) {
            e.preventDefault()
        }        
    })

})
