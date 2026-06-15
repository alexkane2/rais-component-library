// Local playground for previewing RAIS components outside Storybook.
// Import any component from ./components and render it in the template below,
// then run `npm run dev` to view it at http://localhost:3000.
import { Component } from "@angular/core";
import { InsuredPaymentsComponent } from "./components/insured-payments/insured-payments.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [InsuredPaymentsComponent],
  template: `<insured-payments></insured-payments>`,
})
export class AppComponent {}
