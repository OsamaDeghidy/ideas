#!/bin/bash

# 🚀 منصة الابتكار المتكاملة - تشغيل المشروع
# Innovation Platform - Start Project Script

echo "🎉 مرحباً بك في منصة الابتكار المتكاملة"
echo "====================================="
echo ""

# التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً"
    echo "   https://nodejs.org/"
    exit 1
fi

# التحقق من إصدار Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "⚠️  تحذير: يُنصح باستخدام Node.js 18 أو أحدث"
fi

echo "✅ Node.js متوفر - إصدار: $(node -v)"
echo ""

# تثبيت التبعيات إذا لم تكن موجودة
if [ ! -d "node_modules" ]; then
    echo "📦 تثبيت التبعيات..."
    npm install
    echo ""
fi

# تشغيل المشروع
echo "🚀 بدء تشغيل المشروع..."
echo ""
echo "📱 المنصة ستفتح على: http://localhost:3000"
echo ""
echo "🎯 المميزات المتاحة:"
echo "   ✅ 16 نظام متكامل"
echo "   ✅ 9 ألعاب تفاعلية" 
echo "   ✅ نظام تقييم علمي"
echo "   ✅ اجتماعات افتراضية"
echo "   ✅ دمج Miro"
echo "   ✅ صفحات هبوط مخصصة"
echo "   ✅ نظام إشعارات متطور"
echo "   ✅ لوحة تحكم إدارية"
echo ""
echo "🔧 للإيقاف: اضغط Ctrl+C"
echo "==============================="
echo ""

# تشغيل Next.js
npm run dev
