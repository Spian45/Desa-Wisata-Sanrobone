//menu
var tombolMenu = $(".tombol-menu");
var menu = $("nav .menu ul");

function klikMenu() {
    tombolMenu.click(function () {
        menu.toggle();
    });
    menu.click(function () {
        menu.toggle();
    });
}

$(document).ready(function () {
    var width = $(window).width();
    if (width < 990) {
        klikMenu();
    }
})

//check lebar
$(window).resize(function () {
    var width = $(window).width();
    if (width > 989) {
        menu.css("display", "block");
        //display:block
    } else {
        menu.css("display", "none");
    }
    klikMenu();
});

//efek scroll
$(document).ready(function () {
    var scroll_pos = 0;
    $(document).scroll(function () {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 0) {
            $("nav").addClass("putih");
            $("nav img.hitam").show();
            $("nav img.putih").hide();
        } else {
            $("nav").removeClass("putih");
            $("nav img.hitam").hide();
            $("nav img.putih").show();
        }
    })
});

// ====== Penyempurnaan Tampilan ======
document.addEventListener("DOMContentLoaded", function () {

    // 1) Animasi muncul saat di-scroll (scroll reveal).
    // Class .reveal sengaja ditambahkan lewat JS supaya konten tetap
    // terlihat apabila JavaScript gagal dimuat.
    var selektor = [
        ".konten-isi", ".artikel-detail",
        ".sosbud-box", ".esensi-box", ".skor-box", ".sumber-box",
        ".kontak-box", ".kontak-pemesanan",
        ".support > div", ".tim > div",
        ".homestay-card", ".ulasan-card", ".ulasan-skor",
        ".produk-item", ".pilar-item", ".fasilitas-item", ".galeri-item",
        "section#gallery > div",
        "section h3", "p.ringkasan"
    ].join(",");

    var blok = Array.prototype.slice.call(document.querySelectorAll(selektor));

    // Beri jeda berurutan (stagger) untuk item yang bersebelahan dalam grid.
    var grup = document.querySelectorAll(
        ".support, .tim, .homestay-grid, .ulasan-grid, .pilar-grid, .galeri-grid, section#gallery"
    );
    grup.forEach(function (g) {
        Array.prototype.forEach.call(g.children, function (anak, i) {
            anak.style.transitionDelay = (i % 6) * 0.08 + "s";
        });
    });

    if ("IntersectionObserver" in window) {
        blok.forEach(function (el) { el.classList.add("reveal"); });
        var pengamat = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("tampil");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        blok.forEach(function (el) { pengamat.observe(el); });
    }

    // 2) Bar progres baca di atas halaman.
    var bar = document.createElement("div");
    bar.id = "progress-bar";
    document.body.appendChild(bar);

    // 3) Tombol kembali ke atas.
    var keAtas = document.createElement("button");
    keAtas.id = "ke-atas";
    keAtas.setAttribute("aria-label", "Kembali ke atas");
    keAtas.innerHTML = "&#8593;";
    keAtas.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(keAtas);

    function saatScroll() {
        var atas = window.pageYOffset || document.documentElement.scrollTop;
        var tinggi = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = (tinggi > 0 ? (atas / tinggi) * 100 : 0) + "%";
        keAtas.classList.toggle("tampil", atas > 400);
    }
    window.addEventListener("scroll", saatScroll, { passive: true });
    saatScroll();

    // 4) Animasi hitung naik untuk band statistik.
    var angkaEl = document.querySelectorAll(".statistik .angka");
    if (angkaEl.length && "IntersectionObserver" in window) {
        var obsAngka = new IntersectionObserver(function (entries, o) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var target = parseInt(el.getAttribute("data-target"), 10) || 0;
                var mulai = null;
                var durasi = 1500;
                function langkah(ts) {
                    if (mulai === null) mulai = ts;
                    var p = Math.min((ts - mulai) / durasi, 1);
                    // easing ease-out
                    var eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.floor(eased * target);
                    if (p < 1) {
                        requestAnimationFrame(langkah);
                    } else {
                        el.textContent = target;
                    }
                }
                requestAnimationFrame(langkah);
                o.unobserve(el);
            });
        }, { threshold: 0.4 });
        angkaEl.forEach(function (el) { obsAngka.observe(el); });
    }
});

// ====== Deteksi perangkat: sentuh (mobile) vs mouse (desktop) ======
(function () {
    var sentuh =
        window.matchMedia("(hover: none), (pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
    var root = document.documentElement;
    root.classList.add(sentuh ? "is-touch" : "is-desktop");

    document.addEventListener("DOMContentLoaded", function () {

        // Kursor kustom hanya untuk perangkat dengan mouse (desktop).
        if (!sentuh) {
            var kursor = document.createElement("div");
            kursor.id = "kursor";
            document.body.appendChild(kursor);
            root.classList.add("kursor-on");

            document.addEventListener("mousemove", function (e) {
                kursor.style.transform =
                    "translate(" + e.clientX + "px," + e.clientY + "px)";
                kursor.classList.add("aktif");
            });
            document.addEventListener("mouseleave", function () {
                kursor.classList.remove("aktif");
            });

            var interaktif =
                "a, button, .tombol, .homestay-card, .ulasan-card, .produk-item, .galeri-item, .potensi-ikon, figure";
            document.addEventListener("mouseover", function (e) {
                if (e.target.closest && e.target.closest(interaktif)) {
                    kursor.classList.add("besar");
                }
            });
            document.addEventListener("mouseout", function (e) {
                if (e.target.closest && e.target.closest(interaktif)) {
                    kursor.classList.remove("besar");
                }
            });
        }

        // Efek riak (ripple) saat tombol diklik / disentuh.
        document.querySelectorAll(".tombol").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                var rect = btn.getBoundingClientRect();
                var d = Math.max(rect.width, rect.height);
                var riak = document.createElement("span");
                riak.className = "riak";
                riak.style.width = riak.style.height = d + "px";
                var px = (e.clientX || rect.left + rect.width / 2) - rect.left - d / 2;
                var py = (e.clientY || rect.top + rect.height / 2) - rect.top - d / 2;
                riak.style.left = px + "px";
                riak.style.top = py + "px";
                btn.appendChild(riak);
                setTimeout(function () { riak.remove(); }, 600);
            });
        });
    });
})();