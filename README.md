# 🍳 Mutfak Asistanı

Mutfak Asistanı, dolabınızdaki malzemeleri takip etmenizi sağlayan ve bu malzemelere göre size yapay zeka destekli tarif önerileri sunan modern bir web uygulamasıdır.

## 🚀 Özellikler

*   **Dolap Yönetimi:** Evinizdeki malzemeleri birim (kg, lt, adet vb.) ve kategori bazında ekleyip takip edebilirsiniz.
*   **Akıllı Stok Takibi:** Kullanılan malzemeleri stoktan otomatik düşme (Geliştirme aşamasında).
*   **Yapay Zeka Destekli Tarif Önerisi:** Dolabınızdaki malzemelere göre size en uygun yemek, çorba veya tatlı tariflerini önerir (Geliştirme aşamasında).
*   **Kalıcı Veri:** Verileriniz tarayıcınızda güvenli bir şekilde saklanır, sayfa yenilendiğinde kaybolmaz.

## 🛠️ Teknolojiler

Bu proje aşağıdaki modern teknolojiler kullanılarak geliştirilmiştir:

*   **[React](https://reactjs.org/)** - Kullanıcı Arayüzü Kütüphanesi
*   **[TypeScript](https://www.typescriptlang.org/)** - Tip Güvenliği
*   **[Vite](https://vitejs.dev/)** - Hızlı Geliştirme Aracı
*   **[Tailwind CSS](https://tailwindcss.com/)** - Stil Kütüphanesi
*   **React Router** - Sayfa Yönlendirmesi
*   **Context API** - Global Durum Yönetimi

## 📦 Kurulum

Projeyi bilgisayarınıza indirmek ve çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu Klonlayın:**
    ```bash
    git clone https://github.com/TunahanD/Mutfak_Asistani.git
    cd mutfak-asistani
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Uygulamayı Başlatın:**
    ```bash
    npm run dev
    ```

4.  Tarayıcınızda `http://localhost:5173` adresine giderek uygulamayı görüntüleyebilirsiniz.

## 🌍 Canlı Demo

*(Proje henüz canlı sunucuya deploy edilmemiştir. Kendi bilgisayarınızda çalıştırmak için yukarıdaki Kurulum adımlarını takip edebilirsiniz.)*

> **⚠️ Önemli Uyarı:** Güvenlik sebepleriyle, GitHub üzerindeki kaynak kodlarda Google Gemini API anahtarı **bulunmamaktadır**. Projeyi kendi lokalinizde çalıştırırken `src/services/aiService.ts` dosyasına kendi API anahtarınızı ekleyerek "Tarif Önerisi" özelliğini test edebilirsiniz.




