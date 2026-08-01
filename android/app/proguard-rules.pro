# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# --- REGLAS PARA GOOGLE ML KIT (CÁMARA/SCANNER) ---
# Evita que R8 elimine las clases necesarias para el escaneo de códigos de barras
-keep class com.google.mlkit.vision.barcode.** { *; }
-keep class com.google.mlkit.vision.common.** { *; }
-keep class com.google.mlkit.common.** { *; }

# Mantener clases internas de Google Play Services usadas por ML Kit
-keep class com.google.android.gms.internal.mlkit_code_scanner.** { *; }
-keep class com.google.android.gms.internal.mlkit_vision_barcode.** { *; }

# Silenciar advertencias de clases faltantes (se resuelven en tiempo de ejecución)
-dontwarn com.google.android.gms.**
-dontwarn com.google.mlkit.**

# Mantener componentes base de Capacitor
-keep class com.getcapacitor.** { *; }
