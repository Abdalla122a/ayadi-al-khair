// يُنفَّذ بعد cap add/sync: يضع أيقونة التطبيق وشاشة البداية الخاصة بلجنة أيادي الخير داخل مشروع أندرويد.
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),res=path.join(root,'android','app','src','main','res'),src=path.join(root,'android-res');
if(!fs.existsSync(res)){console.log('android project not found, skipped');process.exit(0)}
for(const d of fs.readdirSync(src)){const p=path.join(src,d);if(fs.statSync(p).isDirectory()){fs.mkdirSync(path.join(res,d),{recursive:true});for(const f of fs.readdirSync(p))fs.copyFileSync(path.join(p,f),path.join(res,d,f))}}
fs.mkdirSync(path.join(res,'mipmap-anydpi-v26'),{recursive:true});
for(const n of ['ic_launcher','ic_launcher_round'])fs.writeFileSync(path.join(res,'mipmap-anydpi-v26',n+'.xml'),`<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n  <background android:drawable="@color/ic_launcher_background"/>\n  <foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n</adaptive-icon>\n`);
fs.writeFileSync(path.join(res,'values','ic_launcher_background.xml'),`<?xml version="1.0" encoding="utf-8"?>\n<resources>\n  <color name="ic_launcher_background">#0F6B3A</color>\n</resources>\n`);
// استبدال أي splash.png افتراضي (شعار Capacitor) بشاشة البداية الخاصة بنا
(function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);if(fs.statSync(p).isDirectory())walk(p);else if(f==='splash.png')fs.copyFileSync(path.join(src,'splash.png'),p)}})(res);
console.log('android icons + splash applied');
