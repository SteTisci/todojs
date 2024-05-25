/*  
    Questo script gestisce una lista di elementi con inserimento, modifica e rimozione. 
    I dati vengono salvati nel LocalStorage per la persistenza.

    Funzioni:

    - Aggiunge elementi con testo, pulsante "Modifica" e "Rimuovi".
    - Permette la modifica del testo cliccando su "Modifica".
    - Elimina elementi cliccando su "Rimuovi".
*/



// Lo script viene eseguito solo dopo che la pagina e' stata caricata
document.addEventListener('DOMContentLoaded', () => {
    const headerList = document.querySelector('#headerList');


    // Funzione per creare e inserire un elemento <li> nella lista
    const insertElement = () => {
        const input = document.querySelector('.toDoText');
        
        if (input.value === "") return;

        // Creazione del nuovo elemento <li> con il testo dell'input e i pulsanti Edit e Remove
        const li = document.createElement('li');
        li.innerHTML = `
            <p>${input.value}</p>
            <button class="edit">Edit</button>
            <button class="remove">Remove</button>
            <hr class="divider">
        `;
        headerList.appendChild(li);
        addToLocalStorage();  // Salvataggio del nuovo stato nel LocalStorage
        input.value = "";   // Reset dell'input
    }


    // Funzione per modificare un elemento <p> esistente
    const editElement = (paragraph) => {
        // Creazione di un input di testo con il contenuto del paragrafo
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', paragraph.innerHTML);
        paragraph.replaceWith(input); // Sostituzione del paragrafo con l'input
    

        // Funzione per salvare le modifiche e ripristinare il paragrafo
        const saveEdit = () => {
            paragraph.innerHTML = input.value.trim();
            input.replaceWith(paragraph);
            addToLocalStorage();
        };
    
        // Salvataggio modifiche quando l'input perde il focus
        input.addEventListener('blur', saveEdit);
    
        input.focus();
    }


    // Funzione per rimuovere un elemento <li> dalla lista
    const removeElement = (li) => {
        li.remove();
        addToLocalStorage();
    }


    // Funzione per salvare la lista corrente nel LocalStorage per la persistenza dei dati
    const addToLocalStorage = () => {
        const items = [];

        headerList.querySelectorAll('li').forEach((li) => {
            items.push(li.innerHTML);
        });
        localStorage.setItem('todos', JSON.stringify(items));
    }


    // Funzione per caricare la lista salvata dal LocalStorage
    const loadFromLocalStorage = () => {
        const savedItems = JSON.parse(localStorage.getItem('todos'));

        // Controllo se ci sono elementi salvati nel LocalStorage
        if (savedItems) {
            savedItems.forEach((innerHTML) => {
                if (innerHTML) {
                    const li = document.createElement('li');
                    li.innerHTML = innerHTML;
                    headerList.appendChild(li);
                }
            });
        }    
    }


    // Gestione inserimento elementi quando il pulsante Add viene cliccato
    document.querySelector('#InsertButton').addEventListener('click', insertElement);
    loadFromLocalStorage();


    // Gestione click per pulsanti Edit e Remove
    headerList.addEventListener('click', (event) => {
        // Controllo per verificare quale pulsante sia stato premuto
        if (event.target.classList.contains('edit')) {
            const paragraph = event.target.previousElementSibling; // Selezione del paragrafo associato al pulsante Edit
            editElement(paragraph);
        } else if (event.target.classList.contains('remove')) {
            const li = event.target.parentElement; // Selezione dell'elemento <li> associato al pulsante Remove
            removeElement(li);
        }
    });
});