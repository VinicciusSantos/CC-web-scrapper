import { AxiosRequestConfig, AxiosResponse } from "axios";
import { execFile } from "child_process";
import path from "path";

import URL from "../../../../entities/URL";
import { AxiosInstance } from "../../infra/http/axios";
import { VideoInfos, VideoSectionInfos } from "./interfaces";
import { Logger } from "../../infra/logger/logger";

export default class VideoDownloaderService {
  public receivedUrl!: URL;
  public redirectedUrl!: URL;
  private readonly scriptPath = path.join(__dirname, "videoDownloader.sh");
  public readonly authAccess =
    "HHMWqVULA0gtGujnz9J1x2LKTGaZxShrPiHfma1Jafu8QesvlE1RVEBPZZLL1NmIfEGpBFuTFtz6wq5IBTxsR4rTqxDuE4WHfWmV";

  private get videoId(): string {
    return this.receivedUrl.extractParam("id");
  }

  private get userId(): string {
    return this.receivedUrl.extractParam("u");
  }

  private get courseId(): string {
    return this.receivedUrl.extractParam("d");
  }

  constructor(private logger: Logger) {}

  public async download(
    videoUrl: string,
    fileName: string,
    folderPath: string
  ): Promise<void> {
    this.receivedUrl = new URL(videoUrl);
    const videoInfos = await this.getVideoInfos();
    const manifest = await this.getVideoManifestURL(videoInfos);
    const videoPath = path.join(folderPath, fileName);
    await this.callDownloadScript(manifest, videoPath);
    this.logger.success(`Download de ${fileName} concluido`);
  }

  private async getVideoInfos(): Promise<VideoInfos> {
    const firstToken = await this.getFirstToken();
    const secondToken = (await this.getVideoSectionInfos(firstToken)).token;
    const requestUrl = `https://api.unip.br/sistemas/ava/servico/video/transmissao/${this.videoId}`;
    const requestConfigs: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${secondToken}`,
        ChavePublica: this.authAccess,
      },
    };
    const videoInfos: AxiosResponse<VideoInfos> = await AxiosInstance.get(
      requestUrl,
      requestConfigs
    );
    return videoInfos.data;
  }

  private async getVideoManifestURL(videoInfos: VideoInfos): Promise<string> {
    const manifestUrl = videoInfos.midias[0].local;
    return manifestUrl + "(format=m3u8-aapl-v3)";
  }

  private async getFirstToken(): Promise<string> {
    const requestURL = `https://sistemas.unip.br/centralsistemaservico/playerblack.ashx?u=${this.userId}&d=${this.courseId}&id=${this.videoId}&instituto=ead`;
    const requestConfigs: AxiosRequestConfig = {
      headers: {
        Referer: "https://ava.ead.unip.br/",
        maxRedirects: 0,
      },
    };
    const response = await AxiosInstance.get(requestURL, requestConfigs);
    this.redirectedUrl = new URL(response.request.res.responseUrl);
    const firstToken = this.redirectedUrl.extractParam("token");
    return firstToken;
  }

  private async getVideoSectionInfos(
    token: string
  ): Promise<VideoSectionInfos> {
    const requestURL = `https://api.unip.br/sistemas/ava/servico/autenticacao/token/sepi/${token}`;
    const requestConfigs: AxiosRequestConfig = {
      headers: {
        Authorization: "Bearer",
        ChavePublica: this.authAccess,
      },
    };
    const videoInfos: AxiosResponse<VideoSectionInfos> =
      await AxiosInstance.get(requestURL, requestConfigs);
    return videoInfos.data;
  }

  private callDownloadScript(url: string, fileName: string): Promise<void> {
    return new Promise((resolve) => {
      execFile(this.scriptPath, [`"${url}"`, fileName], { shell: true }, () => {
        resolve();
      });
    });
  }
}
