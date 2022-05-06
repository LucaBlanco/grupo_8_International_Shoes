window.addEventListener("load", function(){
    let nameInput = document.querySelector("#firstName");
    let emailInput = document.querySelector("#email");
    let passwordInput = document.querySelector("#password");
    let imageInput = document.querySelector("#image");    
    let imageType;
    let allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    let validForm = false;
    if (imageInput && imageInput.files[0] === undefined) {
        imageType = undefined;        
    }

    console.log("Se han completado las declaraciones");
    
    imageInput.addEventListener("change", function(){
        imageType = imageInput.files[0].type;
        console.log(imageType)
        if(validator.isMimeType(imageType) && validator.isIn(imageType, allowedImageTypes)){
            imageInput.classList.remove("registro-invalido");
            imageInput.classList.add("registro");
            document.querySelector("#errorImage").innerHTML = "";   
        }else{
            imageInput.classList.remove("registro");
            imageInput.classList.add("registro-invalido");
            document.querySelector("#errorImage").innerHTML = "La imagen debe ser JPG, JPEG, PNG o GIF.";   
        }        
    })
    nameInput.addEventListener("blur", function(){
        validForm = validator.isLength(nameInput.value, {min:2, max: undefined});
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

    function isEmailRegistered(email) {
        fetch("/api/users/"+emailInput.value)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                if(data.exist && data.exist == "no"){
                    document.querySelector("#errorMail").innerHTML = "";
                    emailInput.classList.remove("registro-invalido");
                    emailInput.classList.add("registro");
                }else{
                    document.querySelector("#errorMail").innerHTML = "Email ya registrado";
                    emailInput.classList.remove("registro");
                    emailInput.classList.add("registro-invalido");
                }                
            });
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

    let form = document.querySelector("#register");
    form.addEventListener("submit", function(e){
        if( validator.isLength(nameInput.value, {min:2, max: undefined}) 
            && validator.isEmail(emailInput.value) && validator.isStrongPassword(passwordInput.value) 
            && validator.isMimeType(imageType) 
            && validator.isIn(imageType, allowedImageTypes))
        {
            console.log("Exito")
        }else{
            console.log(imageType);
            console.log("Errores en formulario");
            e.preventDefault();
        }
     
    })

})
