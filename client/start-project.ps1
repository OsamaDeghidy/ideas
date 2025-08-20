# 🚀 منصة الابتكار المتكاملة - تشغيل المشروع
# Innovation Platform - Start Project Script

Write-Host "🎉 مرحباً بك في منصة الابتكار المتكاملة" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# التحقق من وجود Node.js
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js متوفر - إصدار: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً" -ForegroundColor Red
    Write-Host "   https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# تثبيت التبعيات إذا لم تكن موجودة
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 تثبيت التبعيات..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# تشغيل المشروع
Write-Host "🚀 بدء تشغيل المشروع..." -ForegroundColor Green
Write-Host ""
Write-Host "📱 المنصة ستفتح على: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 المميزات المتاحة:" -ForegroundColor Magenta
Write-Host "   ✅ 16 نظام متكامل" -ForegroundColor White
Write-Host "   ✅ 9 ألعاب تفاعلية" -ForegroundColor White
Write-Host "   ✅ نظام تقييم علمي" -ForegroundColor White
Write-Host "   ✅ اجتماعات افتراضية" -ForegroundColor White
Write-Host "   ✅ دمج Miro" -ForegroundColor White
Write-Host "   ✅ صفحات هبوط مخصصة" -ForegroundColor White
Write-Host "   ✅ نظام إشعارات متطور" -ForegroundColor White
Write-Host "   ✅ لوحة تحكم إدارية" -ForegroundColor White
Write-Host ""
Write-Host "🔧 للإيقاف: اضغط Ctrl+C" -ForegroundColor Yellow
Write-Host "===============================" -ForegroundColor Cyan
Write-Host ""

# تشغيل Next.js
npm run dev
