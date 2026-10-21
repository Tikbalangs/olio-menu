/* Vanilla JS — menu, filters, dialogs and browser-local shopping cart. */
const number = new Intl.NumberFormat('fa-IR');
const money = amount => `${number.format(amount)} تومان`;
const byId = id => products.find(product => product.id === Number(id));
const normalize = text => text.toLocaleLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').trim();

function readStorage(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
}

const savedFavourites = readStorage('olio-favourites', []);
const favourites = new Set(Array.isArray(savedFavourites) ? savedFavourites.filter(id => byId(id)).map(Number) : []);
const cart = new Map();
const savedCart = readStorage('olio-cart', []);
if (Array.isArray(savedCart)) savedCart.forEach(entry => {
    if (!Array.isArray(entry)) return;
    const product = byId(entry[0]), quantity = Number(entry[1]);
    if (product?.stock > 0 && Number.isInteger(quantity) && quantity > 0) cart.set(product.id, Math.min(quantity, product.stock));
});
const labels = {
    pizza: 'پیتزاهای اولیو',
    pasta: 'پاستاهای اولیو',
    starter: 'پیش‌غذاهای اولیو',
    drink: 'نوشیدنی‌های اولیو'
};
let activeCategory = 'pizza', onlyFavourites = false, submittedQuery = '', detailId = null;
let toastTimeout;
const list = document.querySelector('#products');
const search = document.querySelector('#search');
const productDialog = document.querySelector('#product-dialog');
const cartDialog = document.querySelector('#cart-dialog');
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function persist() {
    try {
        localStorage.setItem('olio-favourites', JSON.stringify([...favourites]));
        localStorage.setItem('olio-cart', JSON.stringify([...cart]));
    } catch {/* Private storage may be unavailable; in-memory use still works. */
    }
}

function notify(message) {
    const toast = document.querySelector('#toast');
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.hidden = true, 2200);
}

function animateIn(elements) {
    if (reducedMotion()) return;
    elements.forEach((el, index) => el.animate([{opacity: 0, transform: 'translateY(10px)'}, {
        opacity: 1,
        transform: 'translateY(0)'
    }], {duration: 260, delay: Math.min(index, 5) * 30, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'backwards'}));
}

function heartButton(product, extra = 'heart') {
    return `<button type="button" class="${extra}" data-action="like" data-id="${product.id}" aria-label="علاقه‌مندی: ${product.name}" aria-pressed="${favourites.has(product.id)}">${favourites.has(product.id) ? '♥' : '♡'}</button>`;
}

function cardCartControl(product) {
    const quantity = cart.get(product.id) || 0;
    if (!quantity) return `<button type="button" class="primary-button add-button" data-action="add" data-id="${product.id}" ${!product.stock ? 'disabled' : ''}>${product.stock ? 'افزودن به سبد +' : 'ناموجود'}</button>`;
    return `<div class="card-quantity" role="group" aria-label="تعداد ${product.name} در سبد"><button type="button" data-action="decrease" data-id="${product.id}" aria-label="کاهش تعداد ${product.name}">−</button><span class="quantity-value" aria-live="polite">${number.format(quantity)}<small>در سبد</small></span><button type="button" data-action="increase" data-id="${product.id}" aria-label="افزایش تعداد ${product.name}" ${quantity >= product.stock ? 'disabled' : ''}>+</button></div>`;
}

function render(animate = false) {
    const source = products.filter(p => onlyFavourites ? favourites.has(p.id) : submittedQuery ? true : p.category === activeCategory);
    const visible = source.filter(p => (!document.querySelector('#available-only').checked || p.stock > 0) && (!document.querySelector('#vegetarian-only').checked || p.vegetarian) && normalize(`${p.name} ${p.english} ${p.description}`).includes(submittedQuery));
    const sort = document.querySelector('#sort').value;
    if (sort === 'price-asc') visible.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') visible.sort((a, b) => b.price - a.price);
    document.querySelector('#section-title').textContent = onlyFavourites ? 'علاقه‌مندی‌های شما' : submittedQuery ? 'نتایج جست‌وجو' : labels[activeCategory];
    document.querySelector('#result-count').textContent = `${number.format(visible.length)} انتخاب خوشمزه`;
    document.querySelector('#fav-count').textContent = number.format(favourites.size);
    document.querySelector('#favourites').setAttribute('aria-pressed', String(onlyFavourites));
    document.querySelectorAll('[data-category]').forEach(button => {
        const selected = !onlyFavourites && !submittedQuery && button.dataset.category === activeCategory;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-pressed', String(selected));
    });
    list.innerHTML = visible.map(p => `<article class="product flex flex-col"><button type="button" class="photo-button" data-action="details" data-id="${p.id}" aria-label="جزئیات ${p.name}"><div class="photo-wrap"><img src="assets/${p.image}" alt="${p.name}" width="360" height="360" loading="lazy"></div></button>${heartButton(p)}<div class="product-body flex-1"><h3><button type="button" data-action="details" data-id="${p.id}">${p.name}</button></h3><span class="english" lang="en" dir="ltr">${p.english}</span><span class="stock-label ${p.stock ? '' : 'unavailable'}">${p.stock ? '● موجود' : '● فعلاً ناموجود'}${p.vegetarian ? ' · گیاهی' : ''}</span><p>${p.description}</p><div class="price-row"><span class="price">${number.format(p.price)} <small>تومان</small></span><span class="tag">${p.tag}</span></div>${cardCartControl(p)}</div></article>`).join('');
    const empty = document.querySelector('#empty');
    empty.hidden = visible.length > 0;
    empty.textContent = onlyFavourites && !favourites.size ? 'هنوز غذایی رو لایک نکردی. قلب کنار غذا رو بزن.' : 'نتیجه‌ای پیدا نشد؛ عبارت جست‌وجو یا فیلترها رو تغییر بده.';
    if (animate) animateIn(visible.length ? [...list.children] : [empty]);
    updateCartBar();
}

