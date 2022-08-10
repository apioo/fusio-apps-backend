import {Directive, Input, OnInit} from "@angular/core";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Mode, ModelId} from "./list";
import {FactoryService} from "./factory.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import axios, {AxiosResponse} from "axios";

@Directive()
export abstract class Modal<T extends ModelId> implements OnInit {

  response?: Message;

  @Input() mode: Mode = Mode.Create;
  @Input() entity: T = this.newEntity();

  constructor(protected factory: FactoryService, protected modalService: NgbModal, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  async submit() {
    if (!this.entity) {
      return;
    }

    const data = this.entity;

    try {
      let response;
      if (this.mode === Mode.Create) {
        response = await this.create(data);
      } else if (this.mode === Mode.Update) {
        response = await this.update(data);
      } else if (this.mode === Mode.Delete) {
        response = await this.delete(data);
      }

      if (response) {
        this.modal.close(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  protected abstract create(entity: T): Promise<AxiosResponse<Message>|void>;
  protected abstract update(entity: T): Promise<AxiosResponse<Message>|void>;
  protected abstract delete(entity: T): Promise<AxiosResponse<Message>|void>;
  protected abstract newEntity(): T;

}
