import { Component, OnInit } from '@angular/core';
import * as navigation from './../../navigation.json';
import * as packagejson from './../../../package.json';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  version = packagejson.version;
  navigation: Array<GroupItem> = navigation;

  constructor() { }

  ngOnInit(): void {
  }

  changeNavHeading(item: GroupItem): void {
    for (let i = 0; i < navigation.length; i++) {
      navigation[i].visible = navigation[i].title === item.title
    }
  }

}

interface GroupItem {
  title: string
  visible: boolean
  children: Array<Item>
}

interface Item {
  title: string
  icon: string
  path: string
  scope: string
}
