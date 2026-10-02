// Вебхук Telegram: https://<домен>/api/telegram
import { handleUpdate } from '../bot/handlers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('ok');

  if (req.headers['x-telegram-bot-api-secret-token'] !== process.env.WEBHOOK_SECRET) {
    return res.status(401).send('unauthorized');
  }

  try {
    await handleUpdate(req.body || {});
  } catch (e) {
    console.error('update failed:', e.message);
  }
  // Всегда 200, иначе Telegram будет повторять одно и то же обновление.
  res.status(200).send('ok');
}
