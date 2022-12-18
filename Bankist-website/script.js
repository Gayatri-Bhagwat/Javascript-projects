'use strict';
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  // movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2022-12-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  // movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  
    movementsDates: [
      '2019-11-01T13:15:33.035Z',
      '2019-11-30T09:48:16.867Z',
      '2019-12-25T06:04:23.907Z',
      '2020-01-25T14:18:46.235Z',
      '2020-02-05T16:33:06.386Z',
      '2020-04-10T14:43:26.374Z',
      '2020-06-25T18:49:59.371Z',
      '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

/*let account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

let account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
*/

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const fomatCur = function(value,locale,currency){
  return new Intl.NumberFormat(locale,
    {
      style:'currency',
      currency:currency,
    }).format(value);
}
const formatMovement = function(dates,locale){
    
    const CaldaysPassed = (date1 , date2) => 
    Math.round(Math.abs(date2 - date1) /
    (1000 * 60 * 60 * 24));

    const daysPassed = CaldaysPassed(new Date(),dates);
    // console.log(daysPassed);
    
    if(daysPassed===0){
      return 'Today';
    }
    if(daysPassed===1){
      return 'Yesterday';
    }
    if(daysPassed <= 7){
      return `${daysPassed} days ago!`;
    }
  
      // const day = `${dates.getDate()}`.padStart(2,0);
      // const month = `${dates.getMonth()+1}`.padStart(2,0);
      // const year = `${dates.getFullYear()}`
      // return `${day}/${month}/${year}`;

      return new Intl.DateTimeFormat(locale).format(dates);
    
}
//DOM MANIPULATION - CREATING DOM ELEMENTS - 👇🏻
const displayMovements = function (account,sort=true) {
  containerMovements.innerHTML = '';//remove the earlier content

  const sortedMovements = 
  sort ? account.movements.slice().sort((a,b)=>a-b) : account.movements;
  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //adding date - 
    const dates = new Date(account.movementsDates[i])
    const currentDate = formatMovement(dates,account.locale);

    //FOTMATTED NUMBERS - 
    // const formattedMov = new Intl.NumberFormat(account.locale,
    // {
    //   style:'currency',
    //   currency:account.currency,
    // }).format(mov);

    

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
    ${i + 1} ${type}</div>
    <div class="movements__date">${currentDate}</div>
    <div class="movements__value">${fomatCur(mov,account.locale,account.currency)}</div>
    </div>`;
    //to insert the element in the HTML page - 
    //insert the element with movement-row class into the movement class
    containerMovements.insertAdjacentHTML('afterbegin', html);//adding the new child element after the parent element - so writen afterbegin
    // containerMovements.insertAdjacentHTML('beforeend', html);other method
  });
};


//all the content in the HTML page under movement class
// console.log(containerMovements.innerHTML);

//TO CREATE USERNAMES OF THE ACCOUNT HOLDERS - 👇🏻
const createUsername = function(accounts) {
  accounts.forEach(function(user){
    user.username = user.owner.toLowerCase().split(' ').
    map(name => name[0]).join('');
  })
}
createUsername(accounts);
// console.log(accounts);

//Calculating deposites,Withdrwals and interest
const calPrintBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc,current)=>acc+current,0);
  // console.log(balance);

  labelBalance.textContent=  fomatCur(acc.balance,acc.locale,acc.currency);
}

const calcDisplaySummary = function(acc) {
  const income = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc,current) => acc+current ,0);
  labelSumIn.textContent=fomatCur(Math.abs(income),acc.locale,acc.currency);

  const outcome =acc.movements
  .filter(mov => mov < 0)
  .reduce((acc,current) => acc+current ,0);
  labelSumOut.textContent=fomatCur(Math.abs(outcome),acc.locale,acc.currency);

  const interst = acc.movements
  .filter(mov => mov > 0)
  .map(deposite => (deposite* acc.interestRate)/100)
  .filter((int,i,arr) => {
    return int >= 1;
  })
  .reduce((acc,deposite) => acc+deposite,0); 
  labelSumInterest.textContent=fomatCur(Math.abs(interst),acc.locale,acc.currency);
}

const updateUI = function(acc){
   //Display Movements 
   displayMovements(acc);
   //Display balance
   calPrintBalance(acc);
   //Display summary 
   calcDisplaySummary(acc);
}

/*EXPERIMENTING API-INTERNATIONALIZATION 
const now = new Date();
const options = {
  hour:'numeric',
  minute:'numeric',
  day:'numeric',
  month:'long',
  year:'numeric',
  weekday:'long'
}
const locale = navigator.language;
console.log(locale);
labelDate.textContent=new Intl
.DateTimeFormat(locale,options)
.format(now);
*/

const startLogOutTimer = function() {
  
  const tick = function(){
    const min = `${Math.trunc(time/60)}`.padStart(2,0);
    const sec = time % 60;
    //in each call,print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    
    //when the time is at 0 seconds , stop timer and log out user
    if(time === 0){
      clearInterval(timer);
      labelWelcome.textContent='Log in to get started';
      containerApp.style.opacity=0;
    }
    //decrease 1 second 
    time--;
  }
  // set time to the 5 minutes
  let time = 120;
  
  //call the timer every second 
  tick();
  const timer = setInterval(tick,1000)
  return timer;
}
//IMPLEMENTING LOGIN - 
let currentAccount,timer;
btnLogin.addEventListener('click',function(e){
  e.preventDefault();//prevents form from submitting 
  // console.log("LOGIN");

  currentAccount = accounts.find(acc => (acc.username === inputLoginUsername.value));
  // console.log(currentAccount);
  //checked for the account as well
  if(currentAccount?.pin === +inputLoginPin.value){
    //Display UI and message 
    labelWelcome.textContent = `Welcome Back,${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity=1;

    /*CREATE CURRENT DATE - 
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2,0);
    const month = `${now.getMonth()+1}`.padStart(2,0);
    const year = `${now.getFullYear()}`
    const hour = `${now.getHours()}`.padStart(2,0);
    const min = `${now.getMinutes()}`.padStart(2,0);
    labelDate.textContent=`${day}/${month}/${year} , ${hour}:${min}`;
    */
    const now = new Date();
    const options = {
      hour:'numeric',
      minute:'numeric',
      day:'numeric',
      month:'long',
      year:'numeric',
      // weekday:'long'
    }
    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent=new Intl
    .DateTimeFormat(currentAccount.locale,options)
    .format(now);

    //Clear input fields - 
    inputLoginPin.value = inputLoginUsername.value =  '';
    //Looses the focus 
    inputLoginPin.blur();

    if(timer) clearInterval(timer) ;
    timer = startLogOutTimer();

    //Update UI
    updateUI(currentAccount);
   
  }
})

