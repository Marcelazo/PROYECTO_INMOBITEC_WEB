import { Component, Input, OnInit } from '@angular/core';
import { StateBadge } from 'src/app/interfaces/state-badge.interface';

@Component({
  selector: 'app-state-badge',
  templateUrl: './state-badge.component.html',
  styleUrls: ['./state-badge.component.scss'],
})
export class StateBadgeComponent implements OnInit {
  @Input() state: StateBadge | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.state === null) {
      this.state = {
        id: 0,
        type: 'warning',
        description: 'Estado',
      };
    }
  }
}
