function showNewPassword(){
    const input = document.getElementById('passwordCreate');
    const icon = document.getElementById('visibilityCreatePassword');
    if(input.type === 'password'){
        input.type = 'text';
        icon.innerHTML = 'visibility';
    } else {
        input.type = 'password';
        icon.innerHTML = 'visibility_off';
    }
}

function showRepeatPassword(){
    const input = document.getElementById('passwordRepeat');
    const icon = document.getElementById('visibilityRepeatPassword');
    if(input.type === 'password'){
        input.type = 'text';
        icon.innerHTML = 'visibility';
    } else {
        input.type = 'password';
        icon.innerHTML = 'visibility_off';
    }
}

function CreateNewUser(){
    const userName = document.getElementById('userCreate').value;
    const password = document.getElementById('passwordCreate').value;
    const verifyPassword = document.getElementById('passwordRepeat').value;
    
    if(!userName){
        document.getElementById('userCreate').classList.add('input-red');
        document.getElementById('userCreate').placeholder = "What's your username?";

        return setTimeout(() => {
            document.getElementById('userCreate').classList.remove('input-red')
            document.getElementById('userCreate').placeholder = 'Username';
        }, 3000);
    }

    if(!password){
        document.getElementById('passwordCreate').classList.add('input-red');
        document.getElementById('passwordCreate').placeholder = "Enter the password";

        return setTimeout(() => {
            document.getElementById('passwordCreate').classList.remove('input-red')
            document.getElementById('passwordCreate').placeholder = 'Password';
        }, 3000);
    }

    if(verifyPassword !== password){
        document.getElementById('passwordRepeat').classList.add('input-red');
        document.getElementById('passwordRepeat').placeholder = "Invalid Password";

        return setTimeout(() => {
            document.getElementById('passwordRepeat').classList.remove('input-red')
            document.getElementById('passwordRepeat').placeholder = 'Repeat Password';
        }, 3000);
    }

    const newUser = axios.post("https://backend-api-recados-growdev.herokuapp.com/users", {userName: userName, password: password, verifyPassword: verifyPassword});

    newUser.catch((err) => modalErrorCreateUser(err.response.data.msg));
    newUser.then(() => modalSuccessCreateUser());
}

function modalErrorCreateUser(errorMsg){
    var myModal = new bootstrap.Modal(document.getElementById('Fail'), {});
    myModal.show();

    document.getElementById('errorMsg').innerHTML = `${errorMsg}`;
}

function modalSuccessCreateUser(){
    var myModal = new bootstrap.Modal(document.getElementById('Success'), {});
    myModal.show();

    document.getElementById('btnContinuar').addEventListener('click', () => {
        AbrirURL('index.html');
    });
}

function AbrirURL(href){
    return window.location.href = `${href}`
}