const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for (var key of keys) {
    let value = key.dataset.key;
    key.addEventListener('click', () => {
    /*     console.log(value); */


        if (value === "clear") {
            input = "";
            display_input.innerHTML = 0;
            display_output.innerHTML = 0;
        }


        else if (value === "delete") {
            if (input === "") {
                display_input.innerHTML = 0;
            }
            else {
                input = input.slice(0, -1);
                display_input.innerHTML = input === "" ? 0 : cleanInput(input);
            }
        }



        else if (value === "=") {
            let result;

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

            display_output.innerHTML = cleanOutput(result);
        }



        else if (value === "brackets") {
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

            display_input.innerHTML = cleanInput(input);
        }



        else {
            if (validateInput(value)) {
                input += value;
                display_input.innerHTML = cleanInput(input);
            }
        }
    })
};



function cleanInput(input) {
    let input_array = input.split("");
    /* console.log(input_array); */
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = `<span class="operator">x</span>`
        }
        else if (input_array[i] == "(") {
            input_array[i] = `<span class="brackets">(</span>`
        }
        else if (input_array[i] == ")") {
            input_array[i] = `<span class="brackets">)</span>`
        }
        else if (input_array[i] == "+") {
            input_array[i] = `<span class="operator">+</span>`
        }
        else if (input_array[i] == "-") {
            input_array[i] = `<span class="operator">-</span>`
        }
        else if (input_array[i] == "%") {
            input_array[i] = `<span class="operator">%</span>`
        }
        else if (input_array[i] == "/") {
            input_array[i] = `<span class="operator">÷</span>`
        }
        else if (input_array[i] == "h") {
            input_array[i] = `<span class="operator">**</span>`
        }

    }
    return input_array.join("");
};



function cleanOutput(output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");

    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i -= 3) {
            output_array.splice(i, 0, ".");
        }
    }

    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
};


function validateInput(value) {
    let lastinput = input.slice(-1);
    console.log(lastinput);
    let operators = ["+", "-", "*", "/"];

    if (value === "." && lastinput === ".") {
        return false;
    }

    if (operators.includes(value)) {
        if (operators.includes(lastinput)) {
            return false;
            console.log("rossz")
        } else {
            return true;
        }
    }

    return true;
}

