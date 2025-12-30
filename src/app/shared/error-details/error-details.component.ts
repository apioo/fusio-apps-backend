import {Component, inject, Input, input} from '@angular/core';
import {BackendCronjobError} from "fusio-sdk";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-error-details',
  templateUrl: './error-details.component.html',
  styleUrl: './error-details.component.css'
})
export class ErrorDetailsComponent {

  errors = input<Array<BackendCronjobError>>([]);

  constructor(private modalService: NgbModal) {
  }

  showTrace(error: BackendCronjobError) {
    const modalRef = this.modalService.open(ErrorDetailComponent, {
      size: 'lg',
      ariaLabelledBy: 'Error: ' + error.message
    });
    modalRef.componentInstance.error = error;
  }

}

@Component({
  selector: 'app-error-detail',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Error</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <div class="fusio-detail">
        <div class="row">
          <div class="col-lg-2 fw-bold">Message</div>
          <div class="col-lg-10">{{ error.message }}</div>
        </div>
        <div class="row">
          <div class="col-lg-2 fw-bold">File</div>
          <div class="col-lg-10">{{ error.file }}</div>
        </div>
        <div class="row">
          <div class="col-lg-2 fw-bold">Line</div>
          <div class="col-lg-10">{{ error.line }}</div>
        </div>
        <div class="row">
          <div class="col-lg-2 fw-bold">Trace</div>
          <div class="col-lg-10"><pre>{{ error.trace }}</pre></div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="activeModal.close('Close click')">Close
        </button>
      </div>
    </div>
  `,
})
export class ErrorDetailComponent {
  activeModal = inject(NgbActiveModal);

  @Input() error!: BackendCronjobError;
}
