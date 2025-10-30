import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  imports: [NgClass]
})
export class BadgeComponent {
  @Input({ required: true }) name!: string;
  @Input() color: string = 'gray';

  private readonly colorMap: { [key: string]: string } = {
    'red': 'inline-flex items-center rounded-md bg-red-500/85 text-white px-2 py-1 text-xs font-medium inset-ring inset-ring-red-500',
    'blue': 'inline-flex items-center rounded-md bg-blue-500/85 text-white px-2 py-1 text-xs font-medium inset-ring inset-ring-blue-500',
    'green': 'inline-flex items-center rounded-md bg-green-500/85 text-white px-2 py-1 text-xs font-medium inset-ring inset-ring-green-500',
    'orange': 'inline-flex items-center rounded-md bg-orange-500/85 text-white px-2 py-1 text-xs font-medium inset-ring inset-ring-orange-500',
    'indigo': 'inline-flex items-center rounded-md bg-indigo-500/85 text-white px-2 py-1 text-xs font-medium inset-ring inset-ring-indigo-500',
    // Agrega todos los colores que vayas a usar
    'gray': 'inline-flex items-center rounded-md bg-gray-500/85 text-white px-2 py-1 text-xs font-medium inset-ring inset-ring-gray-500',
  };

  get colorClass(): string {
    return this.colorMap[this.color] || this.colorMap['gray']; // Devuelve las clases completas o un valor por defecto
  }
}
