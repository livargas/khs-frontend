import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Departamentos',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Territorios',
          route: '/territories',
          children: [
            { label: 'Listado', route: '/territories' },
            { label: 'Lugares de reunión', route: '/territories/meeting-places' },
            { label: 'Programa', route: '/territories/program' },
            { label: 'Horarios', route: '/territories/schedules' },
            { label: 'Capitanes', route: '/territories/captains' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Reporte Mensual',
          route: '/monthly-reports/resume',
        },
      ]
    },
    {
      group: 'Administración',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Publicadores',
          route: '/publishers',
        },
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Privilegios',
          route: '/privileges',
        },
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Grupos',
          route: '/groups',
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/lock-closed.svg',
        //   label: 'Auth',
        //   route: '/auth',
        //   children: [
        //     { label: 'Sign up', route: '/auth/sign-up' },
        //     { label: 'Sign in', route: '/auth/sign-in' },
        //     { label: 'Forgot Password', route: '/auth/forgot-password' },
        //     { label: 'New Password', route: '/auth/new-password' },
        //     { label: 'Two Steps', route: '/auth/two-steps' },
        //   ],
        // },
      ],
    },
    // {
    //   group: 'Collaboration',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/download.svg',
    //       label: 'Download',
    //       route: '/download',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/gift.svg',
    //       label: 'Gift Card',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/users.svg',
    //       label: 'Users',
    //       route: '/users',
    //     },
    //   ],
    // },
    // {
    //   group: 'Config',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/cog.svg',
    //       label: 'Settings',
    //       route: '/settings',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/bell.svg',
    //       label: 'Notifications',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/folder.svg',
    //       label: 'Folders',
    //       route: '/folders',
    //       children: [
    //         { label: 'Current Files', route: '/folders/current-files' },
    //         { label: 'Downloads', route: '/folders/download' },
    //         { label: 'Trash', route: '/folders/trash' },
    //       ],
    //     },
    //   ],
    // },
  ];
}
