// navLink - a type for standardising the way a navigation link is stored
type NavLink = {
  linkTitle: string;
  url: string;
}

type SpellInfo = {
  index: string;
  name: string;
  url?: string;
};

type SpellResponse = {
  count?: number;
  results: SpellInfo[];
  totalPages: number;
};

type SpellDetailState = {
  desc: string;
  name: string;
  attack_type: string;
  casting_time: string;
  classes: { name: string }[];
  components: string[];
  concentration: boolean;
  damage?: { damage_type: { name: string } };
  duration: string;
  higher_level: string[];
  index: string;
  level: number;
  material: string;
  range: string;
  ritual: boolean;
  school: { name: string; index: string };
  subclasses: {}[];
};


export type { NavLink, SpellInfo, SpellResponse, SpellDetailState };