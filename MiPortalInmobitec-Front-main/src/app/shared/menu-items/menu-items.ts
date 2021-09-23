import { Injectable } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu.interface';

const MENUITEMS: Menu[] = [
  {
    state: 'inicio',
    name: 'Inicio',
    type: 'link',
    icon: 'home',
  },
  {
    state: 'proyecto',
    name: 'Proyecto',
    type: 'sub',
    icon: 'home_work',
    children: [
      { state: 'crear-proyecto', name: 'Crear Proyecto', type: 'link' },

  ]
  },
  // {
  //   state: 'articulo',
  //   name: 'Articulo',
  //   type: 'link',
  //   icon: 'home_work',
  // },
  // {
  //   state: 'unidad-medida',
  //   name: 'Unidad de Medida',
  //   type: 'link',
  //   icon: 'home_work',
  // },
   {
     state: 'cliente',
     name: 'Cliente',
     type: 'link',
     icon: 'home_work',
   },
  // {
  //   state: 'proveedor',
  //   name: 'Proveedor',
  //   type: 'link',
  //   icon: 'home_work',
  // },
  // {
  //   state: 'marca',
  //   name: 'Marca',
  //   type: 'link',
  //   icon: 'home_work',
  // },
  // {
  //   state: 'grupo',
  //   name: 'Grupo',
  //   type: 'link',
  //   icon: 'home_work',
  // },
  // {
  //   state: 'familia',
  //   name: 'Familia',
  //   type: 'link',
  //   icon: 'home_work',
  // },
  // {
  //   state: 'clase',
  //   name: 'Clase',
  //   type: 'link',
  //   icon: 'home_work',
  // },
  //  {
  //    state: 'mi-perfil',
  //    name: 'Mi Perfil',
  //    type: 'link',
  //    icon: 'account_circle',
  //  },
  // {
  //   state: 'material',
  //   name: 'Material Ui',
  //   type: 'sub',
  //   icon: 'bubble_chart',
  //   badge: [{ type: 'red', value: '17' }],
  //   children: [
  //     { state: 'badge', name: 'Badge', type: 'link' },
  //     { state: 'button', name: 'Buttons Material', type: 'link' },
  //     { state: 'cards', name: 'Cards', type: 'link' },
  //     { state: 'grid', name: 'Grid List', type: 'link' },
  //   ],
  // },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
