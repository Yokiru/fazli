# Panduan Edit Konten Website Portfolio

Dokumen ini berisi daftar teks yang perlu diganti oleh client untuk menyesuaikan website dengan identitas mereka.

---

## 1. Header (Navbar)

**File:** `src/components/organisms/Header/Header.tsx`

| Lokasi | Teks Saat Ini | Ganti Dengan |
|--------|---------------|--------------|
| Logo | `LOGO` | Nama brand/logo Anda |

---

## 2. Hero Section (Bagian Atas)

**File:** `src/components/organisms/Hero/Hero.tsx`

| Lokasi | Teks Saat Ini | Ganti Dengan |
|--------|---------------|--------------|
| Nama | `Fazli` | Nama Anda |
| Status | `Available for work` | Status ketersediaan Anda |
| Headline Utama | `I Design Websites That Captivate, Convert, and Elevate Your Brand.` | Tagline/headline utama Anda |
| Bio/Subtext | `With 12 years of experience in web design, I specialize in crafting visually stunning, user-friendly, and high-converting websites.` | Deskripsi singkat tentang diri Anda |
| Tombol CTA | `Start Your Project` | Teks tombol ajakan bertindak |

### Link Sosial Media

| Platform | URL Saat Ini | Ganti Dengan |
|----------|--------------|--------------|
| Twitter/X | `https://twitter.com` | URL Twitter Anda |
| Instagram | `https://instagram.com` | URL Instagram Anda |
| LinkedIn | `https://linkedin.com` | URL LinkedIn Anda |

---

## 3. Projects Section (Selected Work)

**File:** `src/components/organisms/Projects/Projects.tsx`

### Header Section

| Lokasi | Teks Saat Ini | Ganti Dengan |
|--------|---------------|--------------|
| Judul Section | `Selected Work` | Judul section portfolio Anda |
| Subtitle | `A collection of projects that showcase my design expertise and creative vision.` | Deskripsi section portfolio |

### Daftar Project (6 Project)

| No | Nama Project | Kategori | Ganti Dengan |
|----|--------------|----------|--------------|
| 1 | `Scarlet` | `Modern Agency` | Nama & kategori project Anda |
| 2 | `Lens` | `Filmmaking Studio` | Nama & kategori project Anda |
| 3 | `Keystone` | `Architectural Firm` | Nama & kategori project Anda |
| 4 | `Automize` | `AI Solutions` | Nama & kategori project Anda |
| 5 | `Brandify` | `Marketing Agency` | Nama & kategori project Anda |
| 6 | `Capture` | `Photography Agency` | Nama & kategori project Anda |

---

## 4. Services Section (Layanan)

**File:** `src/components/organisms/Services/Services.tsx`

### Header Section

| Lokasi | Teks Saat Ini | Ganti Dengan |
|--------|---------------|--------------|
| Judul Section | `Services` | Judul section layanan Anda |
| Subtitle | `Tailored design solutions to meet your business goals.` | Deskripsi layanan Anda |

### Daftar Layanan (4 Layanan)

| No | Nama Layanan | Deskripsi | Harga | Durasi |
|----|--------------|-----------|-------|--------|
| 1 | `Landing Page` | `Perfect for startups and small businesses...` | `$1,500` | `1-2 weeks` |
| 2 | `Multi-Page Website` | `Comprehensive web solution...` | `$3,000` | `2-4 weeks` |
| 3 | `E-Commerce Store` | `Full-featured online store...` | `$5,000` | `4-6 weeks` |
| 4 | `Web Application` | `Custom web application...` | `Custom` | `6+ weeks` |

---

## 5. Process Section (My Process)

**File:** `src/components/organisms/Process/Process.tsx`

### Header Section

| Lokasi | Teks Saat Ini | Ganti Dengan |
|--------|---------------|--------------|
| Judul Section | `My Process` | Judul section proses kerja Anda |
| Tombol | `Let's get started →` | Teks tombol ajakan |

### Daftar Proses (4 Langkah)

| No | Judul Step | Deskripsi |
|----|------------|-----------|
| 1 | `Discovery & Strategy` | `We start by understanding your business, goals, and target audience...` |
| 2 | `Wireframing & UX Design` | `Before jumping into visuals, I create wireframes...` |
| 3 | `Visual Design & Branding` | `This is where your website comes to life...` |
| 4 | `Development & Launch` | `Once the design is approved, I build a pixel-perfect...` |

---

## 6. Footer Section

**File:** `src/components/organisms/Footer/Footer.tsx`

| Lokasi | Teks Saat Ini | Ganti Dengan |
|--------|---------------|--------------|
| Headline CTA | `Let's Work Together!` | Headline ajakan kerja sama |
| Tombol | `Let's Talk` | Teks tombol kontak |
| Email | `hello@fazli.design` | Email Anda |
| Telepon | `(123) 456-7890` | Nomor telepon Anda |
| Copyright | `© 2025 Fazli. All rights reserved.` | Copyright dengan nama Anda |

---

## 7. SEO & Meta Tags

**File:** `index.html`

| Lokasi | Teks Saat Ini | Ganti Dengan |
|--------|---------------|--------------|
| Title | `Fazli \| Web Designer & Developer Portfolio` | Judul website Anda |
| Meta Description | `I design websites that captivate, convert, and elevate your brand...` | Deskripsi website untuk SEO |
| Author | `Fazli` | Nama Anda |
| OG Title | `Fazli \| Web Designer Portfolio` | Judul untuk social sharing |
| OG Description | `I design websites that captivate, convert, and elevate your brand.` | Deskripsi untuk social sharing |

---

## Catatan Penting

1. **Simpan perubahan** setelah mengedit file
2. Website akan **auto-refresh** saat file disimpan (karena hot reload)
3. Untuk mengganti **gambar project**, letakkan file di folder `public/` dan update path di `Projects.tsx`
4. Untuk mengganti **avatar/foto profil**, update di `Hero.tsx`
