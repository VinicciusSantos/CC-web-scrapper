export type LinkType =
  | "PLANO DE ENSINO"
  | "SLIDE"
  | "VIDEOAULA"
  | "LIVRO TEXTO"
  | "TEXTO COMPLEMENTAR"
  | "QUESTIONARIO"
  | "ATIVIDADE"
  | "OUTROS";

export type LinkFormat = "PDF" | "MP4" | "HTML" | "OUTROS";

export interface CoursePageLink {
  url: string;
  name: string;
  type: LinkType;
  format: LinkFormat;
  unidade: string | null;
}

export type GetCourseLinksOutput = Record<string, CoursePageLink[]>;
