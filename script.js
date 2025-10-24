// ฟังก์ชันสำหรับสร้าง HTML ของ Prompt Card
function createPromptCard(promptData) {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.innerHTML = `
        <div class="prompt-image-placeholder"></div>
        <p class="prompt-text">${promptData.prompt}</p>
        <div class="prompt-actions">
            <button class="btn btn-copy" data-prompt="${promptData.prompt}"><i class="fas fa-copy"></i> คัดลอก Prompt</button>
            <button class="btn btn-detail">รายละเอียดเพิ่มเติม</button>
        </div>
    `;
    return card;
}

// ฟังก์ชันสำหรับโหลดและแสดง Prompts
function loadPrompts(jsonPath, containerId) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                data.forEach(promptData => {
                    container.appendChild(createPromptCard(promptData));
                });
                // หลังจากโหลดเสร็จ ให้เรียกใช้ฟังก์ชันตั้งค่าปุ่มคัดลอก
                setupCopyButtons();
            }
        })
        .catch(error => console.error('Error loading prompts:', error));
}

// ฟังก์ชันสำหรับตั้งค่าปุ่มคัดลอก
function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // ใช้ data-prompt จากปุ่มโดยตรง
            const promptText = event.target.closest('.btn-copy').dataset.prompt;

            // คัดลอกไปยัง Clipboard
            navigator.clipboard.writeText(promptText).then(() => {
                // เปลี่ยนข้อความเป็น "คัดลอกแล้ว!" ชั่วคราว
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> คัดลอกแล้ว!';
                setTimeout(() => {
                    button.innerHTML = originalText;
                }, 1500);
            }).catch(err => {
                console.error('Could not copy text: ', err);
                alert('ไม่สามารถคัดลอกได้ กรุณาลองใหม่');
            });
        });
    });

    // ฟังก์ชันสำหรับปุ่ม "รายละเอียดเพิ่มเติม" (Placeholder)
    const detailButtons = document.querySelectorAll('.btn-detail');
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('ฟังก์ชันรายละเอียดเพิ่มเติมจะแสดงข้อมูลเชิงลึกของ Prompt นี้');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // ฟังก์ชันสำหรับปุ่ม "สุ่ม Prompt (Random Prompt) 🎲" (สำหรับ index.html)
    const randomPromptButton = document.getElementById('random-prompt-btn');
    const searchInput = document.getElementById('search-input');
    const samplePrompts = [
        "A hyperrealistic portrait of a samurai cat in a neon alley, cinematic lighting, 8k",
        "A dreamy landscape of floating islands and waterfalls, digital painting, fantasy art",
        "Cyberpunk city at night, rain, reflections, high detail, photorealistic",
        "A cute baby dragon sleeping on a pile of gold coins, 3D render, Pixar style",
        "Abstract watercolor splash of blue and pink, high resolution"
    ];

    if (randomPromptButton && searchInput) {
        randomPromptButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * samplePrompts.length);
            searchInput.value = samplePrompts[randomIndex];
            alert('สุ่ม Prompt ได้แล้ว! ลองกดค้นหาดูสิ');
        });
    }

    // ตั้งค่าปุ่มคัดลอกสำหรับ Prompts ที่โหลดมาแต่แรกใน index.html
    setupCopyButtons();
});

// ทำให้ฟังก์ชัน loadPrompts สามารถเรียกใช้จาก set1.html ได้
// (ไม่จำเป็นต้อง export เพราะอยู่ใน global scope ของ script tag ใน set1.html)

