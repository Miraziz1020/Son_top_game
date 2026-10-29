// ===== Sozlamalar (boshlang'ich qiymatlar) =====
let MAX_SON = 9;
let MAX_URINISH = 3;
let CHEKLOV = true; // true = urinishlar cheklangan, false = cheksiz

try {
  const s = JSON.parse(localStorage.getItem("sozlama"));
  if (s) {
    if (Number.isInteger(s.max) && s.max >= 2 && s.max <= 1000) MAX_SON = s.max;
    if (Number.isInteger(s.urinish) && s.urinish >= 1 && s.urinish <= 100)
      MAX_URINISH = s.urinish;
    if (typeof s.cheklov === "boolean") CHEKLOV = s.cheklov;
  }
} catch (e) {}

// ===== Tarjimalar =====
const T = {
  uz: {
    sarlavha: "Tasodifiy Sonni Top",
    taxminLabel: "Sizning taxminingiz:",
    placeholder: "Son kiriting",
    tekshir: "Tekshirish",
    qayta: "Qayta boshlash",
    sorov: (max, urn) =>
      `Men 1 dan ${max} gacha bo'lgan sonni o'ylayapman. ${urn} ta urinishda topa olasizmi?`,
    sorovCheksiz: (max) =>
      `Men 1 dan ${max} gacha bo'lgan sonni o'ylayapman. Topa olasizmi?`,
    boshlash: "O'yinni boshlash uchun taxmin qiling.",
    urinish: (n, max) => `Urinishlar: ${n} / ${max}`,
    urinishCheksiz: (n) => `Urinishlar: ${n}`,
    tarix: (royxat) => `Oldingi taxminlar: ${royxat}`,
    butunSon: "Iltimos, butun son kiriting.",
    diapazon: (max) => `Son 1 dan ${max} gacha bo'lishi kerak.`,
    takror: (a) =>
      `Siz ${a} sonini allaqachon kiritgansiz. Boshqa son kiriting.`,
    yutdi: (son, n) =>
      `Tabriklayman! Men ${son} sonini o'ylagan edim. ${n} ta urinishda topdingiz!`,
    yutqazdi: (son) => `Urinishlar tugadi. Men ${son} sonini o'ylagan edim.`,
    kattaroq: "Noto'g'ri. Men o'ylagan son kattaroq.",
    kichikroq: "Noto'g'ri. Men o'ylagan son kichikroq.",
    sozlamalar: "⚙ Sozlamalar",
    sozYopish: "✕ Yopish",
    sozMax: "Eng katta son:",
    sozCheklov: "Urinishlar cheklovi:",
    sozUrinish: "Urinishlar soni:",
    sozSaqlash: "Saqlash va boshlash",
    sozXato:
      "Eng katta son 2 dan 1000 gacha, urinishlar 1 dan 100 gacha bo'lishi kerak.",
  },
  ru: {
    sarlavha: "Угадай число",
    taxminLabel: "Ваша догадка:",
    placeholder: "Введите число",
    tekshir: "Проверить",
    qayta: "Начать заново",
    sorov: (max, urn) =>
      `Я загадал число от 1 до ${max}. Сможете угадать за ${urn} попыток?`,
    sorovCheksiz: (max) => `Я загадал число от 1 до ${max}. Сможете угадать?`,
    boshlash: "Сделайте догадку, чтобы начать игру.",
    urinish: (n, max) => `Попытки: ${n} / ${max}`,
    urinishCheksiz: (n) => `Попытки: ${n}`,
    tarix: (royxat) => `Предыдущие догадки: ${royxat}`,
    butunSon: "Пожалуйста, введите целое число.",
    diapazon: (max) => `Число должно быть от 1 до ${max}.`,
    takror: (a) => `Вы уже вводили число ${a}. Введите другое.`,
    yutdi: (son, n) =>
      `Поздравляю! Я загадал число ${son}. Вы угадали за ${n} попыток!`,
    yutqazdi: (son) => `Попытки закончились. Я загадал число ${son}.`,
    kattaroq: "Неверно. Загаданное число больше.",
    kichikroq: "Неверно. Загаданное число меньше.",
    sozlamalar: "⚙ Настройки",
    sozYopish: "✕ Закрыть",
    sozMax: "Наибольшее число:",
    sozCheklov: "Ограничение попыток:",
    sozUrinish: "Количество попыток:",
    sozSaqlash: "Сохранить и начать",
    sozXato: "Наибольшее число — от 2 до 1000, попытки — от 1 до 100.",
  },
  en: {
    sarlavha: "Guess the Number",
    taxminLabel: "Your guess:",
    placeholder: "Enter a number",
    tekshir: "Check",
    qayta: "Restart",
    sorov: (max, urn) =>
      `I'm thinking of a number from 1 to ${max}. Can you guess it in ${urn} tries?`,
    sorovCheksiz: (max) =>
      `I'm thinking of a number from 1 to ${max}. Can you guess it?`,
    boshlash: "Make a guess to start the game.",
    urinish: (n, max) => `Attempts: ${n} / ${max}`,
    urinishCheksiz: (n) => `Attempts: ${n}`,
    tarix: (royxat) => `Previous guesses: ${royxat}`,
    butunSon: "Please enter a whole number.",
    diapazon: (max) => `The number must be between 1 and ${max}.`,
    takror: (a) => `You already tried ${a}. Enter a different number.`,
    yutdi: (son, n) =>
      `Congratulations! I was thinking of ${son}. You got it in ${n} tries!`,
    yutqazdi: (son) => `No attempts left. I was thinking of ${son}.`,
    kattaroq: "Wrong. My number is higher.",
    kichikroq: "Wrong. My number is lower.",
    sozlamalar: "⚙ Settings",
    sozYopish: "✕ Close",
    sozMax: "Highest number:",
    sozCheklov: "Limit attempts:",
    sozUrinish: "Number of attempts:",
    sozSaqlash: "Save and start",
    sozXato: "Highest number must be 2–1000 and attempts 1–100.",
  },
  tr: {
    sarlavha: "Rastgele Sayıyı Bul",
    taxminLabel: "Tahminin:",
    placeholder: "Bir sayı gir",
    tekshir: "Kontrol Et",
    qayta: "Yeniden Başla",
    sorov: (max, urn) =>
      `1 ile ${max} arasında bir sayı düşünüyorum. ${urn} denemede bulabilir misin?`,
    sorovCheksiz: (max) =>
      `1 ile ${max} arasında bir sayı düşünüyorum. Bulabilir misin?`,
    boshlash: "Oyuna başlamak için bir tahmin yap.",
    urinish: (n, max) => `Deneme: ${n} / ${max}`,
    urinishCheksiz: (n) => `Deneme: ${n}`,
    tarix: (royxat) => `Önceki tahminler: ${royxat}`,
    butunSon: "Lütfen tam sayı gir.",
    diapazon: (max) => `Sayı 1 ile ${max} arasında olmalı.`,
    takror: (a) => `${a} sayısını zaten denedin. Başka bir sayı gir.`,
    yutdi: (son, n) =>
      `Tebrikler! ${son} sayısını düşünmüştüm. ${n} denemede buldun!`,
    yutqazdi: (son) => `Denemeler bitti. ${son} sayısını düşünmüştüm.`,
    kattaroq: "Yanlış. Düşündüğüm sayı daha büyük.",
    kichikroq: "Yanlış. Düşündüğüm sayı daha küçük.",
    sozlamalar: "⚙ Ayarlar",
    sozYopish: "✕ Kapat",
    sozMax: "En büyük sayı:",
    sozCheklov: "Deneme sınırı:",
    sozUrinish: "Deneme sayısı:",
    sozSaqlash: "Kaydet ve başla",
    sozXato: "En büyük sayı 2–1000, deneme sayısı 1–100 olmalı.",
  },
};

