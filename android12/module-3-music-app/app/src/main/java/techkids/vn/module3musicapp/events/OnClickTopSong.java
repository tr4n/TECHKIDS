package techkids.vn.module3musicapp.events;

import techkids.vn.module3musicapp.databases.TopSongModel;

public class OnClickTopSong {
    public TopSongModel topSongModel;

    public OnClickTopSong(TopSongModel topSongModel) {
        this.topSongModel = topSongModel;
    }
}
