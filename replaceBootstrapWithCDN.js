const fs = require("fs");
const path = require("path");

// روابط CDN الرسمية لـ Bootstrap
const bootstrapCSS =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
const bootstrapJS =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";

// المجلد الحالي (اللي فيه كل ملفات المشروع)
const projectDir = __dirname; // لو السكريبت في نفس المجلد

// قراءة كل الملفات في المجلد
const files = fs.readdirSync(projectDir);

files.forEach((file) => {
  const filePath = path.join(projectDir, file);

  // مسح ملفات Bootstrap المحلية
  if (/bootstrap(\.min)?\.(css|js)$/.test(file)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${filePath}`);
    return; // لو الملف اتشال، مفيش حاجة نعدل عليه
  }

  // تعديل ملفات HTML فقط
  if (file.endsWith(".html")) {
    let content = fs.readFileSync(filePath, "utf8");

    // استبدال أي روابط Bootstrap المحلية بالـ CDN
    content = content.replace(
      /<link.*bootstrap.*\.css.*?>/gi,
      `<link href="${bootstrapCSS}" rel="stylesheet">`
    );
    content = content.replace(
      /<script.*bootstrap.*\.js.*?><\/script>/gi,
      `<script src="${bootstrapJS}"></script>`
    );

    // ترتيب السكريبت: Bootstrap JS قبل أي سكريبت آخر
    content = content.replace(
      /(<script src=".*bootstrap\.bundle\.min\.js"><\/script>)([\s\S]*?<script src=".*?"><\/script>)/i,
      `$1\n$2`
    );

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Updated: ${filePath}`);
  }
});

console.log("✅ Bootstrap replaced with CDN in all files in the folder.");
