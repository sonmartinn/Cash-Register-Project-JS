let price = 19.5;
let cid = [
  ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
];

const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDisplay = document.getElementById("change-due");

const currencyUnits = [
  { name: 'PENNY', value: 0.01 },
  { name: 'NICKEL', value: 0.05 },
  { name: 'DIME', value: 0.10 },
  { name: 'QUARTER', value: 0.25 },
  { name: 'ONE', value: 1 },
  { name: 'FIVE', value: 5 },
  { name: 'TEN', value: 10 },
  { name: 'TWENTY', value: 20 },
  { name: 'ONE HUNDRED', value: 100 }
];

priceScreen.textContent = `Total: $${price}`;

const updateCashDrawer = () => {
  cashDrawerDisplay.innerHTML = ""
  cid.forEach(unit => {
    cashDrawerDisplay.innerHTML += `<p>${unit[0]}: $${unit[1]}</p>`;
  });
}

window.onload = () => {
  updateCashDrawer();
}

const calculateChange = (cashGiven) => {
  let changeDue = cashGiven - price; 
  let totalCashDrawer = cid.reduce((total, [unit, amount]) => total + amount, 0).toFixed(2); 
  let changeArray = [];
  let remainingChange = changeDue; 

  if (changeDue < 0) {
    alert("Insufficient funds from customer.");
    return;
  }
  if (Number(totalCashDrawer) < changeDue) {
    changeDueDisplay.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    const { name, value } = currencyUnits[i]; 
    let availableAmount = cid[i][1]; 
    let amountToGive = 0;

    while (remainingChange >= value && availableAmount >= value) {
      amountToGive += value; 
      remainingChange = (remainingChange - value).toFixed(2);
      availableAmount = (availableAmount - value).toFixed(2);
      cid[i][1] = (cid[i][1] - value).toFixed(2);
      console.log(remainingChange);
      console.log(availableAmount);
      console.log(cid[i][1]);
    }

    if (amountToGive > 0) {
      changeArray.push([name, amountToGive.toFixed(2)]);
    }
  }

  
  if (Number(remainingChange) > 0) {
    console.log(remainingChange);
    changeDueDisplay.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  console.log(totalCashDrawer);
  if (Number(totalCashDrawer) === changeDue) {
    changeDueDisplay.textContent = "Status: CLOSED";
  } else {
    changeDueDisplay.textContent = "Status: OPEN";
  }

  changeArray.forEach((value) => {
    changeDueDisplay.innerHTML += `<p>${value[0]}: $${value[1]}</p>`;
  });
  updateCashDrawer();
};


purchaseBtn.addEventListener("click", () => {
  const cashGiven = parseFloat(cashInput.value);
  if (isNaN(cashGiven) || cashGiven <= 0) {
    alert("Please enter a valid amount of cash.");
  } else if (cashGiven < price) {
    alert("Customer does not have enough money to purchase the item.");
  } else if (cashGiven === price) {
    changeDueDisplay.textContent = "No change due - customer paid with exact cash";
  } else {
    calculateChange(cashGiven);
  }
});
