import { existsSync } from "fs";
import path from "path";

/** Verifica se um arquivo existe em /public (sem expor caminhos no UI). */
export function publicAssetExists(publicPath: string) {
  const relative = publicPath.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}

export function hasPhoto(src: string) {
  return publicAssetExists(src);
}
