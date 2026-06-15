import { Component } from "@angular/core";
import { SnPrototypeComponent } from "../supernova/helpers/sn-prototype.component";
import { InsuredPaymentsComponent } from "./components/insured-payments/insured-payments.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SnPrototypeComponent, InsuredPaymentsComponent],
  template: `<sn-prototype><insured-payments></insured-payments></sn-prototype>`,
})
export class AppComponent {}
