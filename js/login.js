const listOfUsers = [];

window.addEventListener('load', async () => {
    await axios.get("https://backend-api-recados-growdev.herokuapp.com/users").then((response) => {
        response.data.data.forEach((user) => {
            listOfUsers.push(user);
        });
    });
});

function AbrirURL(href){
    return window.location.href = `${href}`
}

function showPassword(){        
    const input = document.getElementById('password');
    const icon = document.getElementById('visibility');
    
if(input.type === 'password'){
    input.type = 'text';
    icon.innerHTML = 'visibility';
} else {
    input.type = 'password';
    icon.innerHTML = 'visibility_off';
}
}

function login(){
    const userName = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    const user = listOfUsers.find((f) => f.userName === userName);

    console.log(user);


    if (!user){
        modalLoginFailbyUserName();
    }

    if(user.password !== password){
        modalLoginFailbyPassword();
    }

    const UserInf = JSON.stringify(user.id)
    localStorage.setItem('UserInf', UserInf)

    if(user.userName === userName && user.password === password){
        AbrirURL('inLogin.html'); 
    }
}

function modalLoginFailbyUserName(){
    var myModal = new bootstrap.Modal(document.getElementById('loginFailbyUser'), {});
    myModal.show();
}

function modalLoginFailbyPassword(){
    var myModal = new bootstrap.Modal(document.getElementById('loginFailbyPassword'), {});
    myModal.show();
}