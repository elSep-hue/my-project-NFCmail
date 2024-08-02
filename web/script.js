document.addEventListener('DOMContentLoaded', function() {
    const readNFCBtn = document.getElementById('readNFC');
    const quickLoginBtn = document.getElementById('quickLogin');
    const composeEmailBtn = document.getElementById('composeEmail');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementsByClassName('close')[0];

    readNFCBtn.addEventListener('click', readNFCTag);
    quickLoginBtn.addEventListener('click', quickLogin);
    composeEmailBtn.addEventListener('click', composeEmail);
    closeBtn.addEventListener('click', closeModal);

    checkNFCSupport();

    async function readNFCTag() {
        if ('NDEFReader' in window) {
            const ndef = new NDEFReader();
            try {
                showModal("Đọc thẻ NFC", "Đang đọc thẻ NFC...");
                await ndef.scan();
                ndef.onreading = event => {
                    const decoder = new TextDecoder();
                    for (const record of event.message.records) {
                        showSuccess("Đã đọc dữ liệu NFC: " + decoder.decode(record.data));
                    }
                }
            } catch (error) {
                showError("Lỗi khi đọc thẻ NFC: " + error);
            }
        } else {
            showError("Trình duyệt của bạn không hỗ trợ NFC");
        }
    }

    function quickLogin() {
        const emailUrl = quickLoginBtn.getAttribute('data-email-url');
        showModal("Đăng nhập nhanh", "Đang mở trang đăng nhập email...");
        
        setTimeout(() => {
            window.open(emailUrl, '_blank');
            closeModal();
        }, 1000);
    }

    function composeEmail() {
    const emailUrl = 'mailto:runlieriver@gmail.com?subject=Tiêu%20đề%20thư&body=Nội%20dung%20thư';
    showModal("Soạn thư nhanh", "Đang mở trang soạn thư mới...");
    
    setTimeout(() => {
        window.open(emailUrl, '_blank');
        closeModal();
    }, 1000);
}

    function showModal(title, content) {
        modalTitle.textContent = title;
        modalContent.textContent = content;
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function showError(message) {
        showModal("Lỗi", message);
    }

    function showSuccess(message) {
        showModal("Thành công", message);
    }

    function checkNFCSupport() {
        if ('NDEFReader' in window) {
            console.log("Thiết bị này hỗ trợ NFC");
        } else {
            showError("Thiết bị này không hỗ trợ NFC");
        }
    }

    // Đóng modal khi click bên ngoài
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
});