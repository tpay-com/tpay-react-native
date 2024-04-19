package com.tpay;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.tpay.util.TpayBackpressUtil;


class MainActivity : ReactActivity() {
  override fun getMainComponentName() = "TpayExample"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(
      this,
      getMainComponentName(),
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      DefaultNewArchitectureEntryPoint.fabricEnabled
    );
  }

  override fun onBackPressed() {
    if (TpayBackpressUtil.isModuleVisible) {
      TpayBackpressUtil.onBackPressed()
    } else {
      super.onBackPressed()
    }
  }
}