//TRANSFER MONEY IMPLEMENTATION-
btnTransfer.addEventListener('click',
function(e){
  e.preventDefault();
  const amount = +inputTransferAmount.value;//amount to transfer 
  const receiverAccount = accounts.find(acc=> //amount transfer to 
    acc.username === inputTransferTo.value
  );
  //After transfering the amount make both the fields empty
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && receiverAccount && currentAccount.balance >= amount && 
    receiverAccount?.username !== currentAccount.username){
      //DOING THE TRANSFER 
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);
      //creating date
      currentAccount.movementsDates.push(new Date());
      receiverAccount.movementsDates.push(new Date());
      //Update UI 
      updateUI(currentAccount);

      //RESET THE TIMER - 
      clearInterval(timer);
      timer = startLogOutTimer();
    }
})
//LOAN FUNCTIONALITY - 
btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(
    mov => mov >= amount*0.1)){
      setTimeout(function(){

        //Add movements
        currentAccount.movements.push(amount);
        //Add loan date - 
        currentAccount.movementsDates.push(new Date().toISOString());
        updateUI(currentAccount);

      //RESET THE TIMER - 
      clearInterval(timer);
      timer = startLogOutTimer();
      },2500)
    }
    inputLoanAmount.value = '';
})

//CLOSING ACCOUNT FEATURE - 
btnClose.addEventListener('click',function(e){
  e.preventDefault();
  
  if (Number(inputClosePin.value) === currentAccount.pin &&
  inputCloseUsername.value === currentAccount.username){
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
      );
      console.log(index);

      //delete account
      accounts.splice(index,1);

      //Hide UI
      containerApp.style.opacity=0;
    }
    inputClosePin.value = inputCloseUsername.value = '';
})

