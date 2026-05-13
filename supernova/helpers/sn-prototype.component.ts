// Information for LLM Agent
// This is a component that wraps the application with error handling and message receiving.
// don't update this file!
import { Component, inject } from "@angular/core";
import { SnMessageService } from "./sn-message.service";

@Component({
  selector: "sn-prototype",
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class SnPrototypeComponent {
  // Inject message service to ensure it's initialized
  private messageService = inject(SnMessageService);
}
