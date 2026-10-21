const pizzas = [
 {id:1,name:'مارگاریتا',english:'Margherita',description:'سس گوجهٔ مخصوص، موزارلای تازه و برگ ریحان',price:285000,image:'margherita.jpg',tag:'کلاسیک'},
 {id:2,name:'پپرونی',english:'Pepperoni',description:'پپرونی، پنیر موزارلا و سس گوجهٔ ایتالیایی',price:345000,image:'pepperoni.jpg',tag:'پرطرفدار'},
 {id:3,name:'قارچ و پنیر',english:'Funghi',description:'قارچ تازه، ترکیب پنیرها و عطر آویشن',price:315000,image:'mushroom.jpg',tag:'گیاهی'},
 {id:4,name:'اسپشیال اولیو',english:'Olio Speciale',description:'ترکیب ویژهٔ سرآشپز با زیتون و سبزیجات تازه',price:385000,image:'pizza.jpg',tag:'پیشنهاد ما'}
];
const pastas = [
 {id:5,name:'اسپاگتی پومودورو',english:'Spaghetti Pomodoro',description:'اسپاگتی با سس گوجهٔ تازه، سیر و ریحان',price:275000,image:'pomodoro.jpg',tag:'کلاسیک'},
 {id:6,name:'اسپاگتی بولونز',english:'Spaghetti Bolognese',description:'اسپاگتی با راگوی گوشت، گوجه و پنیر پارمزان',price:335000,image:'bolognese.jpg',tag:'پرطرفدار'},
 {id:7,name:'اسپاگتی پستو',english:'Spaghetti al Pesto',description:'سس ریحان، روغن زیتون، گردو و پارمزان',price:305000,image:'pesto.jpg',tag:'پیشنهاد ما'},
 {id:8,name:'اسپاگتی کاربونارا',english:'Spaghetti Carbonara',description:'اسپاگتی با بیکن، زردهٔ تخم‌مرغ و پارمزان',price:355000,image:'carbonara.jpg',tag:'خامه‌ای'}
];

const products = [
 ...pizzas.map(p=>({...p,category:'pizza',stock:p.id===4?0:12,vegetarian:[1,3].includes(p.id),allergens:'گلوتن، شیر',portion:'یک پیتزای ۳۰ سانتی‌متری'})),
 ...pastas.map(p=>({...p,category:'pasta',stock:p.id===8?0:10,vegetarian:[5,7].includes(p.id),allergens:p.id===7?'گلوتن، شیر، گردو':'گلوتن، شیر، تخم‌مرغ',portion:'یک پرس'})),
 {id:9,name:'سالاد کاپرسه',english:'Caprese Salad',description:'گوجهٔ تازه، موزارلا، ریحان و روغن زیتون',price:195000,image:'caprese.jpg',category:'starter',stock:8,vegetarian:true,allergens:'شیر',portion:'یک کاسه',tag:'تازه'},
 {id:10,name:'بروسکتا',english:'Bruschetta',description:'نان تست، گوجه، سیر و ریحان تازه',price:145000,image:'bruschetta.jpg',category:'starter',stock:8,vegetarian:true,allergens:'گلوتن',portion:'چهار تکه',tag:'کلاسیک'},
 {id:11,name:'لیموناد',english:'Lemonade',description:'آب لیموی تازه، نعنا و یخ',price:95000,image:'lemonade.jpg',category:'drink',stock:20,vegetarian:true,allergens:'ندارد',portion:'یک لیوان',tag:'خنک'},
 {id:12,name:'اسپرسو',english:'Espresso',description:'قهوهٔ تازه‌آسیاب‌شده با کرمای غلیظ',price:75000,image:'espresso.jpg',category:'drink',stock:20,vegetarian:true,allergens:'ندارد',portion:'دو شات',tag:'گرم'}
];
// Demo menu: replace sample prices, stock and restaurant details before client delivery.
