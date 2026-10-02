// Все тексты бота. Меняйте здесь — код трогать не нужно.

export const REG_URL =
  'https://reg.eda.yandex.uz/?advertisement_campaign=forms_for_agents&user_invite_code=af98259db1954304a4459359daf57f62&utm_content=blank';

export const MANAGER_URL = 'https://t.me/Yandexeat01';

export const CHOOSE_LANG = 'Tilni tanlang  ·  Выберите язык';

export const T = {
  ru: {
    info: (name) =>
      `Здравствуйте, ${name}! 👋\n\n` +
      `<b>Работа курьером в Yandex Eats</b>\n` +
      `Забираете заказы в кафе и ресторанах и отвозите клиентам — пешком, на велосипеде, электровелосипеде или на авто.\n\n` +
      `💰 <b>Доход в месяц (Ташкент)</b>\n` +
      `🚶 Пеший курьер — до 6 млн сум\n` +
      `🚲 Велокурьер — до 8 млн сум\n` +
      `🛵 Электровело — до 11 млн сум\n` +
      `🚗 Автокурьер — до 15 млн сум\n` +
      `<i>Чем больше заказов — тем выше доход.</i>\n\n` +
      `🕒 <b>График</b> — свободный. Дни, часы и район выбираете сами.\n` +
      `💳 <b>Выплаты</b> — каждую неделю на карту. Мы не берём процентов.\n` +
      `🎓 Опыт не нужен, собеседования нет. Подходит студентам.\n` +
      `⚡ Аренда электровелосипеда со скидкой — в Ташкенте и Самарканде.\n\n` +
      `📍 <b>Города:</b> Ташкент, Самарканд, Наманган, Фергана, Андижан, Бухара, Навои, Ургенч\n` +
      `<i>Работа только внутри города. Жильё не предоставляется.</i>\n\n` +
      `👇 Нажмите «Стать курьером» — регистрация занимает 3 минуты.`,

    register:
      `<b>Регистрация — 3 шага</b>\n\n` +
      `1️⃣ Откройте анкету по кнопке ниже и заполните её.\n\n` +
      `2️⃣ Когда регистрация завершится, сделайте скриншот экрана. На нём должны быть видны <b>дата, время и адрес</b>.\n\n` +
      `3️⃣ Отправьте скриншот сюда, в этот чат.\n\n` +
      `После этого менеджер проверит заявку и свяжется с вами.`,

    requirements:
      `<b>Что нужно для старта</b>\n\n` +
      `🔞 Возраст — от 18 лет\n` +
      `🪪 Паспорт или ID-карта (оригинал, фото документа не подойдёт)\n` +
      `💳 Банковская карта Uzcard или Humo (если своей нет — можно карту близких)\n` +
      `📋 Статус самозанятого — оформляется в приложении Soliq за несколько минут\n` +
      `📱 Смартфон с интернетом\n\n` +
      `Транспорт — свой или арендованный электровелосипед. Можно работать и пешком.`,

    faq:
      `<b>Частые вопросы</b>\n\n` +
      `<b>Сколько часов нужно работать?</b>\n` +
      `Сколько хотите. Выходите на линию, когда удобно — утром, вечером, в выходные.\n\n` +
      `<b>Когда приходят деньги?</b>\n` +
      `Раз в неделю на карту Uzcard или Humo.\n\n` +
      `<b>Нет транспорта — что делать?</b>\n` +
      `Можно доставлять пешком или взять электровелосипед в аренду. В Ташкенте и Самарканде на аренду действует скидка.\n\n` +
      `<b>Можно совмещать с учёбой?</b>\n` +
      `Да. Многие курьеры — студенты и работают после пар.\n\n` +
      `<b>Вы даёте жильё?</b>\n` +
      `Нет, только работа.\n\n` +
      `Остались вопросы — напишите их прямо сюда, менеджер ответит.`,

    btnRegister: '🚀 Стать курьером',
    btnOpenForm: '📝 Открыть анкету',
    btnRequirements: '📋 Требования',
    btnFaq: '❓ Вопросы',
    btnManager: '💬 Менеджер',
    btnLang: "🌐 O‘zbekcha",
    btnBack: '⬅️ Назад',

  },

  uz: {
    info: (name) =>
      `Assalomu alaykum, ${name}! 👋\n\n` +
      `<b>Yandex Eats’da kuryer bo‘lib ishlash</b>\n` +
      `Kafe va restoranlardan buyurtmani olib, mijozga yetkazasiz — piyoda, velosipedda, elektrovelosipedda yoki avtomobilda.\n\n` +
      `💰 <b>Oylik daromad (Toshkent)</b>\n` +
      `🚶 Piyoda kuryer — 6 mln so‘mgacha\n` +
      `🚲 Velokuryer — 8 mln so‘mgacha\n` +
      `🛵 Elektrovelo — 11 mln so‘mgacha\n` +
      `🚗 Avtokuryer — 15 mln so‘mgacha\n` +
      `<i>Qancha ko‘p buyurtma — shuncha ko‘p daromad.</i>\n\n` +
      `🕒 <b>Ish jadvali</b> — erkin. Kun, soat va tumanni o‘zingiz tanlaysiz.\n` +
      `💳 <b>To‘lov</b> — har hafta kartaga. Biz hech qanday foiz olmaymiz.\n` +
      `🎓 Tajriba kerak emas, suhbat yo‘q. Talabalarga ham mos.\n` +
      `⚡ Elektrovelosiped ijarasiga chegirma — Toshkent va Samarqandda.\n\n` +
      `📍 <b>Shaharlar:</b> Toshkent, Samarqand, Namangan, Farg‘ona, Andijon, Buxoro, Navoiy, Urganch\n` +
      `<i>Ish faqat shahar ichida. Yotoq joy berilmaydi.</i>\n\n` +
      `👇 «Kuryer bo‘lish» tugmasini bosing — ro‘yxatdan o‘tish 3 daqiqa oladi.`,

    register:
      `<b>Ro‘yxatdan o‘tish — 3 qadam</b>\n\n` +
      `1️⃣ Pastdagi tugma orqali anketani oching va to‘ldiring.\n\n` +
      `2️⃣ Ro‘yxatdan o‘tish tugagach, ekrandan skrinshot oling. Unda <b>sana, vaqt va manzil</b> ko‘rinib turishi kerak.\n\n` +
      `3️⃣ Skrinshotni shu chatga yuboring.\n\n` +
      `Shundan so‘ng menejer arizangizni tekshirib, siz bilan bog‘lanadi.`,

    requirements:
      `<b>Boshlash uchun nima kerak</b>\n\n` +
      `🔞 Yosh — 18 dan\n` +
      `🪪 Pasport yoki ID-karta (asli, hujjatning rasmi bo‘lmaydi)\n` +
      `💳 Uzcard yoki Humo bank kartasi (o‘zingizniki bo‘lmasa — yaqinlaringizniki ham bo‘ladi)\n` +
      `📋 O‘zini o‘zi band qilgan maqomi — Soliq ilovasida bir necha daqiqada ochiladi\n` +
      `📱 Internetga ulangan smartfon\n\n` +
      `Transport — o‘zingizniki yoki ijaraga olingan elektrovelosiped. Piyoda ham ishlash mumkin.`,

    faq:
      `<b>Ko‘p beriladigan savollar</b>\n\n` +
      `<b>Kuniga necha soat ishlash kerak?</b>\n` +
      `Xohlaganingizcha. Qulay vaqtda liniyaga chiqasiz — ertalab, kechqurun yoki dam olish kunlari.\n\n` +
      `<b>Pul qachon tushadi?</b>\n` +
      `Haftada bir marta Uzcard yoki Humo kartangizga.\n\n` +
      `<b>Transportim yo‘q — nima qilaman?</b>\n` +
      `Piyoda yetkazish yoki elektrovelosipedni ijaraga olish mumkin. Toshkent va Samarqandda ijaraga chegirma bor.\n\n` +
      `<b>O‘qish bilan birga ishlasa bo‘ladimi?</b>\n` +
      `Ha. Ko‘p kuryerlar — talabalar, darsdan keyin ishlashadi.\n\n` +
      `<b>Yotoq joy berasizlarmi?</b>\n` +
      `Yo‘q, faqat ish.\n\n` +
      `Savolingiz qoldimi — shu yerga yozing, menejer javob beradi.`,

    btnRegister: '🚀 Kuryer bo‘lish',
    btnOpenForm: '📝 Anketani ochish',
    btnRequirements: '📋 Talablar',
    btnFaq: '❓ Savollar',
    btnManager: '💬 Menejer',
    btnLang: '🌐 Русский',
    btnBack: '⬅️ Orqaga',
  },
};

