import {inject, Injectable} from '@angular/core';
import {
  AgentItemBinary,
  AgentItemChoice,
  AgentItemObject,
  AgentItemText,
  AgentItemToolCall, BackendAgentTask,
  CommonMessage
} from "fusio-sdk";
import {ExecutionIndicator, FusioService} from "ngx-fusio-sdk";

/**
 * Executes the action of an agent as background task at the backend. The task is executed by a worker, so the
 * execution continues also if the user closes the browser, this service only shows the progress of the task
 */
@Injectable({
  providedIn: 'root'
})
export class AgentTaskService {

  private static readonly POLL_INTERVAL = 2000;
  private static readonly MAX_DURATION = 60 * 60 * 1000;

  private api = inject(FusioService);

  /**
   * Returns whether the provided agent has an action and can therefore execute a task at the backend
   */
  public static hasAction(agent: unknown): boolean {
    const action = (agent as {action?: string} | undefined)?.action;
    return typeof action === 'string' && action !== '';
  }

  /**
   * Creates a new task and waits until the task is finished, all executed steps are reported to the indicator
   */
  public async run(agentId: number, item: Item, indicator: ExecutionIndicator, connectionId?: number): Promise<CommonMessage> {
    indicator.request('Task create');

    const response = await this.api.getClient().backend().agent().task().create('' + agentId, {item: item}, connectionId ? '' + connectionId : undefined);
    indicator.response(response);

    const taskId = response.id;
    if (!response.success || !taskId) {
      return response;
    }

    const start = Date.now();
    let reportedSteps = 0;
    while (Date.now() - start < AgentTaskService.MAX_DURATION) {
      await this.sleep(AgentTaskService.POLL_INTERVAL);

      let task: BackendAgentTask;
      try {
        task = await this.api.getClient().backend().agent().task().get('' + agentId, taskId);
      } catch (error) {
        // a single failed poll i.e. a network error should not stop the progress, the task continues at the backend
        continue;
      }

      const steps = task.steps || [];
      for (; reportedSteps < steps.length; reportedSteps++) {
        const step = steps[reportedSteps];
        indicator.request(step.name || 'Step');
        indicator.response({
          success: step.success === true,
          message: step.message || (step.success ? 'OK' : 'Failed'),
        });
      }

      if (task.status === 'completed' || task.status === 'failed' || task.status === 'canceled') {
        return {
          success: task.status === 'completed',
          message: task.message || 'Task ' + task.status,
        };
      }
    }

    return {
      success: false,
      message: 'The task is still running at the backend, the result will be available at the task list of the agent',
    };
  }

  public async cancel(agentId: number, taskId: string): Promise<CommonMessage> {
    return this.api.getClient().backend().agent().task().cancel('' + agentId, taskId);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

}

type Item = AgentItemBinary | AgentItemChoice | AgentItemObject | AgentItemText | AgentItemToolCall;
