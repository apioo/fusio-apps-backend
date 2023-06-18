import {Component, OnInit} from '@angular/core';
import {InternalToTypeSchemaService, Specification, TypeSchemaToInternalService} from "ngx-typeschema-editor";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {ActivatedRoute, Router} from "@angular/router";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {BackendService, ErrorService, Mode, Result} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  spec: Specification = {
    imports: [],
    types: []
  };

  schema?: Schema;
  response?: Message;

  constructor(private backend: BackendService, private internalToTypeSchemaService: InternalToTypeSchemaService, private typeSchemaToInternalService: TypeSchemaToInternalService, private route: ActivatedRoute, private router: Router, private error: ErrorService, protected modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSchema(id);
      }
    });
  }

  submit(spec: Specification) {
    const typeSchema = this.internalToTypeSchemaService.transform(spec);

    const modalRef = this.modalService.open(ModalComponent, {
      size: 'lg'
    });

    if (this.schema) {
      const schema = this.schema;
      schema.source = typeSchema;
      modalRef.componentInstance.mode = Mode.Update;
      modalRef.componentInstance.entity = schema;
    } else {
      modalRef.componentInstance.mode = Mode.Create;
      modalRef.componentInstance.schema = JSON.stringify(typeSchema, null, 2);
    }

    modalRef.closed.subscribe((data: Result<Schema>) => {
      this.response = data.response;
      if (this.response.success) {
        if (data.entity.id) {
          this.router.navigate(['/schema/' + data.entity.id]);
        } else {
          this.router.navigate(['/schema']);
        }
      }
    });
  }

  async loadSchema(id: string) {
    try {
      const response = await this.backend.getClient().schema().get(id);

      this.schema = response;
      this.spec = this.typeSchemaToInternalService.transform(this.schema.source);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
