const keys = document.querySelectorAll(".key");
const display = document.querySelector(".display .input");
const alert = document.querySelector(".alert");
const btns = document.querySelectorAll('.btn')
const wrapper = document.querySelector('.wrapper');
const modern_keys = document.querySelector('.keys');
const calculator = document.querySelector('.calculator');
const display_modern = document.querySelector('.display');
const checkBox = document.querySelector('#mode');
const body = document.querySelector('.body');
let input = "";


for (var key of keys) {
    let value = key.dataset.key;

    key.addEventListener('click', () => {

        if (value === "clear") {
            input = "";
            display.innerHTML = '0';
        } else if (value === "delete") {
            if (input === "") {
                display.innerHTML = 0;
            }
            else {
                input = input.toString();
                input = input.slice(0, -1);
                display.innerHTML = input === "" ? 0 : cleanInput(input);
            }
        } else if (value === "=") {
            let result;
            input = input.toString();
            // Ellenőrizzük, hogy az input tartalmazza-e a '%' jelet
            if (input.includes('%')) {
                // Ha van '%' jel, akkor az értéket a háttérben százalékké alakítjuk
                result = eval(input.replace("%", "/100*"));
            } else if (input.includes('h')) {
                result = eval(input.replace('h', '**'));

            } else {
                // Ha nincs '%' jel, akkor normál értékkiértékelést végzünk
                result = eval(input);
            }
            input = cleanOutput(result);

            display.innerHTML = input;

        } else if (value === "brackets") {
            if (
                input.indexOf('(') == -1 ||
                input.indexOf(')') != -1 &&
                input.indexOf(')') != -1 &&
                input.lastIndexOf('(') <
                input.lastIndexOf(')')) {
                input += '(';
            } else if (
                input.indexOf('(') != -1 &&
                input.indexOf(')') == -1 ||
                input.indexOf('(') != -1 &&
                input.indexOf(')') != -1 &&
                input.lastIndexOf('(') > input.lastIndexOf(')')
            ) {
                input += ')';
            }

            display.innerHTML = cleanInput(input);
        } else {
            if (validateInput(value)) {

                input += value;
                display.innerHTML = cleanInput(input);
            }
        };
    })
};



function cleanInput(input) {
    let input_array = input.split("");
    console.log(input_array);
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] === "*") {
            input_array[i] = `<span class="operator">x</span>`
        }
        else if (input_array[i] === "(") {
            input_array[i] = `<span class="brackets">(</span>`
        }
        else if (input_array[i] === ")") {
            input_array[i] = `<span class="brackets">)</span>`
        }
        else if (input_array[i] === "+") {
            input_array[i] = `<span class="operator">+</span>`
        }
        else if (input_array[i] === "-") {
            input_array[i] = `<span class="operator">-</span>`
        }
        else if (input_array[i] === "%") {
            input_array[i] = `<span class="operator">%</span>`
        }
        else if (input_array[i] === "/") {
            input_array[i] = `<span class="operator">÷</span>`
        }
        else if (input_array[i] === "h") {
            input_array[i] = `<span class="operator">**</span>`
        }

    }
    return input_array.join("");
};



function cleanOutput(output) {

    formattedNumber = parseFloat(output.toFixed(6));
    let outputString = formattedNumber.toString();

    // Csak az első 20 karaktert mutatjuk meg
    return outputString.slice(0, 20);
};




function validateInput(value) {
    input = input.toString();
    let lastinput = input.slice(-1);

    let operators = ["+", "-", "*", "/"];
    let operatorsNotStart = ["+", "*", "/", "%", "h"];

    if (input.length >= 20) {
        alertShow();
        return false;
    }
    if (operatorsNotStart.includes(value) && display.innerHTML === '0') {
        return false;
    }

    if (value === "." && lastinput === ".") {
        return false;
    }

    if (operators.includes(value)) {
        if (operators.includes(lastinput)) {
            return false;
        } else {
            return true;
        }
    }

    return true;
};


function alertShow() {
    if (alert) {
        // Hozzáadja az "alertShow" class-t
        alert.classList.add('alertShow');

        // Vár 1,5 másodpercet, majd eltávolítja az "alertShow" class-t
        setTimeout(() => {
            alert.classList.remove('alertShow');
        }, 1500);
    }

}





function modern() {
    for (var btn of btns) {
        btn.classList.toggle('modern_btn');
    }
}



function checkModern() {
    if (checkBox.checked) {
    display_modern.classList.add("modern_display");
    modern_keys.classList.add('modern_keys');
    wrapper.classList.add('modern_wrapper');
    calculator.classList.add('modern_calculator');
    body.classList.add('modern_body');
    alert.classList.add('modern_alert');
    modern();
     } else {
        display_modern.classList.remove("modern_display");
        modern_keys.classList.remove('modern_keys');
        wrapper.classList.remove('modern_wrapper');
        calculator.classList.remove('modern_calculator');
        body.classList.remove('modern_body');
        alert.classList.remove('modern_alert');
        modern();
     }

}
document.getElementById('mode').addEventListener('change', checkModern);







;

// Eseménykezelő hozzáadása a checkboxhoz
checkBox.addEventListener('change', function() {
    // Kiválasztjuk az 'old' és 'modern' classú elemeket
    const oldElement = document.querySelector('.old');
    const modernElement = document.querySelector('.modern');

    // Ellenőrizzük, hogy a checkbox be van-e jelölve
    if (checkBox.checked) {
        // Ha igen, módosítsuk az 'old' és 'modern' classú elemek stílusát
        oldElement.style.color = '#eee'; // Példa: szín megváltoztatása
        modernElement.style.color = '#1b7ce4'; // Példa: vastagítás hozzáadása
    } else {
        // Ha nem, állítsuk vissza az eredeti stílust
        oldElement.style.color = '#25fed7'; // Példa: szín visszaállítása az eredetire
        modernElement.style.color = '#eee'; // Példa: vastagítás eltávolítása
    }
});