// Ответы без привязки к языку: бот не хранит выбор пользователя, поэтому они на двух языках.
export const B = {
  gotScreenshot:
    'Rahmat! Skrinshot qabul qilindi ✅\nMenejer tekshirib, sizga yozadi.\n\n' +
    'Спасибо! Скриншот получен ✅\nМенеджер проверит и напишет вам.',
  gotMessage:
    'Xabaringiz menejerga yuborildi. Javob shu yerga keladi.\n\n' +
    'Сообщение передано менеджеру. Ответ придёт сюда.',
  approved:
    '🎉 <b>Ro‘yxatdan o‘tish tasdiqlandi!</b>\nMenejer tez orada siz bilan bog‘lanib, birinchi buyurtmaga qanday chiqishni tushuntiradi.\n\n' +
    '🎉 <b>Регистрация подтверждена!</b>\nМенеджер скоро свяжется с вами и подскажет, как выйти на первый заказ.',
  redo:
    'Skrinshot to‘g‘ri kelmadi 🙏\nIltimos, yangisini yuboring — unda <b>sana, vaqt va manzil</b> ko‘rinib turishi kerak.\n\n' +
    'Скриншот не подошёл 🙏\nПожалуйста, пришлите новый — на нём должны быть видны <b>дата, время и адрес</b>.',
  managerReply: '💬 <b>Menejer · Менеджер</b>\n',
  unsupported:
    'Iltimos, skrinshotni rasm qilib yuboring yoki savolingizni yozing.\n\n' +
    'Пришлите, пожалуйста, скриншот как фото или напишите вопрос текстом.',
};

