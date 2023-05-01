export class NotesTableRow {
  constructor(
    public unidade: string,
    public media: number,
    public tentativas: number,
    public concluido?: boolean
  ) {}
}
