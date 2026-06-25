// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://7a013d4bb360171c5611afcade112f4d@o4511621393678336.ingest.de.sentry.io/4511621394006096',

  // Зменшуємо частоту відправки трейсів на клієнті до 10%, щоб не спамити мережу
  tracesSampleRate: 0.1,

  // ВИМИКАЄМО Session Replay - саме він "з'їдав" 20 балів продуктивності
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Вимикаємо дебаг-логи в консолі користувача
  debug: false,
});
