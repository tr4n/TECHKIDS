package techkids.vn.module3musicapp.fragments;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.Unbinder;
import techkids.vn.module3musicapp.R;
import techkids.vn.module3musicapp.adapters.TopSongAdapter;
import techkids.vn.module3musicapp.utils.DownloadHandle;


/**
 * A simple {@link Fragment} subclass.
 */
public class DownloadFragment extends Fragment {


    @BindView(R.id.rv_download)
    RecyclerView rvDownload;
    Unbinder unbinder;

    public DownloadFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_download, container, false);
        unbinder = ButterKnife.bind(this, view);

        TopSongAdapter downloadedSongs = new TopSongAdapter(DownloadHandle.getTopSongs(getContext()));

        rvDownload.setAdapter(downloadedSongs);
        rvDownload.setLayoutManager(new LinearLayoutManager(getContext()));

        return view;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        unbinder.unbind();
    }
}
