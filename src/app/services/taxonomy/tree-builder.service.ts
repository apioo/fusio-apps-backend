import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendCategory,
  BackendCategoryCreate,
  BackendCategoryUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";
import {TaxonomyService} from "../taxonomy.service";

@Injectable({
  providedIn: 'root'
})
export class TreeBuilder {

  private static CACHE_KEY: string = 'fusio_taxonomy_tree';

  constructor(private taxonomy: TaxonomyService) {
  }

  async build(): Promise<Array<TaxonomyNode>> {
    const treeSession = sessionStorage.getItem(TreeBuilder.CACHE_KEY);
    if (treeSession) {
      return JSON.parse(treeSession) as Array<TaxonomyNode>;
    }

    const response = await this.taxonomy.getAll([0, 1024]);
    const tree = this.buildTree(response.entry || []);

    sessionStorage.setItem(TreeBuilder.CACHE_KEY, JSON.stringify(tree));

    return tree;
  }

  clear(): void {
    sessionStorage.removeItem(TreeBuilder.CACHE_KEY);
  }

  private buildTree(entries: Array<BackendCategory>): Array<TaxonomyNode> {

    entries.forEach(() => {

    });

    return [];
  }

  private getByParent(parentId: number, entries: Array<BackendCategory>) {
    return entries.filter((entry) => {
      entry.id === parentId
    });

  }

}

export type TaxonomyNode = {
  name: string;
  value: string;
  children?: TaxonomyNode[];
  disabled?: boolean;
  expanded?: boolean;
};
