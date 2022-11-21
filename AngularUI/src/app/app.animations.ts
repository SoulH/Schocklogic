import { query, style, group, animate, transition, trigger } from "@angular/animations";

const left = [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
        optional: true,
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
        optional: true,
      }),
    ]),
];
  
const right = [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
        query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
        optional: true,
        }),
        query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
        optional: true,
        }),
    ]),
];

export const slideInOut = trigger('slideInOut', [
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('200ms ease-in', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
    ])
]);
  
export const slide = trigger('slide', [
    transition(':increment', right),
    transition(':decrement', left),
]);