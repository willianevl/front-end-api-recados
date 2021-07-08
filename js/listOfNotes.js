window.addEventListener('load', () => {
    ShowNotes();
});

function AbrirURL(href){
    return window.location.href = `${href}`
}

async function ShowNotes() {
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf)

    const data = await axios.get(`https://backend-api-recados-growdev.herokuapp.com/users/${UserID}/notes`).then((response) => response.data.data);

    const content = document.getElementById('tableBody');

    let indice = 0;
    let i = 1;
    data.forEach((note) => {
        content.innerHTML += `
        <tr> 
            <td>${i}</td>
            <td>${note.title}</td>
            <td>${note.description}</td>
            <td>
                <button class='btn-azul' onclick="editNote(${indice})">EDIT</button>
                <button class = 'btn-red' onclick="deleteNote(${indice})">DELETE</button>
            </td>
        </tr>
        `
        i++
        indice++
    });
}

function CreateNewNote(){
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf);

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const newNote = axios.post(`https://backend-api-recados-growdev.herokuapp.com/users/${UserID}/notes`, {title: title, description: description});

    if(!title){
        document.getElementById('title').classList.add('input-red');
        document.getElementById('title').placeholder = 'Enter a Title';
        
        return setTimeout(() => {
            document.getElementById('title').classList.remove('input-red');
            document.getElementById('title').placeholder = 'Title';
        }, 3000);
    }

    if(!description){
        document.getElementById('description').classList.add('input-red');
        document.getElementById('description').placeholder = 'Enter a Description';
        
        return setTimeout(() => {
            document.getElementById('description').classList.remove('input-red');
            document.getElementById('description').placeholder = 'Description';
        }, 3000);
    }

    // document.getElementById('description').value;

    newNote.catch((error) => modalCreateNoteFail(error.response.data.msg))
    newNote.then(() => AbrirURL('inLogin.html'))
}

function modalCreateNoteFail(errorMsg){
    var myModal = new bootstrap.Modal(document.getElementById('CreateNoteFail'), {});
    myModal.show();

    document.getElementById('errorCreateNote').innerHTML = errorMsg;
}

async function editNote(indice){
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf)

    const data = await axios.get(`https://backend-api-recados-growdev.herokuapp.com/users/${UserID}/notes`).then((response) => response.data.data);

    const SelectedObject = data[indice];

    document.getElementById('editedTitle').value = SelectedObject.title;
    document.getElementById('editedDescription').value = SelectedObject.description;

    const NoteID = JSON.stringify(SelectedObject.id);
    localStorage.setItem('NoteID', NoteID)

    openModalToEdit();
}

function SaveChanges(){
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf);

    const NoteInf = localStorage.getItem('NoteID');
    const NoteID = JSON.parse(NoteInf);
    console.log(NoteID)

    const title = document.getElementById('editedTitle').value;
    const description = document.getElementById('editedDescription').value;

    const ATTNote = axios.put(`https://backend-api-recados-growdev.herokuapp.com/users/${UserID}/notes/${NoteID}`, {title: title, description: description});


    ATTNote.catch((error) => ATTNoteFail(error.response.data.msg));
    ATTNote.then(() => AbrirURL('inLogin.html'));
}

function ATTNoteFail(errorMsg){
    var myModal = new bootstrap.Modal(document.getElementById('ATTNoteFail'), {});
    myModal.show();

    document.getElementById('editError').innerHTML = errorMsg;

    document.getElementById('abrirModalNovamente').addEventListener('click', () => {
        openModalToEdit();
    });
}

function openModalToEdit(){
    var myModal = new bootstrap.Modal(document.getElementById('editNoteModal'), {});
    myModal.show();
}

async function deleteNote(indice){
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf)

    const data = await axios.get(`https://backend-api-recados-growdev.herokuapp.com/users/${UserID}/notes`).then((response) => response.data.data);

    const SelectedObject = data[indice];

    document.getElementById('deleteText').innerHTML = `Você quer deletar o recado ${SelectedObject.title}?`

    const NoteID = JSON.stringify(SelectedObject.id);
    localStorage.setItem('NoteID', NoteID)

    openModalToConfirmDelete();
}

async function confirmDelete(){
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf);

    const NoteInf = localStorage.getItem('NoteID');
    const NoteID = JSON.parse(NoteInf);

    axios.delete(`https://backend-api-recados-growdev.herokuapp.com/users/${UserID}/notes/${NoteID}`).then(() => AbrirURL('inLogin.html'))
}

function openModalToConfirmDelete(){
    var myModal = new bootstrap.Modal(document.getElementById('confirmDelete'), {});
    myModal.show();
}

document.getElementById('homePage').addEventListener('click', () => {
    AbrirURL('inLogin.html');
});

function Logout(){
    localStorage.removeItem('UserInf');
    localStorage.removeItem('NoteID');
    AbrirURL('index.html');
}