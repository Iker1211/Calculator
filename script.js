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
            
        }
    }
})
