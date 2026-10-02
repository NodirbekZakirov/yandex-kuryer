// Логика бота. Работает через вебхук (api/telegram.js) и ничего не хранит между запросами:
// язык передаётся в данных кнопок, ID кандидата — в тексте карточки у админа.

import { T, B, REG_URL, MANAGER_URL, CHOOSE_LANG } from './texts.js';

const admins = () =>
  (process.env.ADMIN_IDS || '')
    .split(',')
    .map((s) => Number(s.trim()))
    .filter(Boolean);

async function tg(method, params = {}) {
  const res = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(params),
    signal: AbortSignal.timeout(15000),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`${method}: ${json.description}`);
  return json.result;
}

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const tashkentTime = () =>
  new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Tashkent',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const fullName = (from) => [from.first_name, from.last_name].filter(Boolean).join(' ');

// ---------- клавиатуры ----------

const langKeyboard = {
  inline_keyboard: [
    [
      { text: '🇺🇿 O‘zbekcha', callback_data: 'lang:uz' },
      { text: '🇷🇺 Русский', callback_data: 'lang:ru' },
    ],
  ],
};

const mainKeyboard = (lang) => {
  const t = T[lang];
  return {
    inline_keyboard: [
      [{ text: t.btnRegister, callback_data: `register:${lang}` }],
      [
        { text: t.btnRequirements, callback_data: `requirements:${lang}` },
        { text: t.btnFaq, callback_data: `faq:${lang}` },
      ],
      [
        { text: t.btnManager, url: MANAGER_URL },
        { text: t.btnLang, callback_data: `lang:${lang === 'ru' ? 'uz' : 'ru'}` },
      ],
    ],
  };
};

const registerKeyboard = (lang) => ({
  inline_keyboard: [
    [{ text: T[lang].btnOpenForm, url: REG_URL }],
    [{ text: T[lang].btnBack, callback_data: `menu:${lang}` }],
  ],
});

const backKeyboard = (lang) => ({
  inline_keyboard: [
    [{ text: T[lang].btnRegister, callback_data: `register:${lang}` }],
    [{ text: T[lang].btnBack, callback_data: `menu:${lang}` }],
  ],
});

// Кнопки под «Скриншот не подошёл»: язык кандидата тут неизвестен, поэтому обе подписи.
const redoKeyboard = {
  inline_keyboard: [[{ text: `${T.uz.btnOpenForm} · ${T.ru.btnOpenForm.replace('📝 ', '')}`, url: REG_URL }]],
};

// ---------- экраны ----------

async function showInfo(chatId, lang, firstName, withPoster) {
  if (withPoster && process.env.POSTER_FILE_ID) {
    await tg('sendPhoto', { chat_id: chatId, photo: process.env.POSTER_FILE_ID }).catch((e) =>
      console.error('poster:', e.message),
    );
  }
  await tg('sendMessage', {
    chat_id: chatId,
    text: T[lang].info(esc(firstName || '')),
    parse_mode: 'HTML',
    reply_markup: mainKeyboard(lang),
  });
}

function userCard(from) {
  return (
    `👤 <a href="tg://user?id=${from.id}">${esc(fullName(from) || 'Без имени')}</a>\n` +
    `🔗 ${from.username ? '@' + esc(from.username) : 'username не указан'}\n` +
    `🆔 ${from.id}\n` +
    `🕒 ${tashkentTime()} (Ташкент)`
  );
}

async function toAdmins(fn, except) {
  for (const id of admins()) {
    if (id === except) continue;
    try {
      await fn(id);
    } catch (e) {
      console.error(`Админ ${id} не получил сообщение (он нажал /start в боте?):`, e.message);
    }
  }
}

// ---------- обработчики ----------

async function onScreenshot(msg) {
  const from = msg.from;
  const caption =
    `🆕 <b>Скриншот регистрации</b>\n\n${userCard(from)}` +
    (msg.caption ? `\n\n💬 ${esc(msg.caption)}` : '') +
    `\n\n<i>Чтобы написать кандидату — ответьте на это сообщение.</i>`;
  const reply_markup = {
    inline_keyboard: [
      [
        { text: '✅ Подтвердить', callback_data: `ok:${from.id}` },
        { text: '🔄 Запросить заново', callback_data: `redo:${from.id}` },
      ],
    ],
  };
  const base = { caption, parse_mode: 'HTML', reply_markup };

  await toAdmins((id) =>
    msg.photo
      ? tg('sendPhoto', { chat_id: id, photo: msg.photo.at(-1).file_id, ...base })
      : tg('sendDocument', { chat_id: id, document: msg.document.file_id, ...base }),
  );
  await tg('sendMessage', { chat_id: msg.chat.id, text: B.gotScreenshot });
}

