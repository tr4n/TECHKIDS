package com.example.qklahpita.draw;

import android.Manifest;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Environment;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.LinearLayout;

import com.github.clans.fab.FloatingActionButton;
import com.github.clans.fab.FloatingActionMenu;

import java.io.File;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, AdapterView.OnItemLongClickListener {
    private static final int REQUEST_PERMISSION = 1;
    private FloatingActionButton fbCamera;
    private FloatingActionButton fbBrush;
    private FloatingActionMenu fbMenu;
    private GridView gvImages;
    private LinearLayout llTextNoImage;

    GridImageAdapter gridImageAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setupPermission();
        setupUI();
    }

    private void setupPermission() {
        if (Build.VERSION.SDK_INT >= 23) {
            if (checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    == PackageManager.PERMISSION_DENIED) {
                ActivityCompat.requestPermissions(
                        this,
                        new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                        REQUEST_PERMISSION
                );
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == REQUEST_PERMISSION) {
            if (grantResults[0] == PackageManager.PERMISSION_DENIED) {
                AlertDialog.Builder builder = new AlertDialog.Builder(this);
                builder.setTitle("Warning!")
                        .setMessage("Without permission you can not use this app. " +
                                "Do you want to grant permission?")
                        .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                ActivityCompat.requestPermissions(
                                        MainActivity.this,
                                        new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                                        REQUEST_PERMISSION
                                );
                            }
                        })
                        .setNegativeButton("No", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                MainActivity.this.finish();
                            }
                        })
                        .show();
            }
        }
    }

    private void setupUI() {
        fbCamera = findViewById(R.id.fb_camera);
        fbBrush = findViewById(R.id.fb_brush);
        fbMenu = findViewById(R.id.fb_menu);
        gvImages = findViewById(R.id.gv_images);
        llTextNoImage = findViewById(R.id.ll_text_no_image);

        fbCamera.setOnClickListener(this);
        fbBrush.setOnClickListener(this);

        gvImages.setOnItemLongClickListener(this);
        checkIfShowTextNoImageOrNot();
    }

    @Override
    public void onClick(View view) {
        Intent intent = new Intent(this, DrawActivity.class);

        if (view.getId() == R.id.fb_camera) {
            intent.putExtra("camera_mode", true);
        } else {
            intent.putExtra("camera_mode", false);
        }

        startActivity(intent);

        fbMenu.close(false);
    }

    @Override
    protected void onStart() {
        super.onStart();

        checkIfShowTextNoImageOrNot();
        gridImageAdapter = new GridImageAdapter(this);
        gvImages.setAdapter(gridImageAdapter);
    }

    @Override
    public boolean onItemLongClick(AdapterView<?> adapterView, View view, final int position, long l) {
        new AlertDialog.Builder(this)
                .setTitle(ImageUtils.getListImage().get(position).name)
                .setMessage("Do you want to delete this image?")
                .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        File file = new File(Environment.getExternalStorageDirectory() + "/" + ImageUtils.folderName,
                                ImageUtils.getListImage().get(position).name);

                        file.delete();
                        gridImageAdapter.refreshList();
                        checkIfShowTextNoImageOrNot();
                    }
                })
                .setNegativeButton("No", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                    }
                })
                .create()
                .show();
        return false;
    }

    public void checkIfShowTextNoImageOrNot() {
        if (ImageUtils.getListImage().size() == 0) {
            llTextNoImage.setVisibility(View.VISIBLE);
        } else {
            llTextNoImage.setVisibility(View.GONE);
        }
    }
}
