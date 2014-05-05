package com.baidu.fex.share;

import java.io.IOException;
import java.io.InputStream;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;


import com.baidu.fex.share.ShareUtils.Wechat;

import android.content.Context;
import android.graphics.BitmapFactory;
import android.util.Base64;

public class Plugin extends CordovaPlugin{
	
	private Context context;
	
	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		// TODO Auto-generated method stub
		super.initialize(cordova, webView);
		this.context = webView.getContext();
	}
	
	@Override
	public boolean execute(String action, final CordovaArgs args,
			CallbackContext callbackContext) throws JSONException {
		
		if("wechat".equals(action)){
			cordova.getActivity().runOnUiThread(new Runnable() {
				
				@Override
				public void run() {
					
					
					JSONObject object;
					try {
						object = args.getJSONObject(0);
						final String data = object.getString("data");
						final int scene = object.getInt("scene");
						byte[] bytes = null;
						if("file".equals(object.getString("type"))){
							if(data.startsWith("http://")){
								new Thread(new Runnable() {
									
									@Override
									public void run() {
										Wechat wechat = new Wechat(cordova.getActivity());
										
										try {
											wechat.sharePhoto(download(data), scene);
										} catch (IOException e) {
											// TODO Auto-generated catch block
											e.printStackTrace();
										}
										
										
									}
								}).start();
								return;
							}else{
								bytes = ShareUtils.bmpToByteArray(BitmapFactory.decodeFile(data), true);
							}
							
//							bytes = ShareUtils.bmpToByteArray(BitmapFactory.decodeResource(context.getResources(),R.drawable.icon), true);
						}else if("datauri".equals(object.getString("type"))){
							bytes = Base64.decode(data, Base64.DEFAULT);
						}
						Wechat wechat = new Wechat(cordova.getActivity());
						
						wechat.sharePhoto(bytes, scene);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} 
					
				}
			});
			
			
		}
		
		return super.execute(action, args, callbackContext);
		
	}
	
	public byte[] download(String url) throws IOException{
		DefaultHttpClient client = new DefaultHttpClient();
		HttpGet request = new HttpGet(url);
		HttpResponse response = client.execute(request);
		HttpEntity entity = response.getEntity();
		int imageLength = (int)(entity.getContentLength());
		InputStream is = entity.getContent();

		byte[] imageBlob = new byte[imageLength];
		int bytesRead = 0;
		while (bytesRead < imageLength) {
		    int n = is.read(imageBlob, bytesRead, imageLength - bytesRead);
		    if (n <= 0)
		        ; // do some error handling
		    bytesRead += n;
		}
		return imageBlob;
	}
	
}
