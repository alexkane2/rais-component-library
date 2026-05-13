import { ApplicationConfig, ErrorHandler } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { SnErrorHandler } from "../supernova/helpers/sn-error-handler";
import { providePrimeNG } from "primeng/config";
import Aura from "@primeuix/themes/aura";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    { provide: ErrorHandler, useClass: SnErrorHandler },
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      }
    }),
  ],
};