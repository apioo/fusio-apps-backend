import {Component, inject, OnInit, signal} from '@angular/core';
import {ErrorService, FusioService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-agent-redirect',
  imports: [
    MessageComponent,
    RouterLink
  ],
  templateUrl: './redirect.html',
  styleUrl: './redirect.css',
})
export class Redirect implements OnInit {

  response = signal<CommonMessage|undefined>(undefined);

  private api = inject(FusioService);
  private error = inject(ErrorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const type = parseInt(params['type']);
      const ref = parseInt(params['ref']);

      await this.redirectToAgentByType(type, ref);
    });
  }

  private async redirectToAgentByType(type: number, ref: number) {
    try {
      const agentId = await this.fetchAgentIdByType(type);

      await this.router.navigate(['/agent', agentId, 'chat'], {queryParams: {ref_id: ref}});
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  private async fetchAgentIdByType(type: number): Promise<number> {
    const response = await this.api.getClient().backend().agent().getAll(0, 16, 'type:' + type);
    if (response.entry) {
      for (let i = 0; i < response.entry?.length; i++) {
        const entry = response.entry[i];
        const id = entry.id;
        if (!id) {
          continue;
        }

        return id;
      }
    }

    throw new Error('Could not find agent type');
  }

}
