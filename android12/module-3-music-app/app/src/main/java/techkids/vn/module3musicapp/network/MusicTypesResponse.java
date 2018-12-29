package techkids.vn.module3musicapp.network;

import java.util.List;

/**
 * Created by qklahpita on 4/15/18.
 */

public class MusicTypesResponse {
    public List<MusicTypeJSON> subgenres;

    public class MusicTypeJSON {
        public String id;
        public String translation_key;

        @Override
        public String toString() {
            return "MusicTypeJSON{" +
                    "id='" + id + '\'' +
                    ", translation_key='" + translation_key + '\'' +
                    '}';
        }
    }
}
