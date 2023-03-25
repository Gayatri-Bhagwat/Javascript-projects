'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btn = document.querySelector('.close-modal');

// this will only select the first element with the class show-modal as there
// are multiple buttons with the same class name;
const btnsOpenModel = document.querySelector('.show-modal');
console.log(btnsOpenModel);


const OpenModal = function() {
    // console.log(btnsOpenModal[i].textContent);
    modal.classList.remove('hidden');//we made it visible 
    overlay.classList.remove('hidden');
};

const CloseModal = function() {
    modal.classList.add('hidden');//for closing the modal we should add the hidden
    //functionality 
    overlay.classList.add('hidden');
};
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);
//logging the text content of each of the elements - 
for(let i=0;i< btnsOpenModal.length ;i++)
{
    btnsOpenModal[i].addEventListener('click',OpenModal);
}
btn.addEventListener('click',CloseModal);
overlay.addEventListener('click',CloseModal);

//handling the keypress event - 
//keydown event - occurs when we press any key on the keyboard
document.addEventListener('keydown',function(e)
{
    // console.log("The key was pressed!");
    console.log(e.key);//e is the object that javascript generates when any key is pressed.
    //e.key --> log the key to the conole which is pressed
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        //if the key pressed is escape then close the model
            //check whether the modal window is hidden or not , if it is not then close it!
            CloseModal();
            
    }   
});

