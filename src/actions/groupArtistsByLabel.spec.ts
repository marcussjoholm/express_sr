import { groupArtistsByLabel } from "./groupArtistsByLabel";
import { Playlist } from "../clients/sr";

describe('groupArtistsByLabel', () => {
  it('should group artists without record labels under Unknown Label', () => {
    const playlist: Playlist = [
      {
        title: 'Studentsången',
        description: 'Gustaf (Prins Av Sverige & Norge) - Studentsången',
        artist: 'Stockholms Studentsångare, Göte Widlund',
      },
      {
        title: 'The Nearness Of You',
        description: 'Sweet Jazz Trio - The Nearness Of You',
        artist: 'Sweet Jazz Trio',
        recordlabel: '',
      },

    ]

    expect(groupArtistsByLabel(playlist)).toMatchInlineSnapshot(`
{
  "Unknown Label": [
    "Stockholms Studentsångare, Göte Widlund",
    "Sweet Jazz Trio",
  ],
}
`)
  })

  it('should remove duplicates artists per label', () => {
    const playlist: Playlist = [
      {
        title: 'Studentsången',
        description: 'Gustaf (Prins Av Sverige & Norge) - Studentsången',
        artist: 'Stockholms Studentsångare, Göte Widlund',
        recordlabel: undefined
      },
      {
        title: 'Studentsången Dublett',
        description: 'Gustaf (Prins Av Sverige & Norge) - Studentsången',
        artist: 'Stockholms Studentsångare, Göte Widlund',
        recordlabel: undefined
      },
      {
        title: 'Studentsången',
        description: 'Gustaf (Prins Av Sverige & Norge) - Studentsången',
        artist: 'Stockholms Studentsångare, Göte Widlund',
        recordlabel: 'Different label'
      },
      {
        title: 'Studentsången Dublett',
        description: 'Gustaf (Prins Av Sverige & Norge) - Studentsången',
        artist: 'Stockholms Studentsångare, Göte Widlund',
        recordlabel: 'Different label'
      },

    ]

    expect(groupArtistsByLabel(playlist)).toMatchInlineSnapshot(`
{
  "Different label": [
    "Stockholms Studentsångare, Göte Widlund",
  ],
  "Unknown Label": [
    "Stockholms Studentsångare, Göte Widlund",
  ],
}
`)
  })

  it('should group artists by their record label in alphabetic order', () => {
    const playlist: Playlist = [
      {
        title: 'Studentsången',
        description: 'Gustaf (Prins Av Sverige & Norge) - Studentsången',
        artist: 'Stockholms Studentsångare, Göte Widlund',
        recordlabel: 'Universal Music',
      },
      {
        title: 'Inside the Deku Tree',
        description: 'Leon Vynehall - Inside the Deku Tree',
        artist: 'Leon Vynehall',
        recordlabel: '3024',
      },
      {
        title: 'Silver I Din Hand',
        description: 'Marie Fredriksson, Staffan Astner, Jan Kvillsäter, Ricky Johansson, Leif (1) Larson, Pelle Andersson - Silver I Din Hand',
        artist: 'Marie Fredriksson, Staffan Astner, Jan Kvillsäter, Ricky Johansson, Leif (1) Larson, Pelle Andersson',
      },
      {
        title: 'American Journey/VI. Flight and Technology',
        description: 'John Williams - American Journey/VI. Flight and Technology',
        artist: 'John Williams'
      },
      {
        title: 'Heraklion',
        description: 'Trabant 33 - Heraklion',
        artist: 'Trabant 33',
        recordlabel: 'Epidemic Sound',
      },
      {
        title: 'Cannonball',
        description: 'The Breeders - Cannonball',
        artist: 'The Breeders',
        recordlabel: '4AD',
      },
      {
        title: 'Spring Water',
        description: 'Jorga Mesfin - Spring Water',
        artist: 'Jorga Mesfin',
        recordlabel: 'Epidemic Sound',
      }
    ]

    expect(groupArtistsByLabel(playlist)).toMatchInlineSnapshot(`
{
  "3024": [
    "Leon Vynehall",
  ],
  "4AD": [
    "The Breeders",
  ],
  "Epidemic Sound": [
    "Trabant 33",
    "Jorga Mesfin",
  ],
  "Universal Music": [
    "Stockholms Studentsångare, Göte Widlund",
  ],
  "Unknown Label": [
    "Marie Fredriksson, Staffan Astner, Jan Kvillsäter, Ricky Johansson, Leif (1) Larson, Pelle Andersson",
    "John Williams",
  ],
}
`)
  })
})