function updateCartBar() {
    let count = 0, total = 0;
    for (const [id, qty] of cart) {
        count += qty;
        total += byId(id).price * qty;
    }
    document.querySelector('#cart-count').textContent = number.format(count);
    document.querySelector('#cart-total').textContent = money(total);
    return {count, total};
}

function addToCart(id, quantity = 1) {
    const product = byId(id);
    if (!product || !product.stock) return;
    const current = cart.get(product.id) || 0;
    if (current + quantity > product.stock) {
        notify('بیشتر از موجودی نمی‌تونی اضافه کنی.');
        return;
    }
    cart.set(product.id, current + quantity);
    persist();
    render();
    if (cartDialog.open) renderCart();
    notify(`${product.name} به سبد اضافه شد.`);
}

function openDialog(dialog) {
    if (!dialog.open) dialog.showModal();
    if (!reducedMotion()) dialog.animate([{opacity: 0, transform: 'translateY(12px)'}, {
        opacity: 1,
        transform: 'translateY(0)'
    }], {duration: 200});
}

function showDetails(id) {
    const product = byId(id);
    if (!product) return;
    detailId = product.id;
    const remaining = product.stock - (cart.get(product.id) || 0);
    document.querySelector('#product-details').innerHTML = `<img src="assets/${product.image}" alt="${product.name}" width="600" height="450" class="mb-5 aspect-[4/3] w-full rounded-2xl object-cover"><div class="flex items-start justify-between gap-3"><div><h2 id="product-title" class="!m-0">${product.name}</h2><p class="mt-1 font-serif italic text-ink/60" dir="ltr" lang="en">${product.english}</p></div>${heartButton(product, 'secondary-button text-wine text-2xl')}</div><p class="mt-4 text-sm leading-8 text-ink/75">${product.description}</p><dl class="my-5 grid grid-cols-2 gap-4 rounded-xl bg-cream p-4 text-sm"><div><dt class="text-ink/60">اندازه</dt><dd class="mt-1">${product.portion}</dd></div><div><dt class="text-ink/60">موجودی نمونه</dt><dd class="mt-1">${product.stock ? number.format(product.stock) + ' عدد' : 'ناموجود'}</dd></div><div class="col-span-2"><dt class="text-ink/60">مواد حساسیت‌زا</dt><dd class="mt-1">${product.allergens}</dd></div></dl><div class="flex flex-wrap items-center justify-between gap-4"><strong>${money(product.price)}</strong><div class="flex items-center gap-2"><label for="detail-quantity" class="text-sm">تعداد</label><input id="detail-quantity" type="number" min="1" max="${Math.max(remaining, 1)}" value="1" class="w-16 rounded-xl border border-ink/20 p-2 text-center" ${remaining <= 0 ? 'disabled' : ''}></div></div><button id="detail-add" class="primary-button mt-5 w-full" type="button" ${remaining <= 0 ? 'disabled' : ''}>${!product.stock ? 'فعلاً ناموجود' : remaining <= 0 ? 'حداکثر موجودی در سبد' : 'افزودن به سبد خرید'}</button>`;
    openDialog(productDialog);
}

