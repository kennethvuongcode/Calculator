const display = document.querySelector('#display');

window.addEventListener('keydown', function(e) {
    const keydown = document.querySelector(`button[data-key="${e.keyCode}"]`);
    keydown.style.background = '#EEEEEE';
})

window.addEventListener('keyup', function(e) {
    const keyup = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!keyup) return;
    keyup.style.background = '#DADADA';

    if (keyup.id == 'clear'){
        reset();
        return;
    }

    if (keyup.id == 'operate'){
        equalsFunction();
        return;
    }

    if (keyup.id == 'sign') {
        signFunction();
        return;
    }

    if (keyup.id == 'percentage'){
        percentageFunction();
        return;
    }

    if (keyup.classList.contains('operator')) {
        if (number.buttonCheck == false) {
            number.input = number.previousInput;    
            return; 
        }
    
            if (number.counter == 0 && number.start > 0)
                execute(number);
    
            if (number.start == 0){
                setOutput(number);
                number.start++;
            }
    
            number.previousOperator = number.operator;
    
            switch(keyup.id) {
                case 'addition':
                    number.operator = 'add';
                    break;
                case 'subtraction':
                    number.operator = 'subtract';
                    break;
                case 'multiplication':
                    number.operator = 'multiply';
                    break;                       
                case 'divide':
                    number.operator = 'divide';
                    break;
            }  
            
            number.active = true;
            number.buttonCheck = false;
            number.previousInput = number.input;
            number.tracker = 2;
            resetInput(number);

            return;
    }

    if (number.buttonCheck == false){
        number.buttonCheck = true;
        resetInput(number);
    }

    if (number.tracker == 1) {
        number.tracker = 0;
        resetInput(number);
    }

    if (number.active == false && number.counter != 0){
        console.log('works');
        number.output = 0;
        number.holder = number.input;
        number.equalCheck = true;
        resetInput(number);
    }

    if (number.signCheck == true){
        number.input = '-' + keyup.textContent;
        number.signCheck = false;
    }
    else if (number.input == 0) {
        if (number.decimalCheck == true)
            return;
        if (keyup.textContent == '.') 
            number.decimalCheck = true;
        number.input = keyup.textContent;
    }
    else {
        if (number.decimalCheck == true && keyup.textContent == '.')
            return;
        if (keyup.textContent == '.') 
            number.decimalCheck = true;
        number.input = number.input + keyup.textContent;
    }
    
    display.textContent =  number.input;
    number.counter = 0;
    number.active = true;

})

///////////// Keyboard Support ///////////////
// const key = document.querySelectorAll("button");
// key.forEach(button => {
//     button.addEventListener('keydown', (event) => {
//         console.log(event.key);
//         switch(event.key){
//             case 97:
//                 console.log(event.key);
//                 return;
//         }
//     })
// });






///////////// Display functions //////////////

//UI display function, clears display
const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    reset();
});

//UI display function, updates display when number pressed
const controls = document.querySelectorAll('.number');
controls.forEach(button => {
    button.addEventListener('click', () => {
        if (number.buttonCheck == false){
            number.buttonCheck = true;
            resetInput(number);
        }

        if (number.tracker == 1) {
            number.tracker = 0;
            resetInput(number);
        }

        if (number.active == false && number.counter != 0){
            console.log('works');
            number.output = 0;
            number.holder = number.input;
            number.equalCheck = true;
            resetInput(number);
        }

        if (number.signCheck == true){
            number.input = '-' + button.textContent;
            number.signCheck = false;
        }
        else if (number.input == 0) {
            if (number.decimalCheck == true)
                return;
            if (button.textContent == '.') 
                number.decimalCheck = true;
            number.input = button.textContent;
        }
        else {
            if (number.decimalCheck == true && button.textContent == '.')
                return;
            if (button.textContent == '.') 
            number.decimalCheck = true;
            number.input = number.input + button.textContent;
        }
        
        display.textContent =  number.input;
        console.log('input number: ' + number.input);
        number.counter = 0;
        number.active = true;

    });
});

function resetColor(button){
    button.style.color = '#3D3D3D';
    button.style.background = '#DADADA';
}

function invertColors(button){
    button.style.color = 'white';
    button.style.background = '#3CFF80';
}


////////////// Logic //////////////////

const sign = document.querySelector('#sign');
sign.addEventListener('click', () => {
    signFunction();
})

function signFunction() {
    number.previousOperator = 'sign';
    //if this is the first operation done, make number negative and set as output for next operation
    if (number.start == 0){
        number.output = number.input * -1;
        number.start++;
        resetInput(number);
        display.textContent = number.output;
        return;
    }

    if (number.active == false) {
        if (number.input == 0) {
            number.output = number.output * -1;
            display.textContent = number.output;
            return;
        }
            number.output = number.output * -1;
            display.textContent = number.output;
    }

    if (number.active == true) {
        if (number.input == 0) {
            number.signCheck = true;
            display.textContent = '-';
            return;
        }
        number.input = number.input * -1;
        display.textContent = number.input;
    }
}

const percentage = document.querySelector('#percentage');
percentage.addEventListener('click', () => {
    percentageFunction();
})

