import NeteaseCloudMusicApi from 'NeteaseCloudMusicApi'
const { playlist_track_all } = NeteaseCloudMusicApi

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // Default to a popular playlist (e.g., 'Heat Songs') if not provided
  // 3778678 is "Hot Songs"
  const id = query.id || '3778678'
  const limit = Number(query.limit) || 5

  try {
    const res = await playlist_track_all({
      id: id as string,
      limit: limit,
      offset: 0,
    })

    if (res.status !== 200) {
      throw new Error(`Netease API Error: ${res.status}`)
    }

    const songs = (res.body.songs as any[]) || []

    return songs.slice(0, limit).map((song) => ({
      id: song.id,
      title: song.name,
      artist: song.ar?.map((a: any) => a.name).join(' / ') || 'Unknown',
      album: song.al?.name || '',
      cover: song.al?.picUrl || '',
      // Mock 'played' count since it's not available in track list
      played: `${Math.floor(Math.random() * 500) + 100}次`
    }))

  } catch (error) {
    console.error('Failed to fetch music:', error)
    // Return mock data on error to prevent page crash
    return [
      {
        id: 1,
        title: 'We Gotta Get Out Of This Place',
        artist: 'The Animals',
        album: 'Animal Tracks',
        cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
        played: '224次'
      },
      {
        id: 2,
        title: "Runnin' Down A Dream",
        artist: 'Tom Petty',
        album: 'Full Moon Fever',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
        played: '189次'
      },
      {
        id: 3,
        title: 'The Girl Is Mine',
        artist: 'Paul McCartney',
        album: 'Thriller',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
        played: '156次'
      },
      {
        id: 4,
        title: 'Let Her Dance',
        artist: 'Bobby Fuller Four',
        album: 'Fantastic Mr. Fox',
        cover: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
        played: '142次'
      }
    ]
  }
})
