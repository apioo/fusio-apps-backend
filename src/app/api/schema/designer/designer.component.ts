import {Component, OnInit} from '@angular/core';
import {InternalToTypeSchemaService, Specification, TypeSchemaToInternalService} from "ngx-typeschema-editor";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailComponent} from "../detail/detail.component";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {ActivatedRoute, Router} from "@angular/router";
import axios from "axios";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Mode} from "ngx-fusio-sdk";
import {FusioService} from "../../../fusio.service";

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

  constructor(protected fusio: FusioService, private internalToTypeSchemaService: InternalToTypeSchemaService, private typeSchemaToInternalService: TypeSchemaToInternalService, protected route: ActivatedRoute, protected router: Router, protected modalService: NgbModal) { }

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

    const modalRef = this.modalService.open(DetailComponent, {
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

    modalRef.closed.subscribe((response) => {
      this.response = response;
      if (response.success) {
        if (this.schema) {
          this.router.navigate(['/schema/' + this.schema.id]);
        } else {
          this.router.navigate(['/schema']);
        }
      }
    });
  }

  async loadSchema(id: string) {
    try {
      const resource = await this.fusio.getClient().getBackendSchemaBySchemaId(id);
      const response = await resource.backendActionSchemaGet();

      this.schema = response.data;
      this.spec = this.typeSchemaToInternalService.transform(this.schema.source);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

}
