        document.addEventListener('DOMContentLoaded', () => {
            // 1. Mobile Navigation Toggle
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });

            // 2. Data Katalog Perlengkapan Camping dari Berbagai Owner
            const equipmentData = [
                {
                    id: 1,
                    name: "Tenda Dome Kapasitas 4 Orang (Double Layer)",
                    category: "Tenda & Shelter",
                    price: 45000,
                    owner: "Rimba Camp Gear • Bandung",
                    rating: "4.9 (128 sewa)",
                    badge: "Favorit Pemula",
                    desc: "Tenda double layer tahan hujan deras (waterproof PU 3000mm), frame fiber kokoh, dilengkapi teras depan untuk menyimpan sepatu dan tas carrier.",
                    iconType: "tent"
                },
                {
                    id: 2,
                    name: "Sleeping Bag Polar Tebal + Bantal Tiup",
                    category: "Alat Tidur",
                    price: 15000,
                    owner: "Puncak Outdoor Rent • Lembang",
                    rating: "4.8 (94 sewa)",
                    badge: "Nyaman & Hangat",
                    desc: "Sleeping bag bahan dalam polar lembut yang menjaga suhu tubuh tetap hangat hingga 10°C. Sudah dicuci higienis dan wangi setelah setiap penyewaan.",
                    iconType: "sleep"
                },
                {
                    id: 3,
                    name: "Kompor Portable Windproof + Nesting Set",
                    category: "Masak & Logistik",
                    price: 20000,
                    owner: "Basecamp Adventure • Cimahi",
                    rating: "4.9 (152 sewa)",
                    badge: "Paket Masak",
                    desc: "Satu set kompor kotak anti-angin dan nesting (panci, wajan mini, teko) untuk 2–4 orang. Praktis untuk memasak mie, kopi, dan makanan hangat di camp.",
                    iconType: "cook"
                },
                {
                    id: 4,
                    name: "Tas Carrier 60L + Rain Cover",
                    category: "Carrier & Tas",
                    price: 30000,
                    owner: "Jejak Alam Store • Dago",
                    rating: "4.8 (81 sewa)",
                    badge: "Ergonomis",
                    desc: "Carrier kapasitas 60 liter dengan backsystem empuk & sirkulasi udara punggung yang baik, mengurangi pegal saat membawa perlengkapan camping.",
                    iconType: "bag"
                },
                {
                    id: 5,
                    name: "Paket Camping Pemula Hemat (Untuk 2 Orang)",
                    category: "Tenda & Shelter",
                    price: 75000,
                    owner: "Rimba Camp Gear • Bandung",
                    rating: "5.0 (210 sewa)",
                    badge: "Paling Hemat",
                    desc: "Paket lengkap siap berangkat: 1 Tenda Kapasitas 2-3 Org, 2 Sleeping Bag, 2 Matras Spons, 1 Lampu Tenda LED, dan 1 Set Kompor + Nesting.",
                    iconType: "package"
                },
                {
                    id: 6,
                    name: "Matras Aluminium Foil & Lampu Tenda LED",
                    category: "Alat Tidur",
                    price: 12000,
                    owner: "Puncak Outdoor Rent • Lembang",
                    rating: "4.7 (67 sewa)",
                    badge: "Wajib Bawa",
                    desc: "Matras penahan dingin tanah ukuran 180x60cm dipadukan dengan lampu lentera gantung LED terang dan hemat baterai.",
                    iconType: "light"
                }
            ];

            // Helper SVG Icon Generator untuk Kartu Produk
            function getEquipmentSvg(type) {
                switch(type) {
                    case 'tent':
                        return `<svg class="w-16 h-16 text-forest-primary" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 52L32 14L56 52H8Z" fill="#E07A5F" fill-opacity="0.2"/>
                            <path d="M32 14V52"/>
                            <path d="M24 52L32 34L40 52"/>
                            <path d="M4 52H60"/>
                        </svg>`;
                    case 'sleep':
                        return `<svg class="w-16 h-16 text-forest-primary" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="14" y="12" width="36" height="40" rx="10" fill="#2D6A4F" fill-opacity="0.18"/>
                            <path d="M22 22H42"/>
                            <path d="M14 30H50"/>
                            <path d="M32 30V52"/>
                        </svg>`;
                    case 'cook':
                        return `<svg class="w-16 h-16 text-forest-primary" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="16" y="30" width="32" height="14" rx="3" fill="#E07A5F" fill-opacity="0.2"/>
                            <path d="M26 24C26 20 30 18 30 14C33 17 36 20 34 24" stroke="#D97706"/>
                            <path d="M12 44H52"/>
                        </svg>`;
                    case 'bag':
                        return `<svg class="w-16 h-16 text-forest-primary" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="18" y="16" width="28" height="36" rx="8" fill="#2D6A4F" fill-opacity="0.2"/>
                            <path d="M24 16V11C24 9.5 25.5 8 27 8H37C38.5 8 40 9.5 40 11V16"/>
                            <path d="M18 30H46"/>
                            <rect x="24" y="35" width="16" height="10" rx="2"/>
                        </svg>`;
                    default:
                        return `<svg class="w-16 h-16 text-forest-primary" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 50L32 16L54 50H10Z" fill="#2D6A4F" fill-opacity="0.2"/>
                            <circle cx="48" cy="18" r="5" fill="#E07A5F"/>
                            <path d="M26 50L32 36L38 50"/>
                        </svg>`;
                }
            }

            // 3. Render Kartu Katalog & Logika Filter
            const catalogGrid = document.getElementById('catalog-grid');
            const filterBtns = document.querySelectorAll('.filter-btn');

            function renderCatalog(category = 'Semua') {
                const filtered = category === 'Semua' 
                    ? equipmentData 
                    : equipmentData.filter(item => item.category === category);

                catalogGrid.innerHTML = filtered.map(item => `
                    <div class="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                        <div>
                            <!-- Visual Ilustrasi Produk -->
                            <div class="relative h-44 bg-gradient-to-br from-ivory-warm to-emerald-50 flex items-center justify-center p-6 border-b border-stone-100">
                                <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-forest-secondary text-white shadow-sm">
                                    ${item.category}
                                </span>
                                <span class="absolute top-4 right-4 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 text-forest-primary border border-stone-200">
                                    ${item.badge}
                                </span>
                                <div class="transform group-hover:scale-110 transition-transform duration-300">
                                    ${getEquipmentSvg(item.iconType)}
                                </div>
                            </div>

                            <!-- Detail Produk -->
                            <div class="p-6 space-y-3">
                                <div class="flex items-center justify-between text-xs text-charcoal/70">
                                    <span class="font-medium truncate pr-2">${item.owner}</span>
                                    <span class="flex items-center font-bold text-amber-600 flex-shrink-0">
                                        ★ ${item.rating}
                                    </span>
                                </div>
                                <h3 class="font-bold text-lg text-forest-primary leading-snug">
                                    ${item.name}
                                </h3>
                                <p class="text-sm text-charcoal/80 line-clamp-2 leading-relaxed">
                                    ${item.desc}
                                </p>
                            </div>
                        </div>

                        <!-- Harga & Tombol Aksi -->
                        <div class="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                            <div>
                                <span class="block text-xs text-charcoal/65">Mulai dari</span>
                                <span class="font-extrabold text-lg text-forest-primary">
                                    Rp ${item.price.toLocaleString('id-ID')}
                                </span>
                                <span class="text-xs text-charcoal/70">/hari</span>
                            </div>

                            <button type="button" onclick="openRentModal(${item.id})" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-campfire-terracotta hover:bg-campfire-amber shadow transition-colors cursor-pointer">
                                Cek Ketersediaan
                            </button>
                        </div>
                    </div>
                `).join('');
            }

            // Event Listener Filter Kategori
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => {
                        b.classList.remove('bg-forest-secondary', 'text-white', 'shadow-sm');
                        b.classList.add('bg-white', 'text-charcoal', 'border', 'border-stone-200');
                    });
                    btn.classList.remove('bg-white', 'text-charcoal', 'border', 'border-stone-200');
                    btn.classList.add('bg-forest-secondary', 'text-white', 'shadow-sm');
                    
                    renderCatalog(btn.dataset.category);
                });
            });

            // Initial Render
            renderCatalog('Semua');

            // 4. Lead Capture Form & Generasi Unduhan Panduan Nyata
            const leadForm = document.getElementById('lead-capture-form');
            const successPanel = document.getElementById('download-success-panel');
            const displayUserName = document.getElementById('display-user-name');
            const displayCampType = document.getElementById('display-camp-type');

            let submittedUserData = {
                name: 'Sahabat Outdoor',
                contact: '',
                campType: 'Kelompok Teman'
            };

            leadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameVal = document.getElementById('user-name').value.trim();
                const contactVal = document.getElementById('user-contact').value.trim();
                const campTypeVal = document.getElementById('camp-type').value;

                submittedUserData = {
                    name: nameVal || 'Sahabat Outdoor',
                    contact: contactVal,
                    campType: campTypeVal
                };

                displayUserName.textContent = submittedUserData.name;
                displayCampType.textContent = submittedUserData.campType;

                leadForm.classList.add('hidden');
                successPanel.classList.remove('hidden');
            });

            // Fungsi Generate & Download File Panduan TXT/Dokumen
            function triggerEbookDownload() {
                const content = `====================================================================
PANDUAN GRATIS PERSIAPAN CAMPING UNTUK PEMULA
Diterbitkan oleh: Penyewaan Alat Outdoor dan Camping Marketplace
Disiapkan khusus untuk: ${submittedUserData.name}
Rencana Perjalanan: ${submittedUserData.campType}
====================================================================

1. CHECKLIST PERLENGKAPAN WAJIB PEMULA
[ ] Tenda Dome Double Layer (Kapasitas sesuai jumlah peserta)
[ ] Sleeping Bag (Bahan Polar / Dacron hangat)
[ ] Matras Foil atau Matras Spons (Penahan dingin tanah)
[ ] Kompor Portable + Gas Kaleng + Nesting (Alat masak)
[ ] Headlamp / Senter & Lampu Tenda LED
[ ] Jaket Hangat, Pakaian Ganti, Kaos Kaki Tebal & Jas Hujan
[ ] Kotak P3K Pribadi & Obat-obatan dasar
[ ] Kantong Sampah (Trash Bag) - Prinsip Leave No Trace

2. ESTIMASI PERBANDINGAN ANGGARAN (BELI VS SEWA)
- Tenda Kapasitas 4 Orang: Beli Rp 850.000 | Sewa Rp 45.000/hari
- Sleeping Bag Polar: Beli Rp 180.000 | Sewa Rp 15.000/hari
- Kompor + Nesting Set: Beli Rp 250.000 | Sewa Rp 20.000/hari
- Tas Carrier 60L: Beli Rp 650.000 | Sewa Rp 30.000/hari
*Kesimpulan: Menyewa alat menghemat hingga 80% biaya awal!

3. LANGKAH BERIKUTNYA
Kunjungi bagian Katalog Perlengkapan Camping di website kami untuk
memilih alat dari berbagai owner terverifikasi sesuai kebutuhanmu.
====================================================================`;

                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Panduan-Camping-Pemula-${submittedUserData.name.replace(/\s+/g, '-')}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }

            document.getElementById('btn-download-ebook-file').addEventListener('click', triggerEbookDownload);
            document.getElementById('modal-download-btn').addEventListener('click', triggerEbookDownload);

            // 5. Modal Preview E-Book
            const ebookModal = document.getElementById('ebook-preview-modal');
            document.getElementById('btn-preview-ebook').addEventListener('click', () => {
                ebookModal.classList.remove('hidden');
            });
            document.getElementById('close-ebook-modal').addEventListener('click', () => {
                ebookModal.classList.add('hidden');
            });
            document.getElementById('modal-to-catalog-btn').addEventListener('click', () => {
                ebookModal.classList.add('hidden');
            });

            // 6. Modal Detail & Simulasi Booking Sewa Alat
            const rentModal = document.getElementById('rent-modal');
            const rentDaysInput = document.getElementById('rent-days');
            const rentDateInput = document.getElementById('rent-date');
            const rentTotalPriceEl = document.getElementById('rent-total-price');
            const rentBookingForm = document.getElementById('rent-booking-form');
            const rentBookingSuccess = document.getElementById('rent-booking-success');

            // Set default tanggal besok
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            rentDateInput.value = tomorrow.toISOString().split('T')[0];

            let currentSelectedProduct = null;

            window.openRentModal = function(productId) {
                const product = equipmentData.find(p => p.id === productId);
                if (!product) return;

                currentSelectedProduct = product;
                document.getElementById('rent-modal-category').textContent = product.category;
                document.getElementById('rent-modal-title').textContent = product.name;
                document.getElementById('rent-modal-owner').textContent = product.owner;
                document.getElementById('rent-modal-price').textContent = product.price.toLocaleString('id-ID');
                document.getElementById('rent-modal-desc').textContent = product.desc;

                rentDaysInput.value = 2;
                updateRentTotal();

                rentBookingForm.classList.remove('hidden');
                rentBookingSuccess.classList.add('hidden');
                rentModal.classList.remove('hidden');
            };

            function updateRentTotal() {
                if (!currentSelectedProduct) return;
                const days = Math.max(1, parseInt(rentDaysInput.value) || 1);
                const total = currentSelectedProduct.price * days;
                rentTotalPriceEl.textContent = total.toLocaleString('id-ID');
            }

            rentDaysInput.addEventListener('input', updateRentTotal);

            rentBookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const days = Math.max(1, parseInt(rentDaysInput.value) || 1);
                const date = rentDateInput.value;
                const total = (currentSelectedProduct.price * days).toLocaleString('id-ID');

                document.getElementById('rent-booking-summary').innerHTML = `
                    Permintaan sewa <strong>${currentSelectedProduct.name}</strong> dari <strong>${currentSelectedProduct.owner}</strong> mulai tanggal <strong>${date}</strong> selama <strong>${days} hari</strong> (Total: <strong>Rp ${total}</strong>) telah dicatat. Mitra owner akan segera menghubungi kamu!
                `;

                rentBookingForm.classList.add('hidden');
                rentBookingSuccess.classList.remove('hidden');
            });

            document.getElementById('close-rent-modal').addEventListener('click', () => {
                rentModal.classList.add('hidden');
            });

            // Tutup modal saat klik area luar
            window.addEventListener('click', (e) => {
                if (e.target === ebookModal) ebookModal.classList.add('hidden');
                if (e.target === rentModal) rentModal.classList.add('hidden');
            });
        });