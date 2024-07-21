import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DEBUG_INFO_ENABLED } from './app/app.constants';
import { AppModule } from './app/app.module';

// disable debug data on prod profile to improve performance
if (!DEBUG_INFO_ENABLED) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, { preserveWhitespaces: true })
  .then(() => {
    // You can add custom logging here, if needed
  })
  .catch(() => {
    // You can add custom error handling here, if needed
  });