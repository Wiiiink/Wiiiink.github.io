document.addEventListener('DOMContentLoaded', function() {
    // 页面加载时添加淡入动画
    const container = document.querySelector('.container');
    container.classList.add('fade-in');
    
    // 为所有导航链接添加点击事件
    const navLinks = document.querySelectorAll('.nav-bar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标页面URL
            const targetUrl = this.getAttribute('href');
            
            // 添加退出动画
            container.classList.remove('fade-in');
            container.classList.add('fade-out');
            
            // 等待动画完成后跳转
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });
});

// 处理浏览器后退/前进按钮
window.addEventListener('pageshow', function(event) {
    const container = document.querySelector('.container');
    
    // 移除可能存在的动画类
    container.classList.remove('fade-out');
    
    // 添加淡入动画
    if (!container.classList.contains('fade-in')) {
        container.classList.add('fade-in');
    }
}); 