// ===== Holat =====
let til = "uz";
try {
  const saqlangan = localStorage.getItem("til");
  if (saqlangan && T[saqlangan]) til = saqlangan;
} catch (e) {}

let randomson;
let urinishlar;
let oldingilar;
let tugadi;
let xabarKey = "boshlash";
let xabarArgs = [];
let sozOchiq = false;

// ===== Elementlar =====
const sarlavha = document.getElementById("sarlavha");
const sorov = document.getElementById("sorov");
const taxminLabel = document.getElementById("taxminLabel");
const p = document.getElementById("p");
const meningson = document.getElementById("meningson");
const urinish = document.getElementById("urinish");
const tarix = document.getElementById("tarix");
const tekshirishBTN = document.getElementById("tekshirishBTN");
const qaytaBTN = document.getElementById("qaytaBTN");

const sozBTN = document.getElementById("sozBTN");
const sozPanel = document.getElementById("sozPanel");
const sozMax = document.getElementById("sozMax");
const sozCheklov = document.getElementById("sozCheklov");
const sozUrinish = document.getElementById("sozUrinish");
const sozUrinishQator = document.getElementById("sozUrinishQator");
const sozXato = document.getElementById("sozXato");
const sozMaxLabel = document.getElementById("sozMaxLabel");
const sozCheklovLabel = document.getElementById("sozCheklovLabel");
const sozUrinishLabel = document.getElementById("sozUrinishLabel");
const saqlashBTN = document.getElementById("saqlashBTN");

// ===== Ekranni yangilash =====
function xabarKo(key, ...args) {
  xabarKey = key;
  xabarArgs = args;
  p.innerText =
    typeof T[til][key] === "function" ? T[til][key](...args) : T[til][key];
}

function urinishMatni() {
  const t = T[til];
  return CHEKLOV
    ? t.urinish(urinishlar, MAX_URINISH)
    : t.urinishCheksiz(urinishlar);
}

