import {Component, inject, signal} from '@angular/core';
import {NgbActiveModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {TaxonomyService} from "../../../services/taxonomy.service";
import {FormAutocompleteComponent} from "ngx-fusio-sdk";

@Component({
  selector: 'app-taxonomy-modal',
  imports: [
    NgbPopover,
    FormAutocompleteComponent
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {

  activeModal = inject(NgbActiveModal);
  service = inject(TaxonomyService);

  taxonomyId = signal<number|undefined>(undefined);

}
