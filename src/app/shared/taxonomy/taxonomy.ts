import {Component, inject, OnInit, output, signal} from '@angular/core';
import {TaxonomyNode, TreeBuilder} from "../../services/taxonomy/tree-builder.service";
import {NgClass, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-taxonomy',
  imports: [
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './taxonomy.html',
  styleUrl: './taxonomy.css',
})
export class Taxonomy implements OnInit {

  nodes = signal<Array<TaxonomyNode>>([]);
  selected = signal<string>('');

  select = output<string>();

  treeBuilder = inject(TreeBuilder);


  async ngOnInit(): Promise<void> {
    this.nodes.set(await this.treeBuilder.build());
  }

  doSelect(node: TaxonomyNode) {
    if (this.selected() === node.value) {
      this.selected.set('');
      this.select.emit('');
    } else {
      this.selected.set(node.value);
      this.select.emit(node.value)
    }
  }

}
