document.addEventListener('DOMContentLoaded', function() {
    // 页面加载时添加淡入动画
    const container = document.querySelector('.container');
    container.classList.add('fade-in');
    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // 这里添加登录逻辑
        console.log('登录信息：', {
            username,
            password,
            remember
        });
        
        // 示例：简单的验证
        if(username && password) {
            // 添加退出动画
            container.classList.remove('fade-in');
            container.classList.add('fade-out');
            
            // 等待动画完成后跳转
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 300);
        } else {
            alert('请填写完整的登录信息！');
        }
    });
}); 