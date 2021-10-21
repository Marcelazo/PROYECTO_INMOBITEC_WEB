import { Injectable } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu.interface';
import { AuthService } from 'src/app/services/auth.service';

const MENUITEMS: Menu[] = [
  {
    state: 'inicio',
    name: 'Inicio',
    type: 'link',
    icon: 'home',
    roles: ['user', 'admin'],
  },
  {
    state: 'mis-inmuebles',
    name: 'Mis Inmuebles',
    type: 'link',
    icon: 'home_work',
    roles: ['user'],
  },
  {
    state: 'depositos-transferencias',
    name: 'Depósitos',
    type: 'link',
    icon: 'payment',
    roles: ['admin'],
  },
  {
    state: 'mi-perfil',
    name: 'Mi Perfil',
    type: 'link',
    icon: 'account_circle',
    roles: ['user'],
  },
  // {
  //   state: 'material',
  //   name: 'Material Ui',
  //   type: 'sub',
  //   icon: 'bubble_chart',
  //   badge: [{ type: 'red', value: '17' }],
  //   children: [
  //     { state: 'badge', name: 'Badge', type: 'link' },
  //   ],
  // },
];

@Injectable()
export class MenuItems {
  constructor(private auth: AuthService) {}

  getMenuitem(): Menu[] {
    const list = MENUITEMS.slice();
    const roles = this.auth.session?.roles ?? [];

    for (let i = 0; i < MENUITEMS.length; i++) {
      const item = list[i];
      if (item?.roles) {
        let hasRole = false;

        for (const role of roles) {
          if (item.roles.includes(role)) {
            hasRole = true;
          }
        }

        if (!hasRole) {
          list.splice(i, 1);
        }
      }
    }

    return list;
  }
}
