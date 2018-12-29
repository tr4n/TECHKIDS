package techkids.vn.module3musicapp.utils;

import android.content.Context;
import android.os.Handler;
import android.support.design.widget.FloatingActionButton;
import android.util.Log;
import android.widget.ImageView;
import android.widget.SeekBar;
import android.widget.TextView;

import org.w3c.dom.Text;

import hybridmediaplayer.HybridMediaPlayer;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import techkids.vn.module3musicapp.R;
import techkids.vn.module3musicapp.databases.TopSongModel;
import techkids.vn.module3musicapp.network.LocationResponse;
import techkids.vn.module3musicapp.network.MusicService;
import techkids.vn.module3musicapp.network.RetrofitInstance;
import techkids.vn.module3musicapp.network.SearchSongResponse;

public class MusicHandle {
    private static final String TAG = "MusicHandle";

    private static HybridMediaPlayer hybridMediaPlayer;
    private static boolean keepUpdate = true;

    public static void getSearchSong(final TopSongModel topSongModel, final Context context) {
        MusicService musicService = RetrofitInstance.getRetrofitInstance()
                .create(MusicService.class);
        musicService.getSearchSong(topSongModel.song
                + " " + topSongModel.artist).enqueue(new Callback<SearchSongResponse>() {
            @Override
            public void onResponse(Call<SearchSongResponse> call, Response<SearchSongResponse> response) {
                String url = response.body().data.url;
                getLocationSong(url, context, topSongModel);
            }

            @Override
            public void onFailure(Call<SearchSongResponse> call, Throwable t) {

            }
        });
    }

    public static void getLocationSong(String url, final Context context, final TopSongModel topSongModel) {
        MusicService musicService = RetrofitInstance.getRetrofitXMLInstance()
                .create(MusicService.class);
        musicService.getLocation(url.split("=")[1]).enqueue(new Callback<LocationResponse>() {
            @Override
            public void onResponse(Call<LocationResponse> call, Response<LocationResponse> response) {
                String url = response.body().trackXML.location.trim();
                topSongModel.url = url;

                if (hybridMediaPlayer != null) {
                    if (hybridMediaPlayer.isPlaying()) {
                        hybridMediaPlayer.pause();
                    }
                    hybridMediaPlayer.release();
                }

                hybridMediaPlayer = HybridMediaPlayer.getInstance(context);
                hybridMediaPlayer.setDataSource(url);
                hybridMediaPlayer.prepare();
                hybridMediaPlayer.setOnPreparedListener(new HybridMediaPlayer.OnPreparedListener() {
                    @Override
                    public void onPrepared(HybridMediaPlayer hybridMediaPlayer) {
                        hybridMediaPlayer.play();
                    }
                });
            }

            @Override
            public void onFailure(Call<LocationResponse> call, Throwable t) {

            }
        });
    }

    public static void playPause() {
        if (hybridMediaPlayer != null) {
            if (hybridMediaPlayer.isPlaying()) {
                hybridMediaPlayer.pause();
            } else {
                hybridMediaPlayer.play();
            }
        }
    }

    public static void updateRealtimeUI(final SeekBar seekBar,
                                        final FloatingActionButton floatingActionButton,
                                        final TextView tvCurrent,
                                        final TextView tvDuration,
                                        final ImageView imageView) {

        final Handler handler = new Handler();
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                //update
                if (hybridMediaPlayer != null && keepUpdate) {
                    seekBar.setMax(hybridMediaPlayer.getDuration());
                    seekBar.setProgress(hybridMediaPlayer.getCurrentPosition());

                    if (hybridMediaPlayer.isPlaying()) {
                        floatingActionButton.setImageResource(R.drawable.ic_pause_black_24dp);
                    } else {
                        floatingActionButton.setImageResource(R.drawable.ic_play_arrow_black_24dp);
                    }

                    Utils.rotateImage(imageView, hybridMediaPlayer.isPlaying());

                    if (tvCurrent != null) {
                        tvCurrent.setText(Utils.formatTime(hybridMediaPlayer.getCurrentPosition()));
                        tvDuration.setText(Utils.formatTime(hybridMediaPlayer.getDuration()));
                    }
                    Log.d(TAG, "run: ");

                }

                //100ms run code
                handler.postDelayed(this, 100);
            }
        };
        runnable.run();

        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
                keepUpdate = false;
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                hybridMediaPlayer.seekTo(seekBar.getProgress());
                keepUpdate = true;
            }
        });
    }
}
