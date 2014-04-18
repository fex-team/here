package com.baidu.fex.share;

import java.io.ByteArrayOutputStream;

import com.baidu.fex.camera.Utils;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.SendMessageToWX;
import com.tencent.mm.sdk.openapi.WXAPIFactory;
import com.tencent.mm.sdk.openapi.WXImageObject;
import com.tencent.mm.sdk.openapi.WXMediaMessage;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.BitmapFactory;
import android.os.Handler;
import android.widget.Toast;

public class ShareUtils {

	public static void tip(final Context context, final String str) {
		new Handler(context.getMainLooper()).post(new Runnable() {

			@Override
			public void run() {
				Toast.makeText(context, str, Toast.LENGTH_SHORT).show();

			}
		});

	}
	
	public static byte[] bmpToByteArray(final Bitmap bmp,
			final boolean needRecycle) {
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		bmp.compress(CompressFormat.JPEG, 100, output);
		if (needRecycle) {
			bmp.recycle();
		}

		byte[] result = output.toByteArray();
		try {
			output.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	public static class Wechat {

		private Context context;

		private static final int THUMB_SIZE = 150;

		private IWXAPI api;

		public Wechat(Context context) {

			this.context = context;
			api = WXAPIFactory.createWXAPI(context, "wxd22a74be5fdeca85",false);
			api.registerApp("wxd22a74be5fdeca85");
		}

		public void sharePhoto(byte[] photos, int scene) {
			if (!api.isWXAppInstalled()) {
				tip(context, "微信未安装");
				return;
			}

			
			Bitmap bmp = BitmapFactory.decodeByteArray(photos, 0, photos.length);
			WXImageObject imgObj = new WXImageObject(bmp);
			WXMediaMessage msg = new WXMediaMessage();
			msg.mediaObject = imgObj;

			Bitmap thumbBmp = Bitmap.createScaledBitmap(bmp, THUMB_SIZE,
					THUMB_SIZE, true);
			bmp.recycle();
			msg.thumbData = bmpToByteArray(thumbBmp, true); // 设置缩略图

			final SendMessageToWX.Req req = new SendMessageToWX.Req();
			req.transaction = buildTransaction("img");
			req.message = msg;
			req.scene = scene;
			
			api.sendReq(req);

			
		}

		private String buildTransaction(final String type) {
			return (type == null) ? String.valueOf(System.currentTimeMillis())
					: type + System.currentTimeMillis();
		}

	}
}
