export class NotesTableRow {
  constructor(
    public unidade: string,
    public media: string,
    public tentativas: number,
    public concluido?: boolean
  ) {}
}
