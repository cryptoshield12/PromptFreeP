console.log("Script loaded successfully for PromptFreeP.");

document.addEventListener('DOMContentLoaded', () => {
    // ฟังก์ชันสำหรับคัดลอก Prompt
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // หา Prompt text ที่อยู่ในการ์ดเดียวกัน
            const promptCard = event.target.closest('.prompt-card');
            const promptTextElement = promptCard.querySelector('.prompt-text');
            const promptText = promptTextElement.textContent.trim();

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

    // ฟังก์ชันสำหรับปุ่ม "สุ่ม Prompt (Random Prompt) 🎲"
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

    // ฟังก์ชันสำหรับปุ่ม "รายละเอียดเพิ่มเติม" (Placeholder)
    const detailButtons = document.querySelectorAll('.btn-detail');
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('ฟังก์ชันรายละเอียดเพิ่มเติมจะแสดงข้อมูลเชิงลึกของ Prompt นี้');
        });
    });
});
