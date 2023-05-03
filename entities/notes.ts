export class NotesTableRow {
  constructor(
    public item: string,
    public nota: string | null,
    public concluido?: boolean
  ) {}
}