function chizish() {
  const t = T[til];
  document.documentElement.lang = til;
  sarlavha.innerText = t.sarlavha;
  taxminLabel.innerText = t.taxminLabel;
  meningson.placeholder = t.placeholder;
  tekshirishBTN.innerText = t.tekshir;
  qaytaBTN.innerText = t.qayta;
  sorov.innerText = CHEKLOV
    ? t.sorov(MAX_SON, MAX_URINISH)
    : t.sorovCheksiz(MAX_SON);
  urinish.innerText = urinishMatni();
  tarix.innerText = oldingilar.length ? t.tarix(oldingilar.join(", ")) : "";
  xabarKo(xabarKey, ...xabarArgs);

  // Sozlamalar paneli matnlari
  sozBTN.innerText = sozOchiq ? t.sozYopish : t.sozlamalar;
  sozMaxLabel.innerText = t.sozMax;
  sozCheklovLabel.innerText = t.sozCheklov;
  sozUrinishLabel.innerText = t.sozUrinish;
  saqlashBTN.innerText = t.sozSaqlash;

  document.querySelectorAll(".til").forEach(function (btn) {
    btn.classList.toggle("aktiv", btn.dataset.til === til);
  });
}

function tilOzgartir(yangi) {
  til = yangi;
  try {
    localStorage.setItem("til", yangi);
  } catch (e) {}
  sozXato.innerText = "";
  chizish();
}

// ===== Sozlamalar =====
function sozlamaOchYop() {
  sozOchiq = !sozOchiq;
  sozPanel.classList.toggle("yashirin", !sozOchiq);
  if (sozOchiq) {
    // joriy qiymatlarni panelga qo'yish
    sozMax.value = MAX_SON;
    sozCheklov.checked = CHEKLOV;
    sozUrinish.value = MAX_URINISH;
    sozXato.innerText = "";
    cheklovOzgardi();
  }
  chizish();
}

function cheklovOzgardi() {
  sozUrinishQator.style.display = sozCheklov.checked ? "flex" : "none";
}

function sozlamaSaqlash() {
  const yMax = Number(sozMax.value);
  const yUrinish = Number(sozUrinish.value);
  const yCheklov = sozCheklov.checked;

  const maxTogri = Number.isInteger(yMax) && yMax >= 2 && yMax <= 1000;
  const urinishTogri =
    !yCheklov ||
    (Number.isInteger(yUrinish) && yUrinish >= 1 && yUrinish <= 100);

  if (!maxTogri || !urinishTogri) {
    sozXato.innerText = T[til].sozXato;
    return;
  }

  MAX_SON = yMax;
  CHEKLOV = yCheklov;
  if (yCheklov) MAX_URINISH = yUrinish;

  try {
    localStorage.setItem(
      "sozlama",
      JSON.stringify({
        max: MAX_SON,
        urinish: MAX_URINISH,
        cheklov: CHEKLOV,
      }),
    );
  } catch (e) {}

  sozOchiq = false;
  sozPanel.classList.add("yashirin");
  boshlash();
}

// ===== O'yin =====
function boshlash() {
  randomson = Math.floor(Math.random() * MAX_SON) + 1;
  urinishlar = 0;
  oldingilar = [];
  tugadi = false;
  xabarKey = "boshlash";
  xabarArgs = [];

  meningson.value = "";
  meningson.disabled = false;
  tekshirishBTN.disabled = false;
  chizish();
  meningson.focus();
}

function tugatish(key, ...args) {
  tugadi = true;
  xabarKo(key, ...args);
  meningson.disabled = true;
  tekshirishBTN.disabled = true;
}

function tekshirish() {
  if (tugadi) return;

  const matn = meningson.value.trim();
  const a = Number(matn);

  // Tekshiruvlar (urinishga sanalmaydi)
  if (matn === "" || !Number.isInteger(a)) {
    xabarKo("butunSon");
    return;
  }
  if (a < 1 || a > MAX_SON) {
    xabarKo("diapazon", MAX_SON);
    return;
  }
  if (oldingilar.includes(a)) {
    xabarKo("takror", a);
    meningson.value = "";
    meningson.focus();
    return;
  }

  // Haqiqiy urinish
  urinishlar++;
  oldingilar.push(a);
  urinish.innerText = urinishMatni();
  tarix.innerText = T[til].tarix(oldingilar.join(", "));

  if (a === randomson) {
    tugatish("yutdi", randomson, urinishlar);
    return;
  }

  if (CHEKLOV && urinishlar >= MAX_URINISH) {
    tugatish("yutqazdi", randomson);
    return;
  }

  xabarKo(a < randomson ? "kattaroq" : "kichikroq");

  meningson.value = "";
  meningson.focus();
}

function restart() {
  boshlash();
}

// Enter tugmasi bilan tekshirish
meningson.addEventListener("keydown", function (e) {
  if (e.key === "Enter") tekshirish();
});

// ===== Faqat musbat butun son =====
function faqatRaqam(input) {
  // taqiqlangan belgilarni yozishga yo'l qo'ymaslik
  input.addEventListener("keydown", function (e) {
    if (["-", "+", "e", "E", ".", ","].includes(e.key)) e.preventDefault();
  });
  // nusxalab qo'yilgan (paste) matnni ham tozalash
  input.addEventListener("input", function () {
    const toza = input.value.replace(/[^0-9]/g, "");
    if (input.value !== toza) input.value = toza;
  });
}

faqatRaqam(meningson);
faqatRaqam(sozMax);
faqatRaqam(sozUrinish);

meningson.min = 1;

boshlash();
