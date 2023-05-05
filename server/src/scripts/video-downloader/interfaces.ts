export interface VideoInfos {
  id: string;
  titulo: string;
  alias: string;
  gravadoEm: string;
  restrito: boolean;
  capa: any;
  midias: Midia[];
  aovivo: boolean;
  duracao: string;
  descricao: string;
  hashtags: any[];
  criadoEm: string;
  alteradoEm: string;
  status: string;
  sinalizacoes: any[];
  participantes: Participante[];
  legendas: any[];
}

export interface VideoSectionInfos {
  autorizacoes: Autorizations[];
  id: string;
  usuario: Usuario;
  token: string;
  ip: any;
  useragent: any;
  iniciaEm: string;
  terminaEm: string;
  status: string;
  criadoEm: string;
  alteradoEm: string;
}

interface Midia {
  local: string;
  diretorio: string;
  nome: string;
  extensao: string;
  mimeType: string;
}

interface Participante {
  id: string;
  nome: string;
  sobrenome: string;
  email: any;
  criadoEm: string;
  alteradoEm: string;
  status: string;
}

interface Autorizations {
  id: string;
  prefixo: string;
  rota: string;
  nome: string;
  verbo: string;
  descricao: any;
}

interface Usuario {
  id: string;
  nome: string;
  email: any;
  referencia: string;
  tipo: string;
  instituto: string;
  nivel: string;
  status: string;
  criadoEm: string;
  alteradoEm: string;
}
