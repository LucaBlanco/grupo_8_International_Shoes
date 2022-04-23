window.addEventListener("load", function(){
    let nameInput = document.querySelector("#nombre");
    let descriptionInput = document.querySelector("#descripcion");
    let imageInput = document.querySelector("#imagen");    
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
        validForm = validator.isLength(nameInput.value, {min:5, max: undefined});
        if (validForm == false) {
            nameInput.classList.remove("registro");
            nameInput.classList.add("registro-invalido");
            document.querySelector("#errorName").innerHTML = "El nombre no puede estar vacío, debe contener al menos 5 caracteres";            
        }else{
            nameInput.classList.remove("registro-invalido");
            nameInput.classList.add("registro");
            document.querySelector("#errorName").innerHTML = ""; 
        }
    })

    descriptionInput.addEventListener("blur", function(){
        validForm = validator.isLength(descriptionInput.value, {min:20, max: undefined});
        if (validForm == false) {
            descriptionInput.classList.remove("registro");
            descriptionInput.classList.add("registro-invalido");
            document.querySelector("#errorDesc").innerHTML = "La descripción no puede estar vacía, debe contener al menos 20 caracteres";            
        }else{
            descriptionInput.classList.remove("registro-invalido");
            descriptionInput.classList.add("registro");
            document.querySelector("#errorDesc").innerHTML = ""; 
        }
    })

    let form = document.querySelector("#createOrEdit");
    form.addEventListener("submit", function(e){
        if( 
            validator.isLength(nameInput.value, {min:5, max: undefined}) 
            && validator.isLength(descriptionInput.value, {min:20, max: undefined}) 
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
