import {Component, OnInit} from '@angular/core';
import {ExportService, ImportService, Specification} from "ngx-typeschema-editor";
import {ActivatedRoute} from "@angular/router";
import {ErrorService} from "ngx-fusio-sdk";
import {BackendSchema, BackendSchemaCreate, CommonMessage} from "fusio-sdk";
import {SchemaService} from "../../../services/schema.service";

@Component({
  selector: 'app-schema-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  spec: Specification = {
    imports: [],
    operations: [],
    types: []
  };

  entity?: BackendSchema;
  response?: CommonMessage;

  constructor(private schema: SchemaService, private exportService: ExportService, private importService: ImportService, private route: ActivatedRoute, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    this.entity = this.schema.newEntity();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadSchema(id);
      }
    });
  }

  async submit(spec: Specification) {
    const typeSchema = this.exportService.transform(spec);

    if (this.entity?.id) {
      const schema = this.entity;
      schema.source = typeSchema;

      this.response = await this.schema.update(schema);
    } else if (this.entity) {
      const schema = this.entity;
      schema.source = typeSchema;

      this.response = await this.schema.create(schema);
    }
  }

  async loadSchema(id: string) {
    try {
      this.entity = await this.schema.get(id);
      this.spec = await this.importService.transform('typeschema', JSON.stringify(this.entity.source));
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
