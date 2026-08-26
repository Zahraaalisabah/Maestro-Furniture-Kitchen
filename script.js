/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("open");


        const icon =
            menuBtn.querySelector("i");


        if (nav.classList.contains("open")) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    });

}



/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");


            const icon =
                menuBtn.querySelector("i");


            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        });

    });



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        "nav a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href")
                === "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);



/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.getElementById("backTop");


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 600
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }
);



backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =====================================================
   CURRENT YEAR
===================================================== */

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".why-card, " +
        ".product-card, " +
        ".service-card, " +
        ".gallery-item, " +
        ".contact-card"
    );


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.1
        }

    );



revealElements.forEach(
    element => {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";


        revealObserver.observe(
            element
        );

    }
);

let swiperInstances = {};

// تهيئة السلايدر لجميع الأقسام
function initGallerySwipers() {
    document.querySelectorAll('.gallery-slider').forEach((sliderEl) => {
        const container = sliderEl.closest('.gallery-tab-content');
        if (!container) return;
        
        const tabId = container.id;

        swiperInstances[tabId] = new Swiper(sliderEl, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: sliderEl.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: sliderEl.querySelector('.swiper-button-next'),
                prevEl: sliderEl.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 25 }
            }
        });
    });
}

// التبديل بين التبويبات وتحديث أبعاد السلايدر
function switchGalleryTab(event, tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    document.querySelectorAll('.gallery-tab-content').forEach(content => {
        content.classList.remove('active');
    });

    const activeTab = document.getElementById('tab-' + tabName);
    if (activeTab) {
        activeTab.classList.add('active');
        
        // إعادة تحديث أبعاد وحسابات السلايدر لتجنب تشوه العرض
        if (swiperInstances['tab-' + tabName]) {
            swiperInstances['tab-' + tabName].update();
        }
    }
}

// تشغيل السلايدر بعد اكتمال تحميل عناصر الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initGallerySwipers();
});