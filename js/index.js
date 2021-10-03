document.addEventListener("DOMContentLoaded", () => {

    class UserName {
        constructor(name) {
            this.name = name;
            this.notes = [];
            this.noteTxt = [];
        }
    };

    let user = [];
    let activeUser = null;
    let activeNote = null;
    let userList = document.querySelector('.users');
    let userNameList = {
        name: document.querySelector('.input_name'),
        addBtn: document.querySelector('.btn-add'),
    };

    let notesListInfo = {
        noteList: document.querySelector('.notes'),
        txtList: document.querySelector('.txt'),
        title: document.querySelector('.note-title'),
        note: document.querySelector('.input-note'),
        addNoteBtn: document.querySelector('.add-note'),
    };



    function createNewUser(userName, i) {
        let userElem = document.createElement('div');
        userElem.classList.add('users_name');
        if (userName === activeUser)
            userElem.classList.add('active');
        userElem.dataset.index = i;
        userElem.append(`${userName.name}`);
        userElem.insertAdjacentHTML("beforeend", '<img class="arrow" src="./img/arrow2.png" alt="">');
        userElem.insertAdjacentHTML("beforeend", '<img class="cross" src="./img/123.png" alt="">');

        return userElem;
    };



    function showUserNames(userNames) {
        userList.innerHTML = "";
        let userElems = userNames.map((name, i) => createNewUser(name, i));
        userList.append(...userElems);
    };



    function addUser() {
        let name = userNameList.name.value;
        if (name.trim() === "") return;
        user.push(new UserName(name));
        showUserNames(user);
    }



    function showUserNotes() {
        if (activeUser === null) {
            notesListInfo.noteList.style.display = 'none';
            return;
        }
        let noteElems = activeUser.notes.map((n, i) => createNoteElem(n, i));
        notesListInfo.noteList.innerHTML = '';
        notesListInfo.noteList.append(...noteElems);
        notesListInfo.noteList.style.display = 'block';
    }



    function showNoteTxt() {
        if (activeNote === null) {
            notesListInfo.txtList.style.display = 'none';
            return;
        }
        let noteTxt = activeUser.noteTxt.map((n, i) => createNoteTxt(n, i));
        notesListInfo.txtList.innerHTML = '';
        notesListInfo.txtList.append(...noteTxt);
    }



    function createNoteElem(note, i) {
        let newNote = document.createElement('div');
        newNote.classList.add('note-elem');

        if (i == activeNote)
            newNote.classList.add('active');

        newNote.dataset.indexNote = i;
        newNote.append(`${note}`);
        newNote.insertAdjacentHTML("beforeend", '<img class="arrow" src="./img/arrow2.png" alt="">');
        newNote.insertAdjacentHTML("beforeend", '<img class="cross" src="./img/123.png" alt="">');
        return newNote;
    }



    function createNoteTxt(txt, i) {
        let newTxt = document.createElement('div');
        newTxt.classList.add('txt-elem');
        newTxt.style.display = 'none';

        if (i == activeNote)
            newTxt.style.display = 'block';

        newTxt.dataset.indexTxt = i;
        newTxt.append(`${txt}`);
        return newTxt;
    }


    userNameList.addBtn.addEventListener("click", () => addUser());


    notesListInfo.addNoteBtn.addEventListener('click', () => {
        let title = notesListInfo.title.value;
        let note = notesListInfo.note.value;
        if (activeUser === null)
            alert('Выберите пользователя!!!');
        else if (title.trim() === "" || note.trim() === "") {
            alert('Введите название или заметку');
            return;
        }
        activeUser.notes.push(notesListInfo.title.value);
        activeUser.noteTxt.push(notesListInfo.note.value);
        showUserNotes();
    })



    notesListInfo.noteList.addEventListener('click', (e) => {
        if (!e.target.matches('.note-elem'))
            return;
        let indexNote = e.target.dataset.indexNote;
        activeNote = indexNote;
        showUserNotes();
    });



    notesListInfo.noteList.addEventListener('click', (e) => {
        if (e.target.matches('.arrow') && e.target.parentNode.matches('.active')) {
            let arrow = e.target;
            arrow.classList.add('active-arrow');
            notesListInfo.txtList.style.display = 'block';
            showNoteTxt();
        } else if (e.target.matches('.cross') && e.target.parentNode.matches('.active')) {
            notesListInfo.txtList.style.display = 'none';
        }
    });



    userList.addEventListener('click', (e) => {
        if (!e.target.matches('.users_name'))
            return;
        let index = e.target.dataset.index;
        activeUser = user[index];
        showUserNames(user);

        userList.addEventListener('click', (e) => {
            if (e.target.matches('.arrow') && e.target.parentNode.matches('.active')) {
                let arrow = e.target;
                arrow.classList.add('active-arrow');
                showUserNotes();
            } else if (e.target.matches('.cross') && e.target.parentNode.matches('.active')) {
                notesListInfo.noteList.style.display = 'none';
            }
        });
    });

    showUserNotes();
    showUserNames(user);
});

