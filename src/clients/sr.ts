import axios from 'axios';
import z from 'zod/v4'

function parseMicrosoftDate(msDateString: string) {
  const match = /\/Date\((\d+)(?:[+-]\d+)?\)\//.exec(msDateString);
  return match ? new Date(parseInt(match[1], 10)) : undefined;
}

interface GetPlaylistByChannelIdParams {
  channelId: number;
  startDateTime?: string;
  endDateTime?: string;
  size: number;
}

const playlistSchema = z.array(z.object({
  title: z.string(),
  description: z.string(),
  artist: z.string(),
  composer: z.string().optional(),
  albumname: z.string().optional(),
  recordlabel: z.string().optional(),
  lyricist: z.string().optional(),
  starttimeutc: z.string().transform(parseMicrosoftDate).optional(),
  stoptimeutc: z.string().transform(parseMicrosoftDate).optional(),
}))

export type Playlist = z.infer<typeof playlistSchema>


const client = axios.create({
  baseURL: 'http://api.sr.se/api/v2/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const srClient = {
  getPlaylistByChannelId: async (params: GetPlaylistByChannelIdParams): Promise<Playlist> => {
    const { channelId, startDateTime, endDateTime, size } = params;

    const data = await client.get('playlists/getplaylistbychannelid', {
      params: { id: channelId, startDateTime, endDateTime, size, format: 'json' },
    }).then(response => response.data.song)

    return playlistSchema.parse(data);
  }
}

export default srClient