package techkids.vn.module3musicapp.fragments;


import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.Unbinder;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import techkids.vn.module3musicapp.R;
import techkids.vn.module3musicapp.adapters.MusicTypesAdapter;
import techkids.vn.module3musicapp.databases.MusicTypeModel;
import techkids.vn.module3musicapp.network.MusicService;
import techkids.vn.module3musicapp.network.MusicTypesResponse;
import techkids.vn.module3musicapp.network.RetrofitInstance;


/**
 * A simple {@link Fragment} subclass.
 */
public class MusicTypesFragment extends Fragment {
    private static final String TAG = "MusicTypesFragment";
    @BindView(R.id.rv_music_types)
    RecyclerView rvMusicTypes;
    Unbinder unbinder;

    MusicTypesAdapter musicTypesAdapter;
    List<MusicTypeModel> musicTypeModels = new ArrayList<>();
    Context context;

    public MusicTypesFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        View view = inflater.inflate(R.layout.fragment_music_types, container, false);
        unbinder = ButterKnife.bind(this, view);

        musicTypesAdapter = new MusicTypesAdapter(musicTypeModels, getContext());
        rvMusicTypes.setAdapter(musicTypesAdapter);

        GridLayoutManager gridLayoutManager = new GridLayoutManager(
                context,
                2,
                GridLayoutManager.VERTICAL,
                false
        );
        gridLayoutManager.setSpanSizeLookup(new GridLayoutManager.SpanSizeLookup() {
            @Override
            public int getSpanSize(int position) {
                return position % 3 == 0 ? 2 : 1;
            }
        });
        rvMusicTypes.setLayoutManager(gridLayoutManager);

        context = getContext();

        loadData();

        return view;
    }

    private void loadData() {
        MusicService musicService = RetrofitInstance.getRetrofitInstance()
                .create(MusicService.class);
        musicService.getListMusicTypes().enqueue(new Callback<MusicTypesResponse>() {
            @Override
            public void onResponse(Call<MusicTypesResponse> call, Response<MusicTypesResponse> response) {
                List<MusicTypesResponse.MusicTypeJSON> musicTypeJSONList = response.body().subgenres;
                for (MusicTypesResponse.MusicTypeJSON musicTypeJSON : musicTypeJSONList) {
                    MusicTypeModel musicTypeModel = new MusicTypeModel(
                            musicTypeJSON.id,
                            musicTypeJSON.translation_key,
                            context.getResources().getIdentifier(
                                    "genre_x2_" + musicTypeJSON.id,
                                    "raw",
                                    context.getPackageName()
                            )
                    );
                    musicTypeModels.add(musicTypeModel);
                }
                musicTypesAdapter.notifyDataSetChanged();
            }

            @Override
            public void onFailure(Call<MusicTypesResponse> call, Throwable t) {

            }
        });
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        unbinder.unbind();
    }
}
