@echo off
echo ========================================
echo Pushing to Both GitHub Repositories
echo ========================================
echo.

echo [1/2] Pushing to DigitallyNext/realitycanvas...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ Failed to push to DigitallyNext/realitycanvas
    pause
    exit /b %errorlevel%
)
echo ✅ Successfully pushed to DigitallyNext/realitycanvas
echo.

echo [2/2] Pushing to realtycanvas/RealtyCanvas...
git push new-repo main
if %errorlevel% neq 0 (
    echo ❌ Failed to push to realtycanvas/RealtyCanvas
    pause
    exit /b %errorlevel%
)
echo ✅ Successfully pushed to realtycanvas/RealtyCanvas
echo.

echo ========================================
echo ✅ All Done! Both repositories updated.
echo ========================================
pause
