package com.chatsample;

import android.app.Application;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

/**
 * Created by sawa on 2016/06/16.
 */

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        // Initialize the SDK before executing any other operations,
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
    }
}
