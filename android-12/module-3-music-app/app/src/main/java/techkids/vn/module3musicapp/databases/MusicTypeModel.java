package techkids.vn.module3musicapp.databases;

import java.io.Serializable;

/**
 * Created by qklahpita on 4/15/18.
 */

public class MusicTypeModel implements Serializable{
    public String id;
    public String name;
    public int imageID;

    public MusicTypeModel(String id, String name, int imageID) {
        this.id = id;
        this.name = name;
        this.imageID = imageID;
    }
}
