import {List} from "ngx-fusio-sdk";
import {Component, inject, signal} from "@angular/core";
import {Mover, TaxonomyType} from "../services/taxonomy/mover.service";
import {TreeBuilder} from "../services/taxonomy/tree-builder.service";

@Component({
  template: '',
})
export abstract class TaxonomyList<T> extends List<T> {

  hasTaxonomy = signal<boolean>(false);

  private mover = inject(Mover);
  private treeBuilder = inject(TreeBuilder);

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.hasTaxonomy.set(await this.treeBuilder.has());
  }

  async doBatchTaxonomy() {
    try {
      const response = await this.mover.move(this.getTaxonomyType(), this.selected());

      await this.doSearch(1, 'taxonomy_id:' + response.id);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  abstract getTaxonomyType(): TaxonomyType;

}
