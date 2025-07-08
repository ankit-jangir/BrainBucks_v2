# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# 👉 Razorpay SDK के लिए जरूरी Keep rules
-keep class proguard.annotation.Keep
-keep class proguard.annotation.KeepClassMembers

-keep class com.razorpay.** { *; }
-dontwarn com.razorpay.**

# 👉 React Native और अन्य जरूरी rules
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# 👉 Gson (अगर इस्तेमाल हो रहा हो)
-keep class com.google.gson.** { *; }
-dontwarn com.google.gson.**

# 👉 OkHttp (अगर इस्तेमाल हो रहा हो)
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

# 👉 Retrofit (अगर इस्तेमाल हो रहा हो)
-keep class retrofit2.** { *; }
-dontwarn retrofit2.**
