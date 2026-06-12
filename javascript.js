//menu
var tombolMenu = $(".tombol-menu");
var menu = $("nav .menu ul");
var BATAS_MOBILE = 1200; // di bawah lebar ini, navbar memakai menu hamburger

function aktifkanMenuMobile() {
    // buka/tutup lewat tombol hamburger
    tombolMenu.off("click.menu").on("click.menu", function (e) {
        e.preventDefault();
        menu.toggle();
    });
    // tutup menu HANYA saat sebuah tautan diklik (bukan tombol bahasa)
    menu.off("click.menu").on("click.menu", "a", function () {
        menu.hide();
    });
}

function nonaktifkanMenuMobile() {
    // di desktop: lepas handler & kembalikan layout CSS (flex) penuh
    tombolMenu.off("click.menu");
    menu.off("click.menu");
    menu.css("display", "");
}

function aturMenu() {
    if ($(window).width() >= BATAS_MOBILE) {
        nonaktifkanMenuMobile();
    } else {
        menu.css("display", "none");
        aktifkanMenuMobile();
    }
}

$(document).ready(aturMenu);
$(window).resize(aturMenu);

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

// ====== Lightbox galeri ======
document.addEventListener("DOMContentLoaded", function () {
    var kontainer = document.querySelectorAll(
        "section#gallery, .galeri-homestay, .galeri-grid, .galeri-strip"
    );
    if (!kontainer.length) return;

    var lb = document.createElement("div");
    lb.id = "lightbox";
    lb.innerHTML =
        '<span class="lb-close" aria-label="Tutup">&times;</span>' +
        '<button class="lb-prev" aria-label="Sebelumnya">&#10094;</button>' +
        '<figure class="lb-fig"><img class="lb-img" src="" alt="" /><figcaption class="lb-cap"></figcaption></figure>' +
        '<button class="lb-next" aria-label="Berikutnya">&#10095;</button>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector(".lb-img");
    var lbCap = lb.querySelector(".lb-cap");
    var current = [];
    var idx = 0;

    function tampil(i) {
        idx = (i + current.length) % current.length;
        var im = current[idx];
        lbImg.src = im.src;
        lbImg.alt = im.alt || "";
        lbCap.textContent = im.getAttribute("data-cap") || im.alt || "";
    }
    function buka(list, i) {
        current = list;
        tampil(i);
        lb.classList.add("terbuka");
        document.body.style.overflow = "hidden";
    }
    function tutup() {
        lb.classList.remove("terbuka");
        document.body.style.overflow = "";
    }

    kontainer.forEach(function (c) {
        var imgs = Array.prototype.slice.call(c.querySelectorAll("img"));
        imgs.forEach(function (img, i) {
            img.style.cursor = "zoom-in";
            var fc = img.parentNode && img.parentNode.querySelector
                ? img.parentNode.querySelector("figcaption")
                : null;
            if (fc) img.setAttribute("data-cap", fc.textContent);
            img.addEventListener("click", function () { buka(imgs, i); });
        });
    });

    lb.querySelector(".lb-close").addEventListener("click", tutup);
    lb.querySelector(".lb-next").addEventListener("click", function (e) {
        e.stopPropagation(); tampil(idx + 1);
    });
    lb.querySelector(".lb-prev").addEventListener("click", function (e) {
        e.stopPropagation(); tampil(idx - 1);
    });
    lb.addEventListener("click", function (e) {
        if (e.target === lb || e.target.classList.contains("lb-fig")) tutup();
    });
    document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("terbuka")) return;
        if (e.key === "Escape") tutup();
        else if (e.key === "ArrowRight") tampil(idx + 1);
        else if (e.key === "ArrowLeft") tampil(idx - 1);
    });
});

