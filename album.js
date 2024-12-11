document.addEventListener('DOMContentLoaded', function() {
    const albumGrid = document.querySelector('.album-grid');
    const uploadBtn = document.getElementById('uploadBtn');
    const photoInput = document.getElementById('photoInput');

    // 模拟相册数据
    let photos = [
        { id: 1, url: './images/photo1.jpg', title: '酱酱', date: '2024-03-15' },
        { id: 2, url: './images/photo2.jpg', title: '小黑子', date: '2024-03-10' },
        { id: 3, url: './images/photo3.jpg', title: '酱酱二号', date: '2024-03-05' },
        { id: 4, url: './images/photo4.jpg', title: '背刺哥', date: '2024-03-01' }
    ];

    // 渲染相册
    function renderPhotos() {
        albumGrid.innerHTML = photos.map(photo => `
            <div class="photo-card" data-id="${photo.id}">
                <img src="${photo.url}" alt="${photo.title}">
                <div class="photo-info">
                    <h3>${photo.title}</h3>
                    <p>${photo.date}</p>
                </div>
            </div>
        `).join('');

        // 添加点击事件
        document.querySelectorAll('.photo-card').forEach(card => {
            card.addEventListener('click', function() {
                const photoId = this.dataset.id;
                showPhotoDetail(photoId);
            });
        });
    }

    // 上传照片功能
    uploadBtn.addEventListener('click', function() {
        photoInput.click();
    });

    photoInput.addEventListener('change', function(e) {
        const files = e.target.files;
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const newPhoto = {
                        id: photos.length + 1,
                        url: e.target.result,
                        title: '新照片',
                        date: new Date().toLocaleDateString()
                    };
                    photos.unshift(newPhoto);
                    renderPhotos();
                };
                reader.readAsDataURL(file);
            });
        }
    });

    // 显示照片详情
    function showPhotoDetail(photoId) {
        const photo = photos.find(p => p.id == photoId);
        if (photo) {
            alert(`标题: ${photo.title}\n日期: ${photo.date}`);
            // 这里可以实现更复杂的详情展示
        }
    }

    // 初始化渲染
    renderPhotos();
}); 