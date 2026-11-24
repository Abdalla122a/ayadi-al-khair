// يجمع ملفات الويب فقط في مجلد www قبل مزامنة Capacitor (حتى لا تدخل node_modules وملفات SQL في الـ APK).
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),out=path.join(root,'www');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const f of ['index.html','manifest.webmanifest','service-worker.js'])fs.copyFileSync(path.join(root,f),path.join(out,f));
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
console.log('www ready');
