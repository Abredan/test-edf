import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const staggeredEnterAnimation = (selector: string) =>
  trigger('staggeredEnter', [
    transition(':enter', [
      query(
        selector,
        [
          style({ opacity: 0, transform: 'translateY(-20px) scale(0.8)' }),
          stagger(100, [
            animate(
              '300ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            ),
          ]),
        ],
        { optional: true }
      ),
    ]),
  ]);

export const cardAnimation = trigger('animCard', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'rotateZ(-2deg)  translateY(-50px)',
    }),
    animate(
      '300ms',
      style({
        opacity: 1,
        transform: 'rotateZ(0deg) translateY(0px)',
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms',
      style({
        opacity: 0,
        background: 'red',
        transform: 'rotateZ(2deg) translateY(50px)',
      })
    ),
  ]),
]);

export const enterAnimation = trigger('enterAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1000ms', style({ opacity: 1 })),
  ]),
]);