// ====== Form Reservasi -> WhatsApp / Email ======
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("form-reservasi");
    if (!form) return;

    function nilai(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
    }

    // Bangun isi pesan reservasi; kembalikan null bila wajib belum diisi.
    function buatPesan() {
        var nama = nilai("r-nama");
        if (!nama) { document.getElementById("r-nama").focus(); return null; }
        var telepon = nilai("r-telepon");
        if (!telepon) { document.getElementById("r-telepon").focus(); return null; }

        var pesan =
            "Halo Desa Wisata Sanrobone, saya ingin melakukan reservasi.\n\n" +
            "Nama Pemesan: " + nama + "\n" +
            "No. Telepon/WhatsApp: " + telepon + "\n" +
            "Asal Daerah/Instansi: " + (nilai("r-asal") || "-") + "\n" +
            "Tanggal Kunjungan: " + (nilai("r-tanggal") || "-") + "\n" +
            "Jumlah Peserta: " + (nilai("r-peserta") || "-") + "\n" +
            "Tujuan Kunjungan: " + (nilai("r-tujuan") || "-");
        var layanan = nilai("r-layanan");
        if (layanan) pesan += "\nKebutuhan Layanan Tambahan: " + layanan;
        return pesan;
    }

    // Kirim via WhatsApp
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var pesan = buatPesan();
        if (!pesan) return;
        window.open(
            "https://wa.me/6282347764426?text=" + encodeURIComponent(pesan),
            "_blank"
        );
    });

    // Fallback: kirim via Email (tanpa WhatsApp)
    var tombolEmail = document.getElementById("kirim-email");
    if (tombolEmail) {
        tombolEmail.addEventListener("click", function () {
            var pesan = buatPesan();
            if (!pesan) return;
            var subjek = "Reservasi Desa Wisata Sanrobone";
            window.location.href =
                "mailto:desasanrobone22@gmail.com?subject=" +
                encodeURIComponent(subjek) +
                "&body=" + encodeURIComponent(pesan);
        });
    }
});

// ====== Daftarkan Service Worker (PWA) ======
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {});
    });
}

// ====== Easter egg: pesta budaya (klik logo 5x) ======
document.addEventListener("DOMContentLoaded", function () {
    var logo = document.querySelector("nav .logo");
    if (!logo) return;

    var emoji = ["🏠", "🕌", "🥁", "🌴", "🐟", "🍡", "🎉", "✨"];
    var klik = 0;
    var jeda = null;

    logo.addEventListener("click", function () {
        klik++;
        // goyangkan logo tiap klik
        logo.classList.remove("logo-goyang");
        void logo.offsetWidth; // paksa reflow agar animasi terulang
        logo.classList.add("logo-goyang");

        clearTimeout(jeda);
        jeda = setTimeout(function () { klik = 0; }, 1200);

        if (klik >= 5) {
            klik = 0;
            pestaWisata();
        }
    });

    function pestaWisata() {
        for (var i = 0; i < 36; i++) {
            var s = document.createElement("span");
            s.className = "emoji-jatuh";
            s.textContent = emoji[Math.floor(Math.random() * emoji.length)];
            s.style.left = Math.random() * 100 + "vw";
            s.style.fontSize = 20 + Math.random() * 26 + "px";
            var durasi = 3 + Math.random() * 3;
            s.style.animationDuration = durasi + "s";
            s.style.animationDelay = Math.random() * 1.2 + "s";
            document.body.appendChild(s);
            (function (el, t) {
                setTimeout(function () { el.remove(); }, (t + 2) * 1000);
            })(s, durasi);
        }

        var toast = document.getElementById("toast-egg");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast-egg";
            toast.innerHTML =
                '<span class="joget">🥁</span> Salama&rsquo;ki&rsquo; battu ri Sanrobone! &mdash; Selamat datang!';
            document.body.appendChild(toast);
        }
        requestAnimationFrame(function () { toast.classList.add("tampil"); });
        clearTimeout(toast._sembunyi);
        toast._sembunyi = setTimeout(function () {
            toast.classList.remove("tampil");
        }, 4500);
    }
});

// ====== Ganti bahasa Indonesia / English ======
document.addEventListener("DOMContentLoaded", function () {
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-en]"));
    var phNodes = Array.prototype.slice.call(document.querySelectorAll("[data-en-ph]"));

    // Simpan teks asli (Indonesia) pada masing-masing elemen.
    nodes.forEach(function (n) { n.__idHTML = n.innerHTML; });
    phNodes.forEach(function (n) { n.__idPH = n.getAttribute("placeholder") || ""; });

    function terapkan(lang) {
        nodes.forEach(function (n) {
            n.innerHTML = lang === "en" ? n.getAttribute("data-en") : n.__idHTML;
        });
        phNodes.forEach(function (n) {
            n.setAttribute("placeholder", lang === "en" ? n.getAttribute("data-en-ph") : n.__idPH);
        });
        document.documentElement.lang = lang;
        var btn = document.getElementById("lang-toggle");
        if (btn) btn.textContent = lang === "en" ? "ID" : "EN";
        try { localStorage.setItem("situs-lang", lang); } catch (e) {}
    }

    var tersimpan = "id";
    try { tersimpan = localStorage.getItem("situs-lang") || "id"; } catch (e) {}
    if (tersimpan === "en") terapkan("en");
    else {
        var btn0 = document.getElementById("lang-toggle");
        if (btn0) btn0.textContent = "EN";
    }

    var btn = document.getElementById("lang-toggle");
    if (btn) {
        btn.addEventListener("click", function () {
            var cur = document.documentElement.lang === "en" ? "en" : "id";
            terapkan(cur === "en" ? "id" : "en");
        });
    }
});