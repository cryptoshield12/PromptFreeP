console.log("Script loaded successfully for PromptFreeP.");

document.addEventListener('DOMContentLoaded', (event) => {
    // สามารถเพิ่มโค้ด JavaScript สำหรับการทำงานของเว็บไซต์ได้ที่นี่
    const heading = document.querySelector('h1');
    if (heading) {
        heading.addEventListener('click', () => {
            alert('คุณคลิกที่หัวข้อ!');
        });
    }
});
