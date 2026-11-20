        document.addEventListener('DOMContentLoaded', () => {
            // 1. Mobile Menu Toggle
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

            // 2. Kalkulator Simulasi Penghasilan & BEP Owner
            const gearSelect = document.getElementById('calc-gear-type');
            const unitsSlider = document.getElementById('calc-units');
            const daysSlider = document.getElementById('calc-days');

            const unitsDisplay = document.getElementById('calc-units-display');
            const daysDisplay = document.getElementById('calc-days-display');
            const monthlyIncomeEl = document.getElementById('calc-monthly-income');
            const yearlyIncomeEl = document.getElementById('calc-yearly-income');
            const bepMonthsEl = document.getElementById('calc-bep-months');

            function calculateOwnerIncome() {
                const selectedOption = gearSelect.options[gearSelect.selectedIndex];
                const dailyRate = parseInt(selectedOption.dataset.rate, 10);
                const assetValue = parseInt(selectedOption.dataset.asset, 10);
                const units = parseInt(unitsSlider.value, 10);
                const days = parseInt(daysSlider.value, 10);

                unitsDisplay.textContent = units;
                daysDisplay.textContent = days;

                const monthlyIncome = dailyRate * units * days;
                const yearlyIncome = monthlyIncome * 12;
                const totalAssetValue = assetValue * units;
                const bepMonths = (totalAssetValue / monthlyIncome).toFixed(1).replace('.', ',');

                monthlyIncomeEl.textContent = monthlyIncome.toLocaleString('id-ID');
                yearlyIncomeEl.textContent = yearlyIncome.toLocaleString('id-ID');
                bepMonthsEl.textContent = bepMonths;
            }

            gearSelect.addEventListener('change', calculateOwnerIncome);
            unitsSlider.addEventListener('input', calculateOwnerIncome);
            daysSlider.addEventListener('input', calculateOwnerIncome);
            calculateOwnerIncome();

            // 3. Lead Capture Form & Generasi PDF/Dokumen Panduan Owner
            const ownerLeadForm = document.getElementById('owner-lead-form');
            const ownerDownloadSuccess = document.getElementById('owner-download-success');
            let ownerLeadData = {
                name: 'Mitra Owner',
                email: '',
                city: 'Bandung',
                gear: 'Paket Camping Lengkap'
            };

            ownerLeadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                ownerLeadData = {
                    name: document.getElementById('owner-lead-name').value.trim() || 'Mitra Owner',
                    email: document.getElementById('owner-lead-email').value.trim(),
                    city: document.getElementById('owner-lead-city').value.trim() || 'Indonesia',
                    gear: document.getElementById('owner-lead-gear').value
                };

                document.getElementById('display-owner-name').textContent = ownerLeadData.name;
                document.getElementById('display-owner-city').textContent = ownerLeadData.city;

                // Pre-fill modal registrasi owner
                document.getElementById('reg-owner-name').value = ownerLeadData.name;
                document.getElementById('reg-city').value = ownerLeadData.city;

                ownerLeadForm.classList.add('hidden');
                ownerDownloadSuccess.classList.remove('hidden');
            });

            // Fungsi Unduh PDF / Panduan Bisnis Owner
            function generateOwnerPdfDownload() {
                // Membuat dokumen PDF valid sederhana (PDF 1.4) agar terunduh sebagai file .pdf asli
                const safeName = ownerLeadData.name.replace(/[^\x20-\x7E]/g, '');
                const safeCity = ownerLeadData.city.replace(/[^\x20-\x7E]/g, '');

                const lines = [
                    "PANDUAN GRATIS MEMULAI BISNIS PENYEWAAN ALAT OUTDOOR (OWNER)",
                    "Diterbitkan oleh: Penyewaan Alat Outdoor dan Camping Marketplace",
                    `Disiapkan untuk: ${safeName} (${safeCity})`,
                    "---------------------------------------------------------------------",
                    "BAB 1: MEMULAI BISNIS RENTAL DARI PERLENGKAPAN YANG ADA",
                    "- Inventarisasi tenda, carrier, sleeping bag, dan alat masak yang dimiliki.",
                    "- Pastikan kebersihan, kelengkapan pasak, frame, dan resleting sebelum disewakan.",
                    "",
                    "BAB 2: FORMULA PENENTUAN TARIF SEWA HARIAN & BEP",
                    "- Tenda Dome Kapasitas 4 Orang : Rp 45.000 / hari",
                    "- Paket Camping Pemula (2 Org) : Rp 75.000 / hari",
                    "- Tas Carrier 60L + Rain Cover : Rp 30.000 / hari",
                    "- Kompor Portable + Nesting    : Rp 20.000 / hari",
                    "- Sleeping Bag Polar Tebal     : Rp 15.000 / hari",
                    "",
                    "BAB 3: SOP KEAMANAN TRANSAKSI & PERAWATAN ALAT",
                    "- Verifikasi kartu identitas penyewa saat serah terima unit.",
                    "- Jemur tenda hingga kering sempurna setelah kembali untuk mencegah jamur.",
                    "",
                    "BAB 4: LANGKAH SELANJUTNYA DI MARKETPLACE",
                    "- Daftar menjadi Owner, lengkapi profil toko, dan unggah foto produk terbaikmu!"
                ];

                let textStream = "BT\n/F1 11 Tf\n45 780 Td\n16 TL\n";
                lines.forEach((line, idx) => {
                    const escaped = line.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
                    if (idx === 0) {
                        textStream += `(${escaped}) Tj\n`;
                    } else {
                        textStream += `T* (${escaped}) Tj\n`;
                    }
                });
                textStream += "ET";

                const objects = [
                    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
                    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
                    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n",
                    `4 0 obj\n<< /Length ${textStream.length} >>\nstream\n${textStream}\nendstream\nendobj\n`,
                    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
                ];

                let pdf = "%PDF-1.4\n";
                const offsets = [0];
                objects.forEach(obj => {
                    offsets.push(pdf.length);
                    pdf += obj;
                });

                const xrefOffset = pdf.length;
                pdf += `xref\n0 ${objects.length + 1}\n`;
                pdf += "0000000000 65535 f \n";
                for (let i = 1; i <= objects.length; i++) {
                    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
                }
                pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

                const blob = new Blob([pdf], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'panduan_bisnis_rental_outdoor_owner.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }

            document.getElementById('btn-download-owner-pdf').addEventListener('click', generateOwnerPdfDownload);
            document.getElementById('modal-owner-download-btn').addEventListener('click', generateOwnerPdfDownload);

            // 4. Modal Preview E-Book Owner
            const ownerEbookModal = document.getElementById('owner-ebook-modal');
            document.getElementById('hero-preview-ebook-btn').addEventListener('click', () => {
                ownerEbookModal.classList.remove('hidden');
            });
            document.getElementById('btn-open-owner-ebook-modal').addEventListener('click', () => {
                ownerEbookModal.classList.remove('hidden');
            });
            document.getElementById('close-owner-ebook-modal').addEventListener('click', () => {
                ownerEbookModal.classList.add('hidden');
            });
            document.getElementById('modal-to-register-btn').addEventListener('click', () => {
                ownerEbookModal.classList.add('hidden');
                openOwnerRegisterModal();
            });

            // 5. Modal Pendaftaran Owner & Mulai Sewakan Produkmu
            const registerModal = document.getElementById('owner-register-modal');
            const registerForm = document.getElementById('owner-register-form');
            const registerSuccess = document.getElementById('owner-register-success');

            window.openOwnerRegisterModal = function(mode = 'register') {
                const titleEl = document.getElementById('register-modal-title');
                const badgeEl = document.getElementById('register-modal-badge');
                if (mode === 'upload') {
                    badgeEl.textContent = 'Etalase Marketplace Owner';
                    titleEl.textContent = 'Mulai Sewakan Produkmu';
                } else {
                    badgeEl.textContent = 'Pendaftaran Mitra Marketplace';
                    titleEl.textContent = 'Daftar Menjadi Owner';
                }
                registerForm.classList.remove('hidden');
                registerSuccess.classList.add('hidden');
                registerModal.classList.remove('hidden');
            };

            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const storeName = document.getElementById('reg-store-name').value.trim();
                const ownerName = document.getElementById('reg-owner-name').value.trim();
                const city = document.getElementById('reg-city').value.trim();
                const gearCount = document.getElementById('reg-gear-count').value;

                document.getElementById('reg-success-store').textContent = storeName;
                document.getElementById('reg-success-desc').innerHTML = `
                    Pendaftaran akun mitra owner atas nama <strong>${ownerName}</strong> untuk wilayah <strong>${city}</strong> dengan kapasitas <strong>${gearCount}</strong> berhasil dicatat.
                `;

                registerForm.classList.add('hidden');
                registerSuccess.classList.remove('hidden');
            });

            document.getElementById('close-register-modal').addEventListener('click', () => {
                registerModal.classList.add('hidden');
            });

            window.addEventListener('click', (e) => {
                if (e.target === ownerEbookModal) ownerEbookModal.classList.add('hidden');
                if (e.target === registerModal) registerModal.classList.add('hidden');
            });
        });