package techkids.vn.module3musicapp.utils;

import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import com.thin.downloadmanager.DownloadRequest;
import com.thin.downloadmanager.DownloadStatusListener;
import com.thin.downloadmanager.ThinDownloadManager;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import techkids.vn.module3musicapp.databases.TopSongModel;

public class DownloadHandle {
    private static final String TAG = "DownloadHandle";

    public static void downloadSong(final Context context, TopSongModel topSongModel) {
        Toast.makeText(context, "Start downloading...", Toast.LENGTH_SHORT).show();
        String destination = context.getFilesDir().toString() + "/"
                + topSongModel.song +"---"+ topSongModel.artist +".mp3";

        DownloadRequest downloadRequest = new DownloadRequest(Uri.parse(topSongModel.url))
                .setDestinationURI(Uri.parse(destination))
                .setDownloadContext(context)
                .setDownloadListener(new DownloadStatusListener() {
                    @Override
                    public void onDownloadComplete(int id) {
                        Toast.makeText(context, "Download completed", Toast.LENGTH_SHORT).show();

                    }

                    @Override
                    public void onDownloadFailed(int id, int errorCode, String errorMessage) {
                        Toast.makeText(context, "Download failed", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onProgress(int id, long totalBytes, long downloadedBytes, int progress) {

                    }
                });

        new ThinDownloadManager().add(downloadRequest);
    }

    public static List<TopSongModel> getTopSongs(Context context) {
        List<TopSongModel> downloadedSongs = new ArrayList<>();

        File file = new File(context.getFilesDir().toString());

        for (File f : file.listFiles()) {
            if (f.isFile()) {
                String name = f.getName();
                String nameWithoutMp3 = name.substring(0, name.lastIndexOf("."));
                String[] songInfo = nameWithoutMp3.split("---");

                TopSongModel downloadedSong = new TopSongModel(
                        context.getExternalCacheDir().toString() + "/" + name,
                        null,
                        songInfo[0],
                        songInfo[1]);

                downloadedSongs.add(downloadedSong);
            }
        }

        return downloadedSongs;
    }

    public static boolean checkIfDownloaded(TopSongModel topSongModel, Context context) {
        List<TopSongModel> topSongModels = getTopSongs(context);
        for (TopSongModel topSongModel1 : topSongModels) {
            if ((topSongModel1.song + topSongModel1.artist).equals(
                    topSongModel.song + topSongModel.artist)) {
                return true;
            }
        }
        return false;
    }
}
