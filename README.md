# Olio Menu

### Italian-inspired design. A Persian dining experience.

[English](#english) · [فارسی](#فارسی)

## English

Olio is a responsive, Persian-language restaurant menu with a right-to-left interface. This front-end portfolio project combines a warm Italian-inspired visual identity with interactive product browsing, favourites, and a browser-local shopping cart.

Built with **HTML5, Tailwind CSS 4, and vanilla JavaScript**, with custom CSS for the curved header and rounded product cards.

### Preview

![Olio restaurant menu — full-page desktop preview](docs/olio-menu-preview.png)

### Features

- Four active categories: pizza, pasta, starters, and drinks.
- Product photos, descriptions, prices, and availability indicators.
- Search across all categories, submitted with Enter or the search button.
- Availability and vegetarian filters, plus price sorting.
- Product detail modals with portion sizes and sample allergen information.
- Likes and a dedicated favourites view.
- Inline quantity controls on product cards and quantity editing in the cart.
- Automatic order totals and an itemised shopping summary.
- Cart quantities limited to the sample stock available.
- Cart and favourites persisted using `localStorage`.
- Restaurant information and sample contact details.
- Subtle transitions that respect reduced-motion preferences.

### Technical highlights

- DOM rendering and event delegation without a JavaScript framework.
- A shared cart state keeps product cards and the order summary in sync.
- Native HTML dialogs and labelled interactive controls.
- Tailwind CLI generates a static stylesheet; custom CSS handles distinctive visual details.

### Run locally

Open `dist/index.html` in your browser, or serve the `dist` folder with Live Server. The compiled stylesheet and images are included, so installation is not required to view the demo.

Google Fonts requires an internet connection; Tahoma is used as a fallback.

### Development

To rebuild the stylesheet, install Node.js and npm, then run these commands from the project root:

```bash
npm ci
npm run build:css
```

Run `npm ci` once when setting up the project. Run `npm run build:css` after editing `src/input.css` or adding Tailwind classes to the HTML or JavaScript.

| File | Purpose |
| --- | --- |
| `dist/index.html` | Page structure and restaurant information |
| `dist/data.js` | Product data, prices in toman, categories, and sample stock |
| `dist/script.js` | Search, filters, dialogs, favourites, and cart behaviour |
| `src/input.css` | Tailwind theme and custom styles |
| `dist/style.css` | Generated CSS; rebuild rather than editing directly |
| `dist/assets/` | Demo images |
| `docs/olio-menu-preview.png` | README screenshot |

### Demo scope and image credits

This is a front-end demonstration. Restaurant details, prices, stock, and allergen information are sample data. No orders are sent and no payments are processed. Additional order charges are set to zero in this demo. A production version would require a backend for order handling and stock validation.

Demo photography is sourced from [Unsplash](https://unsplash.com/). Third-party images and fonts remain subject to their respective licences.

---

## فارسی

### اولیو؛ منوی دیجیتال با حال‌وهوای ایتالیایی

اولیو یک منوی رستوران فارسی، راست‌به‌چپ و واکنش‌گراست. این پروژهٔ نمونه‌کار فرانت‌اند، طراحی گرم با الهام از رستوران‌های ایتالیایی را با جست‌وجوی محصولات، علاقه‌مندی‌ها و سبد خرید در مرورگر ترکیب می‌کند.

ساخته‌شده با **HTML5، Tailwind CSS 4 و JavaScript خالص**، همراه با CSS اختصاصی برای انحنای سربرگ و کارت‌های گرد محصولات.

### امکانات

- چهار دستهٔ فعال: پیتزا، پاستا، پیش‌غذا و نوشیدنی.
- نمایش تصویر، توضیحات، قیمت و وضعیت موجودی محصولات.
- جست‌وجو در تمام دسته‌ها با اینتر یا دکمهٔ جست‌وجو.
- فیلتر محصولات موجود و گیاهی و مرتب‌سازی بر اساس قیمت.
- مودال جزئیات محصول، شامل اندازهٔ پرس و اطلاعات نمونهٔ مواد حساسیت‌زا.
- لایک و نمایش جداگانهٔ علاقه‌مندی‌ها.
- تغییر تعداد روی کارت محصولات و داخل سبد خرید.
- محاسبهٔ خودکار مبلغ و نمایش خلاصهٔ خرید.
- محدودیت تعداد سفارش بر اساس موجودی نمونه.
- ذخیرهٔ سبد و علاقه‌مندی‌ها با `localStorage`.
- نمایش اطلاعات رستوران و اطلاعات تماس نمونه.
- انیمیشن‌های ملایم با رعایت تنظیم کاهش حرکت مرورگر.

### نکات فنی

- ساخت محتوای صفحه و مدیریت رویدادها با JavaScript خالص و بدون فریم‌ورک.
- هماهنگی کارت محصولات و خلاصهٔ سفارش از طریق وضعیت مشترک سبد خرید.
- استفاده از دیالوگ بومی HTML و کنترل‌های دارای برچسب.
- تولید CSS آماده با Tailwind CLI و استفاده از CSS اختصاصی برای جزئیات طراحی.

### اجرای محلی

فایل `dist/index.html` را در مرورگر باز کنید یا پوشهٔ `dist` را با Live Server اجرا کنید. تصاویر و CSS آماده همراه پروژه هستند؛ برای دیدن نمونه نیازی به نصب وابستگی‌ها نیست.

فونت گوگل به اینترنت نیاز دارد و Tahoma فونت جایگزین است.

### ویرایش و توسعه

برای ساخت مجدد CSS، ابتدا Node.js و npm را نصب کنید و در پوشهٔ اصلی پروژه اجرا کنید:

```bash
npm ci
npm run build:css
```

دستور اول برای نصب اولیه است. بعد از تغییر `src/input.css` یا افزودن کلاس‌های Tailwind به HTML یا JavaScript، دستور دوم را اجرا کنید.

| فایل | کاربرد |
| --- | --- |
| `dist/index.html` | ساختار صفحه و اطلاعات رستوران |
| `dist/data.js` | اطلاعات محصولات، قیمت به تومان، دسته‌ها و موجودی نمونه |
| `dist/script.js` | جست‌وجو، فیلتر، مودال، علاقه‌مندی‌ها و سبد خرید |
| `src/input.css` | تم Tailwind و استایل‌های اختصاصی |
| `dist/style.css` | CSS تولیدشده؛ آن را مستقیم ویرایش نکنید |
| `dist/assets/` | تصاویر نمونه |
| `docs/olio-menu-preview.png` | اسکرین‌شات README |

### محدودهٔ نمونه و منبع تصاویر

این پروژه یک نمونهٔ فرانت‌اند است. اطلاعات رستوران، قیمت‌ها، موجودی و مواد حساسیت‌زا نمایشی‌اند. سفارش ارسال نمی‌شود و پرداختی انجام نمی‌گیرد. هزینهٔ اضافه در این نسخه صفر است. نسخهٔ عملیاتی برای ثبت سفارش و بررسی موجودی به بک‌اند نیاز دارد.

عکس‌های نمونه از [Unsplash](https://unsplash.com/) تهیه شده‌اند. تصاویر و فونت‌های شخص ثالث تابع مجوزهای خودشان هستند.
