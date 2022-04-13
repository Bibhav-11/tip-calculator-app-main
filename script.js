const billInput = document.getElementById("bill");
const noOfPeople = document.getElementById("noOfPeople");
const customValue = document.getElementById("custom_value");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const inputButton = document.querySelectorAll('.input__button');
const resetBtn = document.querySelector(".reset__btn");

//GLOBAL VARIABLES
let selectedTip, bill, people, custom;

//FUNCTIONS

//Store Input
function currentInput() {
    bill = Number(billInput.value);
    people = Number(noOfPeople.value);
    custom = selectedTip?.dataset.tip || Number(customValue.value);
}

//Update tip value
function updateTip() {
    if(people !== 0) {
        tip = (bill*custom/100)/people; 
        tipAmount.textContent = `$${tip.toFixed(2)}`;
    }
}

//Update total value
function updateTotal() {
    total = tip+bill/people;  
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

//Reset everything
function reset() {
    resetInput(billInput);
    resetInput(noOfPeople);
    resetInput(customValue);

    resetAmount();
    inputButton.forEach(b => b.classList.remove("selected"));
}

//Reset all input values
function resetInput(input, value = '') {
    input.value = value;
    input.blur();
}

//Result tip and total amount
function resetAmount() {
    tipAmount.textContent = totalAmount.textContent = '$0.00';
}

//Update tip and total amount
function updateAmount() {
    currentInput();
    updateTip();
    updateTotal();
}

//EVENT LISTENERS

//Bill input
billInput.addEventListener("input" , e => {
    updateAmount();
});

//People Input
noOfPeople.addEventListener("input" , e => {
    currentInput();
    if(people === 0 || people === "") {
        noOfPeople.classList.add("error");
        document.querySelector(".error-message").classList.add("error");
        resetAmount();
    }
    else {
        updateTip();
        updateTotal();
        noOfPeople.classList.remove("error");
        document.querySelector(".error-message").classList.remove("error");
    }
});


//Tip input custom
customValue.addEventListener("input" , e => {
    inputButton.forEach(b => b.classList.remove("selected"));
    selectedTip = null;
    updateAmount();
});

//Tip input buttons
inputButton.forEach(button => {
    button.addEventListener("click", function(e) {
        inputButton.forEach(b => b.classList.remove("selected"));
        selectedTip = e.target;
        selectedTip.classList.add("selected");

        updateAmount();
        resetInput(customValue);
        billInput.classList.remove("error");
    })
})

//Reset Button
resetBtn.addEventListener("click", reset);

