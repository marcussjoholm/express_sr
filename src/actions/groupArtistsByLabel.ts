import {Playlist} from "../clients/sr";

export const groupArtistsByLabel = (playlist: Playlist) => {

  const artistsByLabel: Record<string, Set<string>> = {};

  for (const song of playlist) {
    const label = song.recordlabel || "Unknown Label";
    if (!artistsByLabel[label]) {
      artistsByLabel[label] = new Set;
    }
    artistsByLabel[label].add(song.artist);
  }

  const sortedLabels = Object.keys(artistsByLabel).sort((a, b) =>
    a.localeCompare(b)
  );

  const sortedArtistsByLabel: Record<string, string[]> = {};
  for (const label of sortedLabels) {
    sortedArtistsByLabel[label] = Array.from(artistsByLabel[label])
  }

  return sortedArtistsByLabel;
}