function percentageFunction() {

    console.log('number tracker: ' + number.tracker);

    if (number.tracker == 0) {
        number.output = number.input/100;
        display.textContent = number.output;
        number.tracker = 1;
        resetInput(number);
    } 
    else if (number.tracker == 1){
        number.output = number.output / 100;
        display.textContent = number.output;
        resetInput(number);
    }
    else if (number.tracker == 2){
        console.log('number counter: ' + number.counter);
        console.log('number output: ' + number.output);
        console.log('number input: ' +number.input);

    if (number.counter == 1)
        resetInput(number);

    if (number.output != 0 && number.input != 0) {
        number.output = number.output * number.input/ 100;
        display.textContent = roundFloat(number.output);
    }
    if (number.input == 0) {
        number.output = number.output / 100;
        display.textContent = roundFloat(number.output);
    }
    if (number.input != 0 && number.output == 0) {
        number.output = number.input;
        number.output = number.output/100;
        display.textContent = roundFloat(number.output);
    }
}

    number.previousOperator = 'percentage';
    number.counter = 0;
    number.start++;

}

//Object containing all relevant parameters
let number = {
    output: 0,
    input: 0,
    counter: 0,
    active: false,
    previousOperator: '',
    buttonCheck: true,
    signCheck: false,
    decimalCheck: false,
    previousInput: 0,
    equalCheck: false,
    tracker: 0,
    holder: 0,
    start: 0,
    operator:'add',
}

//Updates operator type 

let previousNode = document.querySelector('#addition');

const updateOperator = document.querySelectorAll('.operator');
updateOperator.forEach(button => {
    //animating flash
    button.addEventListener('mousedown', () => {
        button.style.background = '#EEEEEE';
    })
    button.addEventListener('mouseout', () => {
        if (previousNode.id != button.id)
            button.style.background = '#DADADA';
    })

    button.addEventListener('click', () => {
        //formatting previous color
        resetColor(previousNode);
        //highlighting current operation color
        invertColors(button);
        //pointing next formated color
        previousNode = document.querySelector(`#${button.id}`);

  
    if (number.buttonCheck == false) {
        number.input = number.previousInput;    
        return; 
    }

        if (number.counter == 0 && number.start > 0)
            execute(number);

        if (number.start == 0){
            setOutput(number);
            number.start++;
        }

        number.previousOperator = number.operator;

        switch(button.id) {
            case 'addition':
                number.operator = 'add';
                break;
            case 'subtraction':
                number.operator = 'subtract';
                break;
            case 'multiplication':
                number.operator = 'multiply';
                break;                       
            case 'divide':
                number.operator = 'divide';
                break;
        }  
        
        number.active = true;
        number.buttonCheck = false;
        number.previousInput = number.input;
        number.tracker = 2;
        resetInput(number);
    })
})

const equals = document.querySelector('#operate');
equals.addEventListener('click', () => {
    equalsFunction();
})

function equalsFunction() {
    console.log('------------------------');
    console.log('before execute:')
    console.log('operator: ' + number.operator);
    console.log('output: ' + number.output);
    console.log('input: ' + number.input + '\n\n');

    if (number.operator == '')
        return;
    
    if (number.equalCheck == true) {
        number.output = number.input;
        number.input = number.holder;
        number.equalCheck = false;
    }

    execute(number);
    number.counter = 1;
    number.tracker = 2;
    number.active = false;
    number.buttonCheck = true;

    resetColor(previousNode);

    console.log('after execute:')
    console.log('operator: ' + number.operator);
    console.log('output: ' + number.output);
    console.log('input: ' + number.input + '\n\n');
}

function execute(object) {
    if (object.input == '.')
        object.input = 0;
    object.output = operate(object.operator,object.output,object.input);
    if (typeof object.output == 'number')
        display.textContent = roundFloat(object.output);
    else {
        display.textContent = 'u dumb';
        setTimeout(() => {
            reset();
        }, 1000);
    }
    number.tracker = 2;
}



function reset() {
    number.output = 0;
    number.input = 0;  
    number.operator = '';
    number.counter = 0;
    number.active = false;
    number.previousOperator = '';
    number.previousInput = 0;
    number.equalCheck = false;
    number.signCheck = false;
    number.decimalCheck = false;
    number.tracker = 0;
    number.holder = 0;
    number.buttonCheck = true;
    number.start = 0;
    display.textContent = 0;
    console.clear();
    resetColor(previousNode);
    clear.style.background = '#ffa600';
}

function roundFloat(x) {
    let decimalPlaces = 7;
    let decimalPlaces2 = 10 ** decimalPlaces;
    return Math.round((x + Number.EPSILON) * decimalPlaces2) / decimalPlaces2;
}

function resetInput(object) {
    object.input = 0;
    object.decimalCheck = false;    
}

function setOutput(object) {
    object.output = object.input;
}
//function that executes an operator on two inputs
function operate(operator,x,y) {
    let numX = parseFloat(x);
    let numY = parseFloat(y);
    switch (operator) {
        case "add":
            return add(numX,numY);
        case "subtract":
            return subtract(numX,numY);
        case "multiply":
            return multiply(numX,numY);
        case "divide":
            return divide(numX,numY);       
    }

    return x;
}

//function that adds two numbers
function add(x,y) {
    return x + y;
  }
  
//function that subtracts two numbers
function subtract(x,y) {
    return x - y;
  }

//function that multiplies two numbers
function multiply(x,y) {
      return x * y;
  }
  
//function that divides two numbers
function divide(x,y) {
    if (y == 0)
        return "u dumb";

    return x / y;
  }