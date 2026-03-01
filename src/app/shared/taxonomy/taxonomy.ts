import {Component, inject, OnInit, output, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {Tree, TreeItem, TreeItemGroup} from '@angular/aria/tree';
import {TaxonomyNode, TreeBuilder} from "../../services/taxonomy/tree-builder.service";

@Component({
  selector: 'app-taxonomy',
  imports: [Tree, TreeItem, TreeItemGroup, NgTemplateOutlet],
  templateUrl: './taxonomy.html',
  styleUrl: './taxonomy.css',
})
export class Taxonomy implements OnInit {

  select = output<Array<string>>();

  nodes = signal<Array<TaxonomyNode>>([]);

  treeBuilder = inject(TreeBuilder);

  readonly selected = signal<Array<string>>([]);

  async ngOnInit(): Promise<void> {
    this.nodes.set(await this.treeBuilder.build());
  }

}
