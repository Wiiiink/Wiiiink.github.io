document.addEventListener('DOMContentLoaded', function() {
    const blogList = document.querySelector('.blog-list');
    const newPostBtn = document.getElementById('newPostBtn');
    const blogModal = document.getElementById('blogModal');
    const closeBtn = document.querySelector('.close');
    const saveBlogBtn = document.getElementById('saveBlogBtn');
    const cancelBlogBtn = document.getElementById('cancelBlogBtn');
    const blogTitle = document.getElementById('blogTitle');
    const blogContent = document.getElementById('blogContent');
    const confirmModal = document.getElementById('confirmModal');
    const confirmDelete = document.getElementById('confirmDelete');
    const confirmCancel = document.getElementById('confirmCancel');
    let postToDelete = null;

    // 模拟日志数据
    let posts = [
        {
            id: 1,
            title: '我爱东哥',
            content: '一、我爱东哥\n二、我爱东哥\n三、我爱东哥\n四、我爱东哥',
            date: '2024-03-15'
        },
        {
            id: 2,
            title: '今天也是充满希望的一天',
            content: '今天天气真好，我依然爱东哥',
            date: '2024-03-10'
        }
    ];

    // 渲染日志列表
    function renderPosts() {
        blogList.innerHTML = posts.map(post => `
            <div class="blog-post" data-id="${post.id}">
                <div class="post-header">
                    <h3 class="post-title">${post.title}</h3>
                    <span class="post-date">${post.date}</span>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                    <button class="delete-btn" onclick="handleDelete(${post.id})">删除</button>
                </div>
            </div>
        `).join('');
    }

    // 打开模态框
    newPostBtn.addEventListener('click', function() {
        blogModal.style.display = 'block';
        blogTitle.value = '';
        blogContent.value = '';
    });

    // 关闭模态框
    function closeModal() {
        blogModal.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBlogBtn.addEventListener('click', closeModal);

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target == blogModal) {
            closeModal();
        }
    });

    // 保存日志
    saveBlogBtn.addEventListener('click', function() {
        const title = blogTitle.value.trim();
        const content = blogContent.value.trim();

        if (title && content) {
            const newPost = {
                id: posts.length + 1,
                title: title,
                content: content,
                date: new Date().toLocaleDateString()
            };

            posts.unshift(newPost);
            renderPosts();
            closeModal();
        } else {
            alert('请填写标题和内容！');
        }
    });

    // 添加删除处理函数
    window.handleDelete = function(postId) {
        postToDelete = postId;
        confirmModal.style.display = 'block';
    };

    // 确认删除
    confirmDelete.addEventListener('click', function() {
        if (postToDelete) {
            posts = posts.filter(post => post.id !== postToDelete);
            renderPosts();
            closeConfirmModal();
        }
    });

    // 取消删除
    confirmCancel.addEventListener('click', closeConfirmModal);

    // 关闭确认模态框
    function closeConfirmModal() {
        confirmModal.style.display = 'none';
        postToDelete = null;
    }

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target == confirmModal) {
            closeConfirmModal();
        }
    });

    // 初始化渲染
    renderPosts();
}); 