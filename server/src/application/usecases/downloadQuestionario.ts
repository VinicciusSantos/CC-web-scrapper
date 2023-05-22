import { UNIP_BASE_URL } from "../../../../entities/pages";
import { AxiosInstance } from "../../infra/http/axios";
import { Logger } from "../../infra/logger/logger";
import PageDownloaderService from "../../scripts/page-downloader/pageDownloader";
import cheerio from "cheerio";

export default class DownloadQuestionarioUsecase {
  private pageDownloader: PageDownloaderService;
  private url!: string;

  constructor(private logger: Logger) {
    this.pageDownloader = new PageDownloaderService(logger);
  }

  public async execute(
    url: string,
    fileName: string,
    folderPath: string
  ): Promise<void> {
    this.url = url;
    const pageURL = await this.getLastAttemptPageURL();
    this.pageDownloader.download(pageURL, fileName, folderPath);
  }

  private async getLastAttemptPageURL(): Promise<string> {
    const allAttemptsPage = await this.getAllAttemptsPage();
    const $ = cheerio.load(allAttemptsPage);
    const linkElement = $(
      "table.attachments tr:last-child td:last-child a"
    )[0] as any;
    const lastAttemptURL = UNIP_BASE_URL + linkElement.attribs.href;
    return lastAttemptURL;
  }

  private async getAllAttemptsPage(): Promise<string> {
    const confirmPage = await this.getConfirmPage();
    const $ = cheerio.load(confirmPage);
    const linkElement = $('a:contains("Exibir todas as tentativas")')[0] as any;
    const allAttemptsLink = linkElement.attribs.onclick.match(/'([^']+)'/)[1];
    const fullURL = UNIP_BASE_URL + allAttemptsLink;
    const allAttemptsPageResponse = await AxiosInstance.get(fullURL);
    const allAttemptsPageHTML = cheerio
      .load(allAttemptsPageResponse.data)
      .html();
    return allAttemptsPageHTML as string;
  }

  private async getConfirmPage(): Promise<string> {
    const instructionsPage = await this.getInstructionsPage();
    const regex = /document.location\s*=\s*(['"])(.*?)\1/;
    const match = instructionsPage.match(regex);
    const confirmAttemptURL = UNIP_BASE_URL + match![2];
    const confirmAttemptPage = await AxiosInstance.get(confirmAttemptURL);
    return cheerio.load(confirmAttemptPage.data).html() as string;
  }

  private async getInstructionsPage(): Promise<string> {
    const page = await AxiosInstance.get(this.url);
    const $ = cheerio.load(page.data);
    return $.html();
  }
}
