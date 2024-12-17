import {Component, Input, OnInit} from '@angular/core';
import {GroupItem, NavigationService} from "../navigation.service";
import {VersionService} from "../version.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  currentVersion = '';
  items: Array<GroupItem> = [];
  @Input()
  hasInstance: boolean = false;

  constructor(private navigation: NavigationService, private version: VersionService) {
  }

  ngOnInit(): void {
    this.currentVersion = this.version.get();
    this.items = this.navigation.getAll();
  }

  changeNavHeading(item: GroupItem): void {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].visible = this.items[i].title === item.title
    }
  }

}
