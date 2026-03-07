import {Injectable} from '@angular/core';
import {BackendTaxonomy} from "fusio-sdk";
import {TaxonomyService} from "../taxonomy.service";

@Injectable({
  providedIn: 'root'
})
export class TreeBuilder {

  private static CACHE_KEY: string = 'fusio_taxonomy_tree';

  private hasTaxonomy: boolean|undefined = undefined;

  constructor(private taxonomy: TaxonomyService) {
  }

  async build(): Promise<Array<TaxonomyNode>> {
    const treeSession = sessionStorage.getItem(TreeBuilder.CACHE_KEY);
    if (treeSession) {
      return JSON.parse(treeSession) as Array<TaxonomyNode>;
    }

    const response = await this.taxonomy.getAll([0, 1024]);
    const tree = this.buildTree(response.entry || []);

    this.hasTaxonomy = undefined;

    sessionStorage.setItem(TreeBuilder.CACHE_KEY, JSON.stringify(tree));

    return tree;
  }

  clear(): void {
    sessionStorage.removeItem(TreeBuilder.CACHE_KEY);
  }

  async has(): Promise<boolean> {
    if (this.hasTaxonomy === undefined) {
      this.hasTaxonomy = (await this.build()).length > 0;
    }
    return this.hasTaxonomy;
  }

  private buildTree(entries: Array<BackendTaxonomy>, parent?: number): Array<TaxonomyNode> {
    const result: Array<TaxonomyNode> = [];
    entries.forEach((taxonomy) => {
      if (!taxonomy.id || !taxonomy.name) {
        return;
      }

      if (taxonomy.parentId !== parent) {
        return;
      }

      const children = this.buildTree(entries, taxonomy.id);

      result.push({
        name: taxonomy.name,
        value: '' + taxonomy.id,
        children: children.length > 0 ? children : undefined,
      });
    });

    return result;
  }

}

export type TaxonomyNode = {
  name: string;
  value: string;
  children?: TaxonomyNode[];
};
