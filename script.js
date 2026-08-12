/* ================= CART ================= */

let cart = [];


/* ADD PRODUCT */

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to your cart!");
}


/* UPDATE CART */

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(product => {

        totalItems += product.quantity;

        totalPrice +=
            product.price * product.quantity;

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        totalPrice.toLocaleString("en-IN");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach((product,index) => {

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <div>

                <h4>${product.name}</h4>

                <small>
                    ₹${product.price} / sq.ft
                </small>

                <br><br>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>


            <div>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index},-1)">
                        −
                    </button>

                    <strong>
                        ${product.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${index},1)">
                        +
                    </button>

                </div>

                <br>

                <strong>
                    ₹${(
                        product.price *
                        product.quantity
                    ).toLocaleString("en-IN")}
                </strong>

            </div>

        `;

        cartItems.appendChild(item);

    });

}


/* CHANGE QUANTITY */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index,1);

    }

    updateCart();

}


/* REMOVE PRODUCT */

function removeFromCart(index) {

    cart.splice(index,1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


/* CLOSE CART */

function closeCart(event) {

    if (
        !event ||
        event.target.id === "cartOverlay"
    ) {

        document
            .getElementById("cartOverlay")
            .classList.remove("active");

    }

}


/* ================= SEARCH ================= */

function searchProducts() {

    const searchValue =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const text =
            product.innerText.toLowerCase();


        if (text.includes(searchValue)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* ================= FILTER ================= */

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    let message =
        "Hello Sahiba Marble House!%0A%0A";

    message +=
        "I would like to order:%0A%0A";


    let total = 0;


    cart.forEach(product => {

        const productTotal =
            product.price *
            product.quantity;

        total += productTotal;


        message +=
            "• " +
            product.name +
            " × " +
            product.quantity +
            " = ₹" +
            productTotal +
            "%0A";

    });


    message +=
        "%0ATotal: ₹" +
        total +
        "%0A%0A";

    message +=
        "Please contact me regarding this order.";


    /*
       IMPORTANT:
       Replace 919999999999 with
       Sahiba's actual WhatsApp number.

       Example:
       India number 9876543210
       becomes:
       919876543210
    */

    const phoneNumber =
        "919999999999";


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );

}
