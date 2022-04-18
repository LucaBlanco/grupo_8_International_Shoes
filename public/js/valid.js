window.addEventListener("load", function(){
    let nameInput = document.querySelector("#firstName");
    let emailInput = document.querySelector("#email");
    let passwordInput = document.querySelector("#password");




    let validForm = false;
    
    nameInput.addEventListener("blur", function(){
        console.log(validator.isLength(nameInput.value, {min:2, max: undefined}));
        validForm = validator.isLength(nameInput.value, {min:2, max: undefined});
    })
    emailInput.addEventListener("blur", function(){
        validForm = validator.isEmail(emailInput.value);
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
                }
            })
            .catch(function(error){
                console.log("No se pudo validad email")
            })  
        console.log(settings)
    })
    passwordInput.addEventListener("blur", function(){
        //console.log(validator.isStrongPassword(passwordInput.value));
        validForm = validator.isEmail(emailInput.value);
    })

    let form = document.querySelector("#register");
    form.addEventListener("submit", function(e){
        if (validForm === false) {
            e.preventDefault()
        }        
    })

})
