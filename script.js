const calc_keys = document.querySelector('.buttons');  
const user_input = document.querySelector('#user-input');
const calculator = document.querySelector('.calculator');
const display_result = document.querySelector('#result');

let is_equals_pressed = false;
let equation = 0;
let check_for_decimal = '';

calc_keys.addEventListener('click', (event) => {

    if(!event.target.closest('button')) return;

    const key = event.target;
    const key_value = key.textContent;
    let input_display = user_input.textContent;
    const { type } = key.dataset;
    const { previous_key_type } = calculator.dataset;

    //Button is pressed
    if(type === 'number' && !is_equals_pressed){

        if (input_display === '0'){
            user_input.textContent = (previous_key_type === 'operator') ? input_display + key_value : key_value;
            equation = (previous_key_type === 'operator') ? equation + key.value : key.value;
            check_for_decimal = check_for_decimal + key_value;

        } else {
    
            if (check_for_decimal.length >= 23){
                let replace_number = check_for_decimal;
                check_for_decimal = Number(check_for_decimal).toExponential(2);
                user_input.textContent = input_display.replace(replace_number, check_for_decimal);

            } else {
                user_input.textContent = user_input.textContent.includes('N') ? 'NaN' :
                user_input.textContent.includes('I') ? 'Infinity' : input_display + key_value;

                equation = equation + key.value;
                check_for_decimal = check_for_decimal + key_value;
            }
        }
    }

    if ( type === 'operator' && previous_key_type !== 'operator'
        && !is_equals_pressed && !input_display.includes('Infinity')) {
            check_for_decimal = '';
            user_input.textContent = input_display + ' ' + key_value + ' ';
            equation = equation + ' ' + key.value + ' ';
        }

    if (type === 'decimal' && (previous_key_type === 'number' || input_display === '0')
        && !is_equals_pressed && !input_display.includes('Infinity')) {
        
        if (!check_for_decimal.includes('.')) {
            user_input.textContent = input_display + key_value;
            equation = equation + key.value;
            check_for_decimal = check_for_decimal + key_value;
        }
    }

    if ((type === 'backspace' || type === 'reset') && input_display !== '0') {

        if (type === 'backspace' && !is_equals_pressed) {
            user_input.textContent = input_display.substring(0, input_display.length - 1);
            equation = equation.substring(0, equation.length -1);
            check_for_decimal = check_for_decimal.substring(0, check_for_decimal.length -1);

        } else {
            input_display = '0';
            user_input.textContent = input_display;
            display_result.innerHTML = '&nbsp';
            is_equals_pressed = false;
            equation = '';
            check_for_decimal = '';
        }
    }

    if (type === 'equal') {
        is_equals_pressed = true;
        const final_result = handle_equation(equation);

        if (final_result || final_result === 0) {
            display_result.textContent = (!Number.isInteger(final_result)) ? final_result.toFixed(2) :
            (final_result.toString().length >= 16) ? final_result.toExponential(2) : final_result ;

        } else {
            display_result.textContent = 'Math Error';
        }
    }

    calculator.dataset.previous_key_type = type;
});

function calculate(first_number, operator, second_number) {

    first_number = Number(first_number);
    second_number = Number(second_number);

    if (operator === 'plus' || operator === '+') return first_number + second_number;
    if (operator === 'minus' || operator === '-') return first_number - second_number;
    if (operator === 'multiply' || operator === 'x') return first_number * second_number;
    if (operator === 'divide' || operator === '/') return first_number / second_number;
    if (operator === 'remainder' || operator === '%') return first_number % second_number;
};

function handle_equation(equation) {

    equation = equation.split(" ");
    const operators = ['/', 'x', '%', '+', '-'];
    let first_number;
    let second_number;
    let operator;
    let operator_index;
    let result;

    for (var i = 0; i < operators.length; i++) {

        while(equation.includes(operators[i])) {

            operator_index = equation.findIndex(item => item === operators[i]);
            first_number = equation[operator_index-1];
            operator = equation[operator_index];
            second_number = equation[operator_index+1];
            result = calculate(first_number, operator, second_number);
            equation.splice(operator_index -1, 3, result);
        }
    }

    return result;
}

// Event Listener for keyboard button press
document.addEventListener('keydown', (event) => {
	
	let getOperators = {
		'/': 'divide',
		'x': 'multiply',
		'*': 'multiply',
		'%': 'remainder',
		'+': 'plus',
		'-': 'minus'
	}

	if(!isNaN(event.key) && event.key !== ' '){
		document.getElementById(`digit-${event.key}`).click();
	}
	if (['/', 'x', '+', '-', '*', '%'].includes(event.key)) {
		document.getElementById(getOperators[event.key]).click();
	}
	if (event.key === 'Backspace' || event.key ==='c' || event.key === 'C') {
		document.getElementById('clear').click();	
	}
	if (event.key === '=' || event.key === 'Enter') {
		document.getElementById('equals').click();	
	}
	if (event.key === '.') {
		document.getElementById('decimal').click();	
	}
});

