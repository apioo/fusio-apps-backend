import {inject, Injectable} from '@angular/core';
import {BackendTaxonomy, BackendTaxonomyMove, CommonMessage} from "fusio-sdk";
import {TaxonomyService} from "../taxonomy.service";
import {Modal} from "../../shared/taxonomy/modal/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../../api.service";

@Injectable({
  providedIn: 'root'
})
export class Mover {

  constructor(private fusio: ApiService, private modalService: NgbModal) {
  }

  async move(type: TaxonomyType, selected: Record<string, boolean>): Promise<CommonMessage> {
    const ids: Array<number> = [];
    for (const [id, value] of Object.entries(selected)) {
      if (id && value) {
        ids.push(parseInt(id));
      }
    }

    return new Promise((resolve, reject) => {
      const modalRef = this.modalService.open(Modal);
      modalRef.closed.subscribe(async (taxonomyId: number) => {
        try {
          const response = await this.fusio.getClient().backend().taxonomy().move('' + taxonomyId, this.getPayload(type, ids));

          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private getPayload(type: TaxonomyType, ids: Array<number>): BackendTaxonomyMove {
    const payload: BackendTaxonomyMove = {};
    if (type === 'operations') {
      payload.operations = ids;
    } else if (type === 'actions') {
      payload.actions = ids;
    } else if (type === 'schemas') {
      payload.schemas = ids;
    } else if (type === 'events') {
      payload.events = ids;
    } else if (type === 'cronjobs') {
      payload.cronjobs = ids;
    } else if (type === 'triggers') {
      payload.triggers = ids;
    }
    return payload;
  }

}

export type TaxonomyType = 'operations'|'actions'|'schemas'|'events'|'cronjobs'|'triggers';
