// Array celle Bomba e numeri usciti
const bombArr = [];
const exitNumber = [];

// Definisco punti
let points = 0; 

// Definisco contenitori e pulsante play in variabili
const start_alert = document.getElementById('start-alert');
const container_game = document.getElementById('main-cont');
const play = document.getElementById('play');

// Funzione tasto Play - Riavvia
play.addEventListener('click',
    function () {
        const level = document.getElementById('d-level');
        const level_in = parseInt(level.value);
        let fin_l = class_level(level_in);
        console.log('Il livello é (level_in)' + ' ' + level_in);
        if (play.innerHTML == 'Riavvia') {
            location.reload()
        } else {
        // Modifiche Schermata
            play.innerHTML = 'Riavvia'
            play.classList.remove('vib');
            level.classList.add('d-none');
            document.querySelector('label').classList.add('d-none');
            start_alert.classList.add('roll');
        // Imposto timeout per permettere animazione
            setTimeout(exitEnter, 1000);
        // Acquisisco numero celle in base alla difficoltà
            let cellNumb = level_selector(level_in);
            console.log(`La modalità impostata è: Livello ${level_in}. Create ${cellNumb} Celle`);
        // Creazione contenitore e aggiunta classi
            let cellCont = document.createElement("div");
            cellCont.classList.add('inner-cont', 'bounce', 'd-flex');
            container_game.append(cellCont);
            // Ciclo creazione celle
            for (let i = 1; i <= cellNumb; i++) {
                const cell = cellGenerator();
                cell.classList = `${fin_l} cell`;
                cell.innerHTML += i;
                cellCont.append(cell);
                
                // Aggiunta event listner celle
                cell.addEventListener('click',
                    function () {
                        this.innerHTML = i;
                        this.classList.toggle('clicked')
                        this.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
                        points += 1;
                        console.log(i);

                        exitNumber.push(i);
                        
                        console.log(exitNumber + ' ' + 'Exit numbers')
                        console.log(points + ' ' + 'punti')
                    });
                }
        }
        console.log(points)
    }
);
/********************************************** */
/******************* FUNZIONI ***************** */
/********************************************** */
//Funzione uscita avviso ed entrata container
function exitEnter () {
    start_alert.classList.add('d-none');
    container_game.classList.remove('d-none');
    return;
}
// Funzione Scelta livello
function level_selector(level_in) {
    if (level_in == 1){
        select = 100;
    }
    else if (level_in == 2) {
        select = 81;
    } else if (level_in == 3) {
        select = 49;
    }
    return select;
}
// Funzione aggiunta classi dimensioni celle
function class_level (level) {
    let fin_l;
    if (level == 1) {
        fin_l = 'easy';
    } else if (level == 2) {
        fin_l = 'int';
    } else if (level == 3) {
        fin_l = 'diff';
    }
    return fin_l;
}
//Generatore celle
function cellGenerator () {
    let cell = document.createElement("div");
    cell.classList.add('cell','d-flex');
    return cell;
}
// Generatore numeri casuali
function randomNumbGenerator(min, max) {
    let rnd = Math.floor(Math.random() * ((max - min + 1) + min));
    return rnd;
}