//CALCULATING TOTAL MONEY IN ALL THE ACCOUNT
const totalAmount = accounts.map(acc=>acc.movements)
.flat().reduce((acc,mov)=>acc+mov,0);
// console.log(totalAmount);

//FLATMAP => FLAT + MAP METHOD (using flatmap method) :- 
// const totalAmount = accounts.flatMap(acc=>acc.movements)
// .reduce((acc,mov)=>acc+mov,0);
// console.log(totalAmount);


//SORTING ARRAY - 
let sortedState = false;//to check whether the sort has happened or not
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,!sortedState);
  sortedState=!sortedState;
})

//ADDING DATES TO THE APPLICATION - 
//FAKE ALWAYS LOGGED IN - 
// currentAccount=account1;
// updateUI(currentAccount);
// containerApp.style.opacity=1;



//day/month/year
// LECTURES






/*MAP METHOD - RETURNS NEW ARRAY - 👇🏻
const movements = [200, 450, -400, 3000, -650, -130,
  70, 1300];

//convert the elements EURO TO  USD - returning new array containing USD 
const euroToUsd = 1.1;
const movementsEuroToUsd = movements.map(function(currentVal,i){
  console.log(`${i+1}:${currentVal*euroToUsd}`);
  return currentVal*euroToUsd;
});
console.log(movements);
console.log(...movementsEuroToUsd);
//Same probelm as above but using FOR-OF method-
const movementsUSD = [];
for(const mov of movements){
  movementsUSD.push(mov*euroToUsd);
}
console.log(...movementsUSD);
//MAP method using arrow functions - 👇🏻 
const arrowMap = movements.map(currentVal=>currentVal*euroToUsd)
console.log(arrowMap);

//MAP method to access index - 
const movementsDescriptions = movements.map((currentVal,i)=>{
  const check = (currentVal > 0) ? 'deposite' : 'withdraw';
  return `Movement ${i+1} : You ${check} ${Math.abs(currentVal)}\n`;
});
console.log(...movementsDescriptions);
*/

/*FILTER METHOD - RETURNS AN ARRAY AGAIN - 👇🏻
const movements = [200, 450, -400, 3000, -650, -130,
  70, 1300];

const deposites = movements.filter(function(mov){
  return mov > 0 ? true : false;//contains only the elements above 0
})
console.log(deposites);
const newDeposite = [];
for (const deposite of movements){
  if(deposite > 0) {
    newDeposite.push(deposite);
  }
}
console.log(newDeposite);

const withdrawal = movements.filter(mov=> mov < 0)
console.log(withdrawal);
*/

/*REDUCE METHOD - RETURNS AN ARRAY AGAIN - 👇🏻
acc -> previous value 
const balance = movements.reduce(function(acc,current,i,arr){
  console.log(`Iteration ${i}:${acc}`);
  return acc + current//addition of perviour(acc) and the current value(current)
},0);//0=initial value of accumulator (previous value) (acc)

const balance = movements.reduce((acc,current,i)=>acc+current);
console.log(balance);

//SAME PROBLEM USING FOR - OF - LOOP 
let balance2 = 0;
for (const mov of movements){
  balance2 += mov;
}
console.log(balance2);

//MAXIMUM VALUE OF THE MOVEMENT ARRAY - 
const movements = [200, 450, -400, 3000, -650, -130,
  70, 1300];
  const max = movements.reduce(function(acc,current,i){
    if(acc > current){
    return acc;
  }
  else{
    return current;
  }
},movements[0]);
console.log(max);
*/









