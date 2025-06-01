import express from 'express';
import z from 'zod/v4';
import srClient from "./clients/sr";
import { groupArtistsByLabel } from "./actions/groupArtistsByLabel";

const PORT = 3000;

const app = express();
// In production add additional generic middleware like logging, security headers, request transforms, auth etc
app.use(express.json());

const songsRequestBodySchema = z.object({
  channelId: z.coerce.number(),
  size: z.coerce.number(),
  // Hackish, there's probably a better way to do this, but this works for now
  startDateTime: z.coerce.number().transform(t => new Date(t)).optional(),
  endDateTime: z.coerce.number().transform(t => new Date(t)).optional(),
})

app.get('/songs', async (req, res) => {
  const result = songsRequestBodySchema.safeParse(req.query)

  if (!result.success) {
    res.status(400).json({
      error: 'Invalid request',
      details: result.error.issues,
    });

    return
  }

  try {
    const playlist = await srClient.getPlaylistByChannelId(result.data)
    const artistsByLabels = groupArtistsByLabel(playlist);

    res.send(artistsByLabels);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Zod validation error', error.issues);
      res.status(400).json({
        // Just an example – we would probably not want to expose this in production. Just log it internally
        error: 'API returned unexpected data format',
        details: error.issues,
      });

      return;
    }

    // In production this would be more elaborate depending on the cause.
    // Like different status codes for different errors, logging, etc.
    console.error('Error fetching playlist', error);
    res.sendStatus(500)
  }
});

app.listen(PORT, () => {
  console.log(`SR server is running on http://localhost:${PORT}`)
});