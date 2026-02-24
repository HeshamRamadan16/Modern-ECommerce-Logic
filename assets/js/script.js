

const products = [
    { 
        id: 1, 
        name: "ساعة أبل الجيل الثامن", 
        price: 15500, 
        img : "assets/img/ساعه ابل الجيل الثامن.jpg"
    },
    { 
        id: 2, 
        name: "سماعة سوني WH-1000", 
        price: 12000, 
        img: "https://m.media-amazon.com/images/I/51SKmu2G9FL._AC_SL1500_.jpg" 
    },
    { 
        id: 3, 
        name: "ماوس جيمنج لوجيتك", 
        price: 2500, 
        img: "assets/img/mouse.jpg" 
    },
    { 
        id: 4, 
        name: "لوحة مفاتيح ميكانيكية", 
        price: 3200, 
        img: "assets/img/keyboard.jpg"
    }
];

let cart = [];


function displayProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(p => `
        <div class="col-md-3">
            <div class="card h-100 product-card shadow-sm text-center">
                <img src="${p.img}" class="product-img" alt="${p.name}">
                <div class="card-body">
                    <h6 class="fw-bold">${p.name}</h6>
                    <p class="text-primary">${p.price.toLocaleString()} جنيه</p>
                    <button class="btn btn-outline-primary btn-sm w-100" onclick="addToCart(${p.id})">
                        إضافة للسلة
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    renderCart();
    document.getElementById('cartSidebar').classList.add('active'); // افتح السلة تلقائياً
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const countLabel = document.getElementById('cartCount');
    const totalLabel = document.getElementById('cartTotal');

    countLabel.innerText = cart.length;
    
    let total = 0;
    cartContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="d-flex align-items-center mb-3 p-2 border-bottom">
                <img src="${item.img}" width="50" class="me-3">
                <div class="flex-grow-1">
                    <div class="small fw-bold">${item.name}</div>
                    <div class="text-muted small">${item.price} ج.م</div>
                </div>
                <button class="btn btn-sm text-danger" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    totalLabel.innerText = total.toLocaleString();
}


document.getElementById('cartIcon').onclick = () => document.getElementById('cartSidebar').classList.toggle('active');
document.getElementById('closeCart').onclick = () => document.getElementById('cartSidebar').classList.remove('active');


displayProducts();

function checkout() {
    if (cart.length === 0) {
        // رسالة تنبيه لو السلة فاضية بشكل شيك
        Swal.fire({
            title: 'السلة فارغة!',
            text: 'يا ريت تختار منتجات الأول قبل إتمام الطلب.',
            icon: 'warning',
            confirmButtonText: 'تمام'
        });
        return;
    }

    // رسالة نجاح إتمام الطلب
    Swal.fire({
        title: 'تم استلام طلبك بنجاح! 🎉',
        html: `إجمالي المبلغ: <b>${document.getElementById('cartTotal').innerText} جنيه</b> <br> جاري تحضير أجهزتك الذكية.`,
        icon: 'success',
        confirmButtonText: 'ممتاز',
        confirmButtonColor: '#0d6efd' // لون الزرار أزرق زي الـ Bootstrap
    });

    // تصفير السلة وتحديث الواجهة
    cart = [];
    renderCart();

    // قفل السلة الجانبية
    document.getElementById('cartSidebar').classList.remove('active');
}