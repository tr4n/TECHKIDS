package techkids.vn.module3musicapp.network;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class TopSongResponse {
    public Feed feed;

    public class Feed {
        public List<Entry> entry;

        public class Entry {
            @SerializedName("im:name")
            public Name name;
            @SerializedName("im:image")
            public List<Image> image;
            @SerializedName("im:artist")
            public Artist artist;

            @Override
            public String toString() {
                return "Entry{" +
                        "name=" + name +
                        ", image=" + image +
                        ", artist=" + artist +
                        '}';
            }

            public class Name {
                public String label;
            }

            public class Image {
                public String label;
            }

            public class Artist {
                public String label;
            }

        }
    }
}