function renderCart() {
    const {count, total} = updateCartBar();
    const items = document.querySelector('#cart-items');
    items.innerHTML = [...cart].map(([id, qty]) => {
        const p = byId(id);
        return `<article class="flex gap-3 py-5"><img src="assets/${p.image}" alt="${p.name}" width="80" height="80" class="size-20 shrink-0 rounded-xl object-cover"><div class="min-w-0 flex-1"><h3 class="text-sm font-bold">${p.name}</h3><p class="mt-1 text-xs text-ink/60">هر عدد ${money(p.price)}</p><div class="mt-3 flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-3"><button type="button" class="qty-button" data-cart="plus" data-id="${id}" aria-label="افزایش تعداد ${p.name}" ${qty >= p.stock ? 'disabled' : ''}>+</button><span class="text-sm" aria-label="تعداد ${number.format(qty)}">${number.format(qty)}</span><button type="button" class="qty-button" data-cart="minus" data-id="${id}" aria-label="کاهش تعداد ${p.name}">−</button></div><button type="button" class="text-xs text-wine underline" data-cart="remove" data-id="${id}" aria-label="حذف ${p.name}">حذف</button></div><p class="mt-3 text-sm font-bold">${money(p.price * qty)}</p></div></article>`;
    }).join('') || '<p class="py-10 text-center text-sm text-ink/65">سبدت خالیه؛ یک غذای خوشمزه انتخاب کن.</p>';
    document.querySelector('#order-summary').innerHTML = count ? `<div class="mt-3 rounded-2xl bg-cream p-5 text-sm"><h3 class="mb-4 font-bold">خلاصهٔ خرید</h3><div class="flex justify-between"><span>جمع محصولات (${number.format(count)} عدد)</span><span>${money(total)}</span></div><div class="mt-3 flex justify-between text-ink/65"><span>هزینهٔ اضافه در این نمونه</span><span>۰ تومان</span></div><div class="mt-4 flex justify-between border-t border-ink/15 pt-4 font-bold"><span>مبلغ کل</span><span>${money(total)}</span></div><p class="mt-4 text-xs leading-6 text-ink/65">این نسخه نمایشی است. سفارش ارسال نمی‌شود و پرداختی انجام نمی‌گیرد.</p></div><button type="button" data-close class="secondary-button mt-4 w-full">ادامهٔ انتخاب غذا</button>` : '';
}

// All item actions use delegation, including products generated after filtering.
document.addEventListener('click', event => {
    const close = event.target.closest('[data-close]');
    if (close) {
        close.closest('dialog').close();
        return;
    }
    const action = event.target.closest('[data-action]');
    if (!action) return;
    const id = Number(action.dataset.id);
    if (action.dataset.action === 'details') showDetails(id);
    if (action.dataset.action === 'add') {
        addToCart(id);
        list.querySelector(`[data-action="increase"][data-id="${id}"]`)?.focus();
    }
    if (action.dataset.action === 'increase' || action.dataset.action === 'decrease') {
        const product = byId(id), quantity = cart.get(id) || 0;
        if (action.dataset.action === 'increase' && quantity < product.stock) cart.set(id, quantity + 1);
        if (action.dataset.action === 'decrease') {
            if (quantity <= 1) cart.delete(id); else cart.set(id, quantity - 1);
        }
        persist();
        render();
        (list.querySelector(`[data-action="${action.dataset.action}"][data-id="${id}"]`) || list.querySelector(`[data-action="add"][data-id="${id}"]`))?.focus();
    }
    if (action.dataset.action === 'like') {
        favourites.has(id) ? favourites.delete(id) : favourites.add(id);
        persist();
        render();
        if (productDialog.open) {
            const button = productDialog.querySelector('[data-action="like"]');
            button.setAttribute('aria-pressed', String(favourites.has(id)));
            button.textContent = favourites.has(id) ? '♥' : '♡';
        } else list.querySelector(`[data-action="like"][data-id="${id}"]`)?.focus();
    }
});
productDialog.addEventListener('click', event => {
    if (!event.target.closest('#detail-add')) return;
    const input = document.querySelector('#detail-quantity');
    const quantity = Number(input.value);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > Number(input.max)) {
        input.reportValidity();
        return;
    }
    addToCart(detailId, quantity);
    productDialog.close();
});
cartDialog.addEventListener('click', event => {
    const button = event.target.closest('[data-cart]');
    if (!button) return;
    const id = Number(button.dataset.id);
    const quantity = cart.get(id) || 0;
    const product = byId(id);
    if (button.dataset.cart === 'remove' || (button.dataset.cart === 'minus' && quantity <= 1)) cart.delete(id); else if (button.dataset.cart === 'minus') cart.set(id, quantity - 1); else if (button.dataset.cart === 'plus' && quantity < product.stock) cart.set(id, quantity + 1);
    persist();
    render();
    renderCart();
    (cartDialog.querySelector(`[data-cart="${button.dataset.cart}"][data-id="${id}"]`) || cartDialog.querySelector('[data-close]')).focus();
});
document.querySelector('form.search').addEventListener('submit', event => {
    event.preventDefault();
    submittedQuery = normalize(search.value);
    render(true);
});
document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    onlyFavourites = false;
    submittedQuery = '';
    search.value = '';
    render(true);
}));
document.querySelector('#favourites').addEventListener('click', () => {
    onlyFavourites = !onlyFavourites;
    submittedQuery = '';
    search.value = '';
    render(true);
});
['available-only', 'vegetarian-only', 'sort'].forEach(id => document.getElementById(id).addEventListener('change', () => render(true)));
document.querySelector('#reset-filters').addEventListener('click', () => {
    document.querySelector('#available-only').checked = false;
    document.querySelector('#vegetarian-only').checked = false;
    document.querySelector('#sort').value = 'default';
    submittedQuery = '';
    search.value = '';
    render(true);
});
document.querySelector('#cart-open').addEventListener('click', () => {
    renderCart();
    openDialog(cartDialog);
});
['restaurant-info', 'about-more'].forEach(id => document.getElementById(id)?.addEventListener('click', () => openDialog(document.querySelector('#info-dialog'))));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
}));
render();
