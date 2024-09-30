
// DOM elements
const billbox = document.getElementById("bill");
const NoOfPplBox = document.getElementById("no-of-people");
const tipAmountPerhead = document.getElementById("tip-perhead");
const totalPerHead = document.getElementById("total-perhead");
const resetButton = document.getElementById("button");

const customTipInput = document.getElementById("custom"); // Custom input field for custom tip

// Tip list and tip buttons
const tipList = {
    tip5: 0.05,
    tip10: 0.1,
    tip15: 0.15,
    tip25: 0.25,
    tip50: 0.5
};

const tips = ["tip5", "tip10", "tip15", "tip25", "tip50"];
const tipBoxes = {};

// Variable to store the chosen tip percentage
let chosenTip = 0;
let lastClickedButton = null;

// Populate tipBoxes with corresponding DOM elements
for (let i = 0; i < tips.length; i++) {
    tipBoxes[tips[i]] = document.querySelector("." + tips[i]);
}

// Function to handle tip selection
function tipChoose() {
    Object.keys(tipBoxes).forEach((key) => {
        const element = tipBoxes[key];
        
        if (element) {
            element.addEventListener("click", () => {
                // Reset the previous button's background color
                if (lastClickedButton !== null && lastClickedButton !== element) {
                    lastClickedButton.style.backgroundColor = "hsl(183, 100%, 15%)";  // Original color
                }

                // Set the clicked button's background color
                element.style.backgroundColor = "hsl(172, 67%, 45%)";  // Highlighted color
                
                // Update the chosen tip percentage
                chosenTip = tipList[key];
                
                // Update the last clicked button
                lastClickedButton = element;
                
                // Log for debugging purposes
                console.log("Chosen tip value:", chosenTip);

                // Perform the calculation once the tip is chosen
                calculateTipAndTotal();
            });
        }
    });

    // Special handling for the custom tip button
    customTipInput.addEventListener("input", () => {
        // Reset the last clicked button's background color
        if (lastClickedButton !== null) {
            lastClickedButton.style.backgroundColor = "hsl(183, 100%, 15%)";
        }

        // Highlight the custom input as active
        customTipInput.style.backgroundColor = "hsl(172, 67%, 45%)";

        // Update the chosen tip percentage with the custom value
        const customValue = parseFloat(customTipInput.value) / 100; // Convert percentage to decimal
        if (!isNaN(customValue) && customValue > 0) {
            chosenTip = customValue;
        }

        // Clear lastClickedButton because custom input is now active
        lastClickedButton = null;

        // Perform the calculation once the custom tip is input
        calculateTipAndTotal();

        console.log("Chosen custom tip value:", chosenTip);
    });
}

// Function to calculate tip amount per head and total per head
function calculateTipAndTotal() {
    const inputBill = parseFloat(billbox.value) || 0;  // Get and parse the bill value
    const inputNo = parseInt(NoOfPplBox.value) || 1;  // Get and parse the number of people

    if (inputBill > 0 && inputNo > 0 && chosenTip > 0) {
        const tipAmount = (inputBill * chosenTip) / inputNo;
        const totalAmount = (inputBill / inputNo) + tipAmount;

        // Update the UI with the calculated values
        tipAmountPerhead.innerHTML = "$" + tipAmount.toFixed(2);
        totalPerHead.innerHTML = "$" + totalAmount.toFixed(2);
    }
}

// Reset button function
function reset() {
    billbox.value = "0.00";
    NoOfPplBox.value = "1";
    tipAmountPerhead.innerHTML = "$0.00";
    totalPerHead.innerHTML = "$0.00";

    // Reset the tip buttons and chosenTip
    if (lastClickedButton !== null) {
        lastClickedButton.style.backgroundColor = "hsl(183, 100%, 15%)";
    }

    // Reset custom tip input
    customTipInput.value = "";
    customTipInput.style.backgroundColor = "hsl(183, 100%, 15%)";

    lastClickedButton = null;
    chosenTip = 0;
}

// Event listener for the reset button
resetButton.addEventListener("click", reset);

// Event listener for the bill input (optional if needed)
billbox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculateTipAndTotal();  // Trigger calculation when Enter is pressed
    }
});

// Initialize tip selection
tipChoose();

