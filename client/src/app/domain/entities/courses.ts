export default class Course {
  public name: string;
  public code: string;
  public id: string;

  constructor(readonly fullName: string, public url: string) {
    this.name = this.formmatName();
    this.code = this.getCode();
    this.id = this.getId();
  }

  private getCode(): string {
    return this.fullName.slice(0, this.fullName.indexOf(":"));
  }

  private formmatName(): string {
    return this.fullName.slice(
      this.fullName.indexOf(":") + 1,
      this.fullName.length
    ).trim();
  }

  private getId(): string {
    return (
      this.url.slice(
        this.url.indexOf("id=_") + 4,
        this.url.indexOf("id=_") + 12
      ) || ""
    );
  }
}
