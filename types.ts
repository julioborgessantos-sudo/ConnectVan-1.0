
export interface Driver {
  id: string;
  name: string;
  email: string;
  photo: string;
  vehicleType: string;
  neighborhoods: string[];
  schools: string[];
  description: string;
  whatsapp: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  whatsapp: string;
}

export enum PartnerCategory {
  MECHANIC = 'Oficina',
  STATIONERY = 'Papelaria',
  TIRE_SHOP = 'Borracharia',
  INSURANCE = 'Seguros',
  OTHER = 'Outros'
}
