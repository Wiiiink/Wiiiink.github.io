document.addEventListener('DOMContentLoaded', function() {
    const messageList = document.querySelector('.message-list');
    const messageContent = document.getElementById('messageContent');
    const visitorName = document.getElementById('visitorName');
    const submitMessage = document.getElementById('submitMessage');
    const charCount = document.querySelector('.char-count');
    const confirmModal = document.getElementById('confirmModal');
    const confirmDelete = document.getElementById('confirmDelete');
    const confirmCancel = document.getElementById('confirmCancel');
    let messageToDelete = null;

    // 模拟留言数据
    let messages = [
        {
            id: 1,
            author: '小黑子',
            content: '博主加油！',
            date: '2024-03-15'
        },
        {
            id: 2,
            author: '酱酱',
            content: '写得真好！',
            date: '2024-03-10'
        }
    ];

    // 渲染留言列表
    function renderMessages() {
        messageList.innerHTML = messages.map(message => `
            <div class="message-item" data-id="${message.id}">
                <div class="message-header">
                    <span class="message-author">${message.author || '匿名访客'}</span>
                    <span class="message-date">${message.date}</span>
                </div>
                <div class="message-content">${message.content}</div>
                <div class="message-actions">
                    <button class="delete-btn" onclick="handleDelete(${message.id})">删除</button>
                </div>
            </div>
        `).join('');
    }

    // 字符计数
    messageContent.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length}/200`;
        
        if (length > 200) {
            this.value = this.value.substring(0, 200);
            charCount.textContent = '200/200';
        }
        
        submitMessage.disabled = length === 0;
    });

    // 提交留言
    submitMessage.addEventListener('click', function() {
        const content = messageContent.value.trim();
        const name = visitorName.value.trim();

        if (content) {
            const newMessage = {
                id: messages.length + 1,
                author: name || '匿名访客',
                content: content,
                date: new Date().toLocaleDateString()
            };

            messages.unshift(newMessage);
            renderMessages();
            
            // 清空输入
            messageContent.value = '';
            visitorName.value = '';
            charCount.textContent = '0/200';
            submitMessage.disabled = true;
        }
    });

    // 删除留言
    window.handleDelete = function(messageId) {
        messageToDelete = messageId;
        confirmModal.style.display = 'block';
    };

    // 确认删除
    confirmDelete.addEventListener('click', function() {
        if (messageToDelete) {
            messages = messages.filter(message => message.id !== messageToDelete);
            renderMessages();
            closeConfirmModal();
        }
    });

    // 取消删除
    confirmCancel.addEventListener('click', closeConfirmModal);

    // 关闭确认模态框
    function closeConfirmModal() {
        confirmModal.style.display = 'none';
        messageToDelete = null;
    }

    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target == confirmModal) {
            closeConfirmModal();
        }
    });

    // 初始化渲染
    renderMessages();
}); 