async function onAdminReply(msg) {
  const src = msg.reply_to_message.text || msg.reply_to_message.caption || '';
  const m = src.match(/🆔 (\d+)/);
  if (!m) return false;
  const userId = Number(m[1]);
  try {
    if (msg.text) {
      await tg('sendMessage', {
        chat_id: userId,
        text: B.managerReply + esc(msg.text),
        parse_mode: 'HTML',
      });
    } else {
      await tg('copyMessage', {
        chat_id: userId,
        from_chat_id: msg.chat.id,
        message_id: msg.message_id,
      });
    }
    await tg('sendMessage', {
      chat_id: msg.chat.id,
      text: '✅ Отправлено',
      reply_to_message_id: msg.message_id,
    });
  } catch (e) {
    await tg('sendMessage', { chat_id: msg.chat.id, text: `⚠️ Не доставлено: ${e.message}` });
  }
  return true;
}

async function onMessage(msg) {
  if (msg.chat.type !== 'private') return;
  const from = msg.from;
  const isAdmin = admins().includes(from.id);

  if (isAdmin && msg.reply_to_message && (await onAdminReply(msg))) return;

  const text = msg.text || '';

  if (text.startsWith('/start')) {
    // Ссылка с сайта вида t.me/bot?start=ru сразу задаёт язык.
    const payload = text.split(' ')[1];
    if (payload === 'ru' || payload === 'uz') {
      return showInfo(msg.chat.id, payload, from.first_name, true);
    }
    return tg('sendMessage', { chat_id: msg.chat.id, text: CHOOSE_LANG, reply_markup: langKeyboard });
  }

  if (text.startsWith('/')) {
    return tg('sendMessage', { chat_id: msg.chat.id, text: CHOOSE_LANG, reply_markup: langKeyboard });
  }

  const isImageDoc = msg.document?.mime_type?.startsWith('image/');
  if (msg.photo || isImageDoc) return onScreenshot(msg);

  if (text) {
    if (isAdmin) {
      return tg('sendMessage', {
        chat_id: msg.chat.id,
        text: 'Чтобы написать кандидату, ответьте (reply) на его заявку или сообщение.',
      });
    }
    await toAdmins((id) =>
      tg('sendMessage', {
        chat_id: id,
        text:
          `💬 <b>Вопрос от кандидата</b>\n\n${userCard(from)}\n\n${esc(text)}` +
          `\n\n<i>Ответьте на это сообщение — бот перешлёт ответ.</i>`,
        parse_mode: 'HTML',
      }),
    );
    return tg('sendMessage', { chat_id: msg.chat.id, text: B.gotMessage });
  }

  return tg('sendMessage', { chat_id: msg.chat.id, text: B.unsupported });
}

async function onCallback(q) {
  const [action, arg] = (q.data || '').split(':');
  const chatId = q.message?.chat.id;
  const from = q.from;
  const answer = (text) =>
    tg('answerCallbackQuery', { callback_query_id: q.id, text }).catch(() => {});

  // Решение админа по заявке
  if (action === 'ok' || action === 'redo') {
    if (!admins().includes(from.id)) return answer('Недоступно');
    const userId = Number(arg);
    const approved = action === 'ok';
    try {
      await tg('sendMessage', {
        chat_id: userId,
        text: approved ? B.approved : B.redo,
        parse_mode: 'HTML',
        reply_markup: approved ? undefined : redoKeyboard,
      });
    } catch (e) {
      return answer(`Не доставлено: ${e.message}`);
    }
    const label = `${approved ? '✅ Подтверждено' : '🔄 Запрошен новый скриншот'} · ${from.first_name}`;
    await tg('editMessageReplyMarkup', {
      chat_id: chatId,
      message_id: q.message.message_id,
      reply_markup: { inline_keyboard: [[{ text: label, callback_data: 'noop' }]] },
    }).catch(() => {});
    await toAdmins(
      (id) => tg('sendMessage', { chat_id: id, text: `${label}\n🆔 ${userId}` }),
      from.id,
    );
    return answer(approved ? 'Кандидат уведомлён' : 'Попросили прислать заново');
  }

  await answer();
  if (action === 'noop') return;

  const lang = arg === 'ru' ? 'ru' : 'uz';
  const t = T[lang];
  const send = (text, reply_markup) =>
    tg('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup,
      disable_web_page_preview: true,
    });

  if (action === 'lang') return showInfo(chatId, lang, from.first_name, true);
  if (action === 'menu') return showInfo(chatId, lang, from.first_name, false);
  if (action === 'register') return send(t.register, registerKeyboard(lang));
  if (action === 'requirements') return send(t.requirements, backKeyboard(lang));
  if (action === 'faq') return send(t.faq, backKeyboard(lang));
}

export async function handleUpdate(update) {
  if (update.message) return onMessage(update.message);
  if (update.callback_query) return onCallback(update.callback_query);
}
