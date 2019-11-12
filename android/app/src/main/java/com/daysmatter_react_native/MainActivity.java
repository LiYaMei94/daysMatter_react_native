/*
 * @Author: your name
 * @Date: 2019-11-12 10:51:49
 * @LastEditTime: 2019-11-12 11:12:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \liuyan_frontend_reactnativec:\Users\123\Desktop\daysMatter_react_native\android\app\src\main\java\com\daysmatter_react_native\MainActivity.java
 */
package com.daysmatter_react_native;

import com.facebook.react.ReactActivity;

//为了完成 react-native-gesture-handler在 Android 上的安装
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

// 启动页设置添加代码
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "daysMatter_react_native";
  }
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 这里定义了在加载js的时候，同时弹起启动屏
        // 第二个参数true，是启动页全屏显示，隐藏了状态栏。
        SplashScreen.show(this, true);
        
    }
    //为了完成 react-native-gesture-handler在 Android 上的安装
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
