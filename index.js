/*  
    Questo script gestisce una lista di elementi con inserimento, modifica e rimozione. 
    I dati vengono salvati nel LocalStorage per la persistenza.

    Funzioni:

    - Inserimento Dinamico di elementi di testo in una lista non ordinata
    - Manipolazione di elementi per la Modifica del contenuto
    - Rimozione di elementi della lista secondo la scelta dell'utente
    - Salvataggio e Caricamento lista nel localStorage per persistenza dati
    - Gestione degli eventi per le operazioni base  
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
            <p class="text">${input.value}</p>
            <div class="actionButtons">
                <button class="done">✓</button>
                <button class="remove">X</button>
            </div>         
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
        input.setAttribute('class', 'inputEdit');
        
        // Sostituzione del paragrafo con l'input
        paragraph.replaceWith(input); 
    
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


    // Funzione per rimuovere un elemento <li>
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


    // Gestione click per pulsanti Edit, Remove e Done
    // Controllo per verificare quale pulsante sia stato premuto
    headerList.addEventListener('click', (event) => {

        // Modifica testo 
        if (event.target.classList.contains('text')) {
            const paragraph = event.target.closest('li').querySelector('p');
            editElement(paragraph);

         // Rimozione Elemento <li>
        } else if (event.target.classList.contains('remove')) {
            const li = event.target.closest('li');
            removeElement(li);

         // Aggiunta line-through a elemento <p>
        } else if (event.target.classList.contains('done')) {{
            let paragraph = event.target.closest('li').querySelector('p');
            paragraph.style.textDecoration = (paragraph.style.textDecoration === 'line-through') ? 'none' : 'line-through';
        }}
    });
});