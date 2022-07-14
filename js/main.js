// Array celle Bomba e numeri usciti
const bombArr = [];
const exitNumber = [];
// Definisco punti
let points = 0; 
// Definisco contenitori e pulsante play in variabili
const play = document.getElementById('play');
const start_alert = document.getElementById('start-alert');
const end_alert = document.getElementById('end-alert');
const container_game = document.getElementById('main-cont');
const points_container = document.getElementById('points-container');
// Funzione tasto Play - Riavvia
play.addEventListener('click',
    function () {
        const level = document.getElementById('d-level');
        const level_in = parseInt(level.value);
        let fin_l = class_level(level_in);
        console.log('Il livello é (level_in)' + ' ' + level_in);
    // Acquisisco numero celle in base alla difficoltà
        let cellNumb = level_selector(level_in);
        console.log(`La modalità impostata è: Livello ${level_in}. Create ${cellNumb} Celle`);
    // Generatore bombe
        for (let i = 1; i <= 16; i++) {
            let numbBomb = controlNumbers(exitNumber, 1, cellNumb);
            bombArr.push(numbBomb);
        }
        console.log(`I numeri nell'array bombe sono: ${bombArr}`)
    // Controllo stato bottone
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
                        this.classList.add('yetExit')
                        this.classList.toggle('clicked')
                    // Controllo numeri gia presenti
                        if (this.classList.contains('yetEx') == true) {
                            points = points;
                        } else {
                            cell.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
                            exitNumber.push(i);
                            points += 1;
                        }
                        console.log(`Numeri celle cliccate: ${exitNumber}`);
                        console.log(`Punteggio: ${points}`)
                    // Contatore punti
                        if (points => 1) {
                            points_container.innerHTML = `Punteggio: <span class="sp2">${points}</span>`;
                        } 
                    // Condizione di Vittoria
                        if (points >= cellNumb - 16) {
                            container_game.classList.add('d-none');
                            end_alert.classList.remove('d-none');
                            end_alert.innerHTML = `<h1>Hai Vinto!</h1>
                                            <p>Hai totalizzato ${points} punti</p>`;
                            points_container.innerHTML = '';
                        }
                        // Ciclo controllo numeri array bombe
                        let fnd_bomb = true;
                        while (fnd_bomb == false) {
                        // Gestione Punti
                            if (bombArr.includes(exitNumber) == false) {
                                fnd_bomb = true;
                                bombArr.classList.add('bomb');
                            // Schermata sconfitta
                                console.log('bomba trovata')
                                document.getElementsByClassName('sp2').style.color = 'red';
                                bombArr.innerHTML = '<i class="fa-solid fa-bomb"></i>';
                                end_alert.innerHTML = `<h1>Hai Perso!</h1>
                                                    <p>Hai totalizzato ${points} punti</p>`;
                            }
                        }
                    }
                );
            }
        }
    }
);
/********************************************** */
/******************* FUNZIONI ***************** */
/********************************************** */
// Generatore numeri casuali
function randomNumbGenerator(min, max) {
    let rnd = Math.floor(Math.random() * ((max - min + 1) + min));
    return rnd;
}
// Controllo numeri generati
function controlNumbers(usedNumb, min, max) {
    let final_numb = false;
    let randomNumb;
    while (final_numb == false) {
        randomNumb = randomNumbGenerator(min, max);
        if (!usedNumb.includes(randomNumb)) {
            final_numb = true;
        }
    }
    return randomNumb;
}
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
//Generatore celle
function cellGenerator() {
    let cell = document.createElement("div");
    cell.classList.add('cell', 'd-flex');
    return cell;
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