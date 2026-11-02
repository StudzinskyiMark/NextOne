// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://7a013d4bb360171c5611afcade112f4d@o4511621393678336.ingest.de.sentry.io/4511621394006096',

  // Sample 10% of client traces to keep network overhead low
  tracesSampleRate: 0.1,

  // Session Replay disabled: it cost ~20 Lighthouse performance points
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // No debug logs in the user's console
  debug: false,
});
