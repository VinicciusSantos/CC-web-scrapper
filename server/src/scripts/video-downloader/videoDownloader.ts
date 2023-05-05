import { spawn } from "child_process";
import { AxiosInstance } from "../../axios";
import { VideoInfos, VideoSectionInfos } from "./interfaces";
import URL from "../../../../entities/URL";
import { AxiosResponse } from "axios";

export default class VideoDownloaderService {
  private scriptPath = "./videoDownloader.sh";

  public receivedUrl!: URL;

  constructor() {}

  public async download(videoUrl: URL, fileName: string): Promise<void> {
    this.receivedUrl = videoUrl;
    const manifest = await this.getVideoManifest();
    // this.callDownloadScript()
  }

  private async getVideoManifest(): Promise<string> {
    const firstToken = await this.getFirstToken();
    return "";
  }

  private async getFirstToken(): Promise<string> {
    // await AxiosInstance.get(
    //   `https://ava.ead.unip.br/webapps/unip-unip-bb-BBLEARN/Modulos/player.jsp?u=${this.userId}&d=${this.courseId}&id=${this.videoId}&instituto=ead&referencia=${this.courseReference}`
    // );
    const requestURL = `https://sistemas.unip.br/centralsistemaservico/playerblack.ashx?u=${this.userId}&d=${this.courseId}&id=${this.videoId}&instituto=ead`;
    const response = await AxiosInstance.get(requestURL, {
      headers: {
        Referer: "https://ava.ead.unip.br/",
      },
    });
    const newVideoURL = response.headers.Location;
    console.log(
      "🚀 ~ file: videoDownloader.ts:36 ~ VideoDownloaderService ~ getFirstToken ~ response.headers:",
      response.headers
    );
    const videoSectionInfosResponse: AxiosResponse<VideoSectionInfos> =
      await AxiosInstance.get(newVideoURL);
    const videoSectionInfos = videoSectionInfosResponse.data;
    return `Bearer ${videoSectionInfos.token}`;
  }

  private get videoId(): string {
    return this.receivedUrl.extractParam("id");
  }

  private get userId(): string {
    return this.receivedUrl.extractParam("u");
  }

  private get courseId(): string {
    return this.receivedUrl.extractParam("d");
  }

  private get courseReference(): string {
    return this.receivedUrl.extractParam("referencia");
  }

  private async callDownloadScript(url: string, fileName: string) {
    const process = spawn("sh", [this.scriptPath, url, fileName]);

    process.stdout.on("data", (dados) => {
      console.log(`Saída do arquivo shell: ${dados}`);
    });

    process.stderr.on("data", (dados) => {
      console.error(`Erro ao executar o arquivo shell: ${dados}`);
    });

    process.on("close", (codigo) => {
      console.log(
        `O arquivo shell foi executado com código de saída ${codigo}`
      );
    });
  }
}
