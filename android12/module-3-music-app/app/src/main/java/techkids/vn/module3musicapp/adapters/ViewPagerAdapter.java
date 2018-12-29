package techkids.vn.module3musicapp.adapters;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;

import techkids.vn.module3musicapp.fragments.DownloadFragment;
import techkids.vn.module3musicapp.fragments.FavouriteFragment;
import techkids.vn.module3musicapp.fragments.MusicTypesFragment;

/**
 * Created by qklahpita on 4/15/18.
 */

public class ViewPagerAdapter extends FragmentStatePagerAdapter {
    public ViewPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0: return new MusicTypesFragment();
            case 1: return new FavouriteFragment();
            case 2: return new DownloadFragment();
        }
        return null;
    }

    @Override
    public int getCount() {
        return 3;
    }
}
