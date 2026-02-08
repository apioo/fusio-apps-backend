import {Component, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {Tree, TreeItem, TreeItemGroup} from '@angular/aria/tree';

@Component({
  selector: 'app-taxonomy',
  imports: [Tree, TreeItem, TreeItemGroup, NgTemplateOutlet],
  templateUrl: './taxonomy.html',
  styleUrl: './taxonomy.css',
})
export class Taxonomy {

  readonly nodes: TreeNode[] = [
    {
      name: 'Project A',
      value: 'project_a',
      children: [
        {name: 'Feature A', value: 'feature_a'},
        {name: 'Feature B', value: 'feature_b'},
        {name: 'Feature C', value: 'feature_c'},
      ],
      expanded: true,
    },
    {name: 'Draft', value: 'draft'},
  ];
  readonly selected = signal(['angular.json']);

}

type TreeNode = {
  name: string;
  value: string;
  children?: TreeNode[];
  disabled?: boolean;
  expanded?: boolean;
};
