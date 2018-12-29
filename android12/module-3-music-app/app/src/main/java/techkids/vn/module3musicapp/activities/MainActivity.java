package techkids.vn.module3musicapp.activities;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.SeekBar;
import android.widget.TextView;

import com.squareup.picasso.Picasso;
import com.squareup.picasso.Transformation;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import jp.wasabeef.picasso.transformations.CropCircleTransformation;
import techkids.vn.module3musicapp.R;
import techkids.vn.module3musicapp.adapters.ViewPagerAdapter;
import techkids.vn.module3musicapp.databases.TopSongModel;
import techkids.vn.module3musicapp.events.OnClickTopSong;
import techkids.vn.module3musicapp.fragments.MainPlayerFragment;
import techkids.vn.module3musicapp.utils.MusicHandle;
import techkids.vn.module3musicapp.utils.Utils;

public class MainActivity extends AppCompatActivity {

    @BindView(R.id.tablayout)
    TabLayout tablayout;
    @BindView(R.id.viewpager)
    ViewPager viewpager;
    @BindView(R.id.iv_top_song)
    ImageView ivTopSong;
    @BindView(R.id.fb_play)
    FloatingActionButton fbPlay;
    @BindView(R.id.tv_song)
    TextView tvSong;
    @BindView(R.id.tv_artist)
    TextView tvArtist;
    @BindView(R.id.sb_mini)
    SeekBar sbMini;
    @BindView(R.id.rl_mini)
    RelativeLayout rlMini;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);

        EventBus.getDefault().register(this);

        tablayout.getTabAt(0).getIcon().setAlpha(255);
        tablayout.getTabAt(1).getIcon().setAlpha(100);
        tablayout.getTabAt(2).getIcon().setAlpha(100);

        tablayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                tab.getIcon().setAlpha(255);
                viewpager.setCurrentItem(tab.getPosition());
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
                tab.getIcon().setAlpha(100);
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(getSupportFragmentManager());
        viewpager.setAdapter(viewPagerAdapter);
        viewpager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tablayout));

        sbMini.setPadding(0, 0, 0, 0);
    }

    @Subscribe(sticky = true)
    public void onReceivedTopSong(OnClickTopSong onClickTopSong) {
        TopSongModel topSongModel = onClickTopSong.topSongModel;

        rlMini.setVisibility(View.VISIBLE);
        tvSong.setText(topSongModel.song);
        tvArtist.setText(topSongModel.artist);

        Transformation transformation = new CropCircleTransformation();
        if (topSongModel.image == null) {
            Picasso.get()
                    .load(R.drawable.offline_music)
                    .transform(transformation)
                    .into(ivTopSong);
        } else {
            Picasso.get()
                    .load(topSongModel.image)
                    .transform(transformation)
                    .into(ivTopSong);
        }

        MusicHandle.getSearchSong(topSongModel, this);
        MusicHandle.updateRealtimeUI(sbMini, fbPlay, null, null, ivTopSong);
    }


    @Override
    public void onBackPressed() {
        if (getSupportFragmentManager().getBackStackEntryCount() != 0) {
            super.onBackPressed();
        } else {
            moveTaskToBack(true);
        }
    }

    @OnClick({R.id.fb_play, R.id.rl_mini})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.fb_play:
                MusicHandle.playPause();
                break;
            case R.id.rl_mini:
                Utils.openFragment(getSupportFragmentManager(),
                        R.id.rl_main,
                        new MainPlayerFragment());
                break;
        }
    }
}
