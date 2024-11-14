export class textFormatter {
  public formatText(input: string): string {
    return input.trim().toLowerCase().replace(/\s+/g, '_');
  }
}
