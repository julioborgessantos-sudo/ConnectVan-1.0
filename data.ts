
import { Driver, Partner } from './types';

export const INITIAL_HERO_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1556694795-b6423d3d5b28?auto=format&fit=crop&q=80&w=1600'
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: '1',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@connectvan.com.br',
    photo: 'https://picsum.photos/seed/driver1/400/400',
    vehicleType: 'Van Escolar (20 Lugares)',
    neighborhoods: ['Itaim Bibi', 'Moema', 'Vila Nova Conceição'],
    schools: ['Colégio Mobile', 'Escola Lourenço Castanho', 'Pueri Domus'],
    description: 'Mais de 15 anos de experiência no transporte escolar. Veículo com ar-condicionado e monitores treinados para total segurança dos alunos.',
    whatsapp: '5511999999999'
  },
  {
    id: '2',
    name: 'Ana Paula Souza',
    email: 'ana.paula@connectvan.com.br',
    photo: 'https://picsum.photos/seed/driver2/400/400',
    vehicleType: 'Micro-ônibus',
    neighborhoods: ['Santana', 'Casa Verde', 'Tucuruvi'],
    schools: ['Colégio Jardim São Paulo', 'Salesiano Santa Teresinha'],
    description: 'Especializada em transporte para colégios bilíngues. Pontualidade britânica e um ambiente acolhedor para as crianças começarem bem o dia.',
    whatsapp: '5511988888888'
  },
  {
    id: '3',
    name: 'Ricardo Mendes',
    email: 'ricardo.mendes@connectvan.com.br',
    photo: 'https://picsum.photos/seed/driver3/400/400',
    vehicleType: 'Van Executiva',
    neighborhoods: ['Pinheiros', 'Butantã', 'Lapa'],
    schools: ['Colégio Santa Cruz', 'Escola Vera Cruz', 'St. Nicholas School'],
    description: 'Focado em conforto premium. Atendo principalmente a região de Pinheiros e Butantã com rotas otimizadas para menor tempo no trânsito.',
    whatsapp: '5511977777777'
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'Borracharia do Pneu',
    logo: 'https://picsum.photos/seed/pneu/200/200',
    category: 'Borracharia',
    description: 'Atendimento rápido para vans e ônibus escolares com condições especiais.',
    whatsapp: '5511999991111'
  },
  {
    id: '2',
    name: 'Papelaria Estudar',
    logo: 'https://picsum.photos/seed/paper/200/200',
    category: 'Papelaria',
    description: 'Material escolar completo com descontos exclusivos para pais e motoristas da rede.',
    whatsapp: '5511999992222'
  },
  {
    id: '3',
    name: 'Oficina Mecânica Precision',
    logo: 'https://picsum.photos/seed/mech/200/200',
    category: 'Oficina',
    description: 'Especialistas em manutenção preventiva e corretiva para veículos de transporte escolar.',
    whatsapp: '5511999993333'
  }
];
