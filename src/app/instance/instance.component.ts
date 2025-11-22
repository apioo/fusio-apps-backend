import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {ConfigService, Mode, UserService} from "ngx-fusio-sdk";
import {Router} from "@angular/router";
import {Instance, InstanceManager} from "../instance-manager";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "./modal/modal.component";
import {ConfigBuilder} from "../config-builder";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  imports: [
    NgClass
  ],
  styleUrl: './instance.component.css'
})
export class InstanceComponent implements OnInit {

  instances: Array<Instance> = []

  constructor(private fusio: ApiService, private user: UserService, private config: ConfigService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadInstances();
  }

  loadInstances(): void {
    this.instances = InstanceManager.getInstances();
  }

  getActiveIndex(): number|null {
    return InstanceManager.getActiveIndex();
  }

  async selectInstance(index: number): Promise<void> {
    const instance = InstanceManager.setActiveIndex(index);
    if (instance === null) {
      return;
    }

    this.config.update(ConfigBuilder.build());
    this.fusio.reload();

    try {
      const response = await this.fusio.getClientWithCredentials(instance.username, instance.password).consumer().account().get();
      this.user.login(response);
    } catch (error) {
      this.user.logout();
    }

    this.router.navigate([this.config.getHomePath()]).then(() => {
      location.reload();
    });
  }

  removeActiveInstance() {
    this.user.logout();

    InstanceManager.removeActiveInstance();

    location.reload();
  }

  newInstanceDialog() {
    const modalRef = this.modalService.open(ModalComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Create;
    modalRef.closed.subscribe(async (result: Instance) => {
      const index = InstanceManager.newInstance(result);
      if (index !== null) {
        await this.selectInstance(index);
      }
    });
  }

}
