let currentSlide = 1;
const totalSlides = 8;

const slides = [
    document.getElementById('slide1'),
    document.getElementById('slide2'),
    document.getElementById('slide3'),
    document.getElementById('slide4'),
    document.getElementById('slide5'),
    document.getElementById('slide6'),
    document.getElementById('slide7'),
    document.getElementById('slide8')
];

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    
    // Slayt numarasını kontrol et
    if (n > totalSlides) currentSlide = 1;
    if (n < 1) currentSlide = totalSlides;

    // Tüm slaytları gizle
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Aktif slaytı göster
    slides[currentSlide - 1].classList.add('active');

    // Son slayta gelindiğinde konfeti efekti
    if (currentSlide === totalSlides) {
        createConfetti();
    }
}

function nextSlide() {
    showSlide(currentSlide += 1);
}

function prevSlide() {
    showSlide(currentSlide -= 1);
}

// Kalp oluşturma fonksiyonu
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    
    const colors = [
        '#ff69b4', '#ff1493', '#db7093', '#ff69b4',
        '#ffb6c1', '#ffc0cb', '#ff82ab', '#ff34b3'
    ];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.color = color;
    
    const size = Math.random() * 20 + 20;
    heart.style.fontSize = size + 'px';
    
    document.querySelector('.hearts-container').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Konfeti efekti
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Müzik kontrolü
const audio = document.getElementById('background-music');
audio.volume = 0.3;

function playSong(songSrc) {
    audio.src = songSrc;
    audio.play().catch(error => {
        console.log("Müzik çalma hatası:", error);
    });
}

// Kalpleri sürekli oluştur
setInterval(createHeart, 100);

// Sayfa yüklendiğinde ilk slaytı göster
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});

// Sayfa yüklendiğinde müziği otomatik başlat
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    audio.volume = 0.3; // Ses seviyesi %30
    
    // Müziği başlatmayı dene
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Otomatik oynatma başarılı
                console.log("Müzik başladı");
            })
            .catch(error => {
                // Tarayıcı otomatik oynatmaya izin vermedi
                console.log("Otomatik oynatma engellendi:", error);
                // Kullanıcı etkileşimi ile müziği başlatmak için sayfaya tıklama eventi ekle
                document.body.addEventListener('click', function playOnClick() {
                    audio.play();
                    document.body.removeEventListener('click', playOnClick);
                }, { once: true });
            });
    }
});

// Sayaç fonksiyonu
function startKissCounter() {
    let count = 0;
    const kissCount = document.getElementById('kissCount');
    
    // Her 100 milisaniyede bir sayacı artır
    setInterval(() => {
        count++;
        kissCount.textContent = count.toLocaleString(); // Sayıyı formatlı göster
    }, 100);
}

// Sayfa yüklendiğinde sayacı başlat
document.addEventListener('DOMContentLoaded', () => {
    startKissCounter();
}); 