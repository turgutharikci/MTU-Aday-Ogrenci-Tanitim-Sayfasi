// Sayfaya hoş geldiniz mesajı
document.addEventListener("DOMContentLoaded", () => {
    console.log("Malatya Turgut Özal Üniversitesi Tanıtım Sayfası'na hoş geldiniz!");
    
    // Sayfa yüklendiğinde verileri çek
    loadFakulteler();
    loadMyo();
    loadYuksekokullar();

    // Resimlerin rastgele değişmesi için fonksiyon
    let imageIndex = 0;
    const images = ['university1.jpg', 'university2.jpg', 'university3.jpg'];

    function changeHeroImage() {
        const heroSection = document.querySelector('.hero-section');
        imageIndex = (imageIndex + 1) % images.length;
        heroSection.style.backgroundImage = `url(${images[imageIndex]})`;
    }

    // 7 saniyede bir görsel değiştir
    setInterval(changeHeroImage, 7000);
    // İlk başta bir kez değişsin
    changeHeroImage();
});

// Fotoğraf modal'ı açma
function openModal(imgElement) {
    var modal = document.getElementById("fotoModal");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

// Fotoğraf modal'ını kapatma
function closeModal() {
    var modal = document.getElementById("fotoModal");
    modal.style.display = "none";
}


// Sayfa kaydırıldıkça menü efektini uygulayan script
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    const hero = document.querySelector(".hero-section");

    // Menü için hareket efekti
    if (window.scrollY > hero.offsetHeight / 2) {
        header.style.transform = "translateY(-50px)"; // Menü biraz yukarı kayacak
    } else {
        header.style.transform = "translateY(0)"; // Menü tekrar yerine dönecek
    }
});

// Tab sekmeleri geçişini sağlamak için
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tabGroup = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        // Tüm sekmelerden "active" sınıfını kaldır
        tabGroup.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.opacity = '0';
            content.style.transform = 'scale(0.95)';
        });

        // Tıklanan sekmeye ve içeriğe "active" sınıfını ekle
        button.classList.add('active');
        const target = document.getElementById(button.dataset.tab);
        setTimeout(() => {
            target.classList.add('active');
            target.style.opacity = '1';
            target.style.transform = 'scale(1)';
        }, 200); // Geçiş efektini zamanla başlat
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
  
    counters.forEach((counter) => {
      counter.innerText = "0"; // Başlangıç değeri
  
      const updateCounter = () => {
        const target = +counter.getAttribute("data-target"); // Hedef değer
        const count = +counter.innerText;
  
        const increment = target / 100; // Hızı ayarlamak için bölme faktörü
  
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCounter, 10); // 10ms gecikme ile yenile
        } else {
          counter.innerText = target;
        }
      };
  
      updateCounter();
    });
  });

// Fakülteler verisini backend'den al ve listele
const fakulteList = document.getElementById("fakulte-list");
const myoList = document.getElementById("myo-list-ul");
const yuksekokullarList = document.getElementById("yuksekokullar-list-ul");

// Fakülteleri yüklemek için bir fonksiyon
function loadFakulteler() {
    fetch('http://localhost:3000/api/fakulteler')
        .then(response => response.json())
        .then(data => {
            // Fakülteler listesini temizle
            fakulteList.innerHTML = '';
            // Gelen veriyi listeye ekle
            data.forEach(fakulte => {
                const li = document.createElement('li');
                li.textContent = fakulte.ad; // Fakülte adını ekliyoruz
                fakulteList.appendChild(li); // Listeye ekliyoruz
            });
        })
        .catch(error => {
            console.error('Veri alınırken bir hata oluştu:', error);
        });
}

// Meslek Yüksekokullarını yüklemek için bir fonksiyon
function loadMyo() {
    fetch('http://localhost:3000/api/myo')
        .then(response => response.json())
        .then(data => {
            // Meslek Yüksekokulları listesini temizle
            myoList.innerHTML = '';
            // Gelen veriyi listeye ekle
            data.forEach(myo => {
                const li = document.createElement('li');
                li.textContent = myo.ad; // Meslek yüksekokulu adını ekliyoruz
                myoList.appendChild(li); // Listeye ekliyoruz
            });
        })
        .catch(error => console.error("Meslek Yüksekokulları alınırken bir hata oluştu:", error));
}

// Yüksekokulları yüklemek için bir fonksiyon
function loadYuksekokullar() {
    fetch('http://localhost:3000/api/yuksekokullar')
        .then(response => response.json())
        .then(data => {
            // Yüksekokullar listesini temizle
            yuksekokullarList.innerHTML = '';
            // Gelen veriyi listeye ekle
            data.forEach(yuksekokul => {
                const li = document.createElement('li');
                li.textContent = yuksekokul.ad; // Yüksekokul adını ekliyoruz
                yuksekokullarList.appendChild(li); // Listeye ekliyoruz
            });
        })
        .catch(error => console.error("Yüksekokullar alınırken bir hata oluştu:", error));
}



