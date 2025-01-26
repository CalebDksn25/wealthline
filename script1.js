document.addEventListener('DOMContentLoaded', function() {
    const needle = document.getElementById('arrow');
    const counter = document.getElementById('counter');
    const input = document.getElementById('testParam');

    input.addEventListener('input', function() {
        const value = input.value;
        const rotation = (value * 1.8); // Map 0-100 to -90 to 90 degrees
        needle.style.transform = `rotate(${rotation}deg)`;
        counter.textContent = value;
    });
});
