let cartBtn = document.querySelectorAll('.add-to-cart');
console.log(cartBtn);
let i = 1;
let array_list = [];
cartBtn.forEach(function (e) {
    e.addEventListener('click', function () {
        e.innerHTML = "Added to Cart" + `<i class="fa-solid fa-cart-shopping fa-bounce"></i>`
        let newEl = document.createElement('div');
        newEl.innerHTML = " Added Content " + i + " " + `<br></br>` + e.parentNode.parentNode.querySelector('.card-title').innerText + `<br></br>` + e.parentNode.parentNode.querySelector('.card-text-rs').querySelector('p').innerText + " rs ";
        newEl.style.borderBottom = '2px solid red';
        document.querySelector('.added-content').insertAdjacentElement('afterend', newEl);
        let btn = document.createElement("button");
        btn.innerText = "Pay";
        btn.classList.add('payment-btn');
        document.querySelector('.added-content').insertAdjacentElement('afterend', btn);
        newEl.classList.add('added-content-style');
        array_list.push(newEl.innerText);
        btn.addEventListener('click', function () {

            let newAlert = document.createElement('div');
            newAlert.innerHTML = `<div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Payment done successfully! </h4>
                </div>`
            newAlert.classList.add("new-alert");
            document.querySelector('.added-content').insertAdjacentElement('beforebegin', newAlert);
            newEl.remove();
            btn.remove();
            e.innerHTML = 'Add to Cart';

            setTimeout(() => {
                newAlert.style.display = 'none';
            }, 2000);

        })
        i = i + 1;
        localStorage.setItem('list', array_list);
        localStorage.getItem('list');
    })
})
