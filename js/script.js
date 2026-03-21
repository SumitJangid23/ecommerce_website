
let products = [
  {id:1,name:"Men T-Shirt",price:499,category:"low",img:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990"},
  {id:2,name:"Running Shoes",price:999,category:"mid",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"},
  {id:3,name:"Wrist Watch",price:1499,category:"high",img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"},
  {id:4,name:"Men Jeans",price:1199,category:"high",img:"https://images.unsplash.com/photo-1582418702059-97ebafb35d09"},
  {id:5,name:"Hoodie",price:899,category:"mid",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7"},
  {id:6,name:"Cap",price:299,category:"low",img:"https://images.unsplash.com/photo-1521369909029-2afed882baee"},
  {id:7,name:"Sneakers",price:1299,category:"high",img:"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"},
  {id:8,name:"Backpack",price:799,category:"mid",
img:"https://images.unsplash.com/photo-1509762774605-f07235a08f1f"}
];


let cart = JSON.parse(localStorage.getItem("cart")) || [];


function showProducts(list){
  let container = document.getElementById("product-list");
  if(!container) return;

  container.innerHTML = "";

  list.forEach((p,index)=>{   

    container.innerHTML += `
      <div class="card" onclick="viewProduct(${p.id})">
        <img src="${p.img}">
        <div class="card-content">
          <h3>${p.name}</h3>
          <p class="price">₹${p.price}</p>

          <button onclick="event.stopPropagation(); addToCart(${p.id})">
            Add to Cart
          </button>

        </div>
      </div>
    `;
  });
}


if(document.getElementById("product-list")){
  showProducts(products);
}

function viewProduct(id){
  localStorage.setItem("productId", id);
  window.location.href = "product.html";
}



if(document.getElementById("product-detail")){
  let id = parseInt(localStorage.getItem("productId"));
  let product = products.find(p => p.id === id);

  if(product){
   document.getElementById("product-detail").innerHTML = `
  <div class="product-box">
    <img src="${product.img}">
    <div>
      <h2>${product.name}</h2>
      <p class="price">₹${product.price}</p>
      <p>High quality product with modern design.</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  </div>
`;
  } else {
    document.getElementById("product-detail").innerHTML = "<h2>Product not found</h2>";
  }
}
let searchInput = document.querySelector(".nav-right input");

if(searchInput){
  searchInput.addEventListener("input", ()=>{
    let value = searchInput.value.toLowerCase();

    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(value)
    );

    showProducts(filtered);
  });
}

function addToCart(id){
  let item = cart.find(p=>p.id===id);

  if(item){
    item.qty++;
  } else {
    let product = products.find(p=>p.id===id);
    cart.push({...product, qty:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function updateCart(){
  let el = document.getElementById("cart-count");
  if(el){
    let totalQty = cart.reduce((a,b)=>a+b.qty,0);
    el.innerText = totalQty;
  }
}
updateCart();



if(document.getElementById("cart-items")){
  let container = document.getElementById("cart-items");
  let total = 0;

  container.innerHTML = "";

  cart.forEach((p,index)=>{
    total += p.price * p.qty;

    container.innerHTML += `
      <div class="cart-item">
        <p>${p.name}</p>

        <div class="qty">
          <button onclick="changeQty(${index},-1)">-</button>
          <span>${p.qty}</span>
          <button onclick="changeQty(${index},1)">+</button>
        </div>

        <p>₹${p.price * p.qty}</p>

        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  let totalEl = document.getElementById("total");
  if(totalEl){
    totalEl.innerText = "Total: ₹" + total;
  }
}


function changeQty(i,val){
  cart[i].qty += val;

  if(cart[i].qty <= 0){
    cart.splice(i,1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}


function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}



let checkboxes = document.querySelectorAll("input[type=checkbox]");

if(checkboxes.length > 0){
  checkboxes.forEach(cb=>{
    cb.addEventListener("change",()=>{
      let checked = Array.from(document.querySelectorAll("input:checked")).map(x=>x.value);

      if(checked.length === 0){
        showProducts(products);
      } else {
        showProducts(products.filter(p => checked.includes(p.category)));
      }
    });
  });
}