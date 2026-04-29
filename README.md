# 💸 Tracker Wydatków (PLN)

Minimalistyczny tracker wydatków w Next.js + Tailwind CSS. Dane zapisywane w localStorage przeglądarki.

## Funkcjonalności

- ✅ Dodawanie wydatków (kwota, kategoria, data, opis)
- ✅ Lista wydatków sortowana po dacie
- ✅ Filtrowanie według kategorii
- ✅ Suma wydatków w bieżącym miesiącu
- ✅ Podział wydatków według kategorii (wykres słupkowy)
- ✅ Usuwanie wydatków
- ✅ Waluta PLN (złoty polski)
- ✅ Responsive design (mobile-friendly)
- ✅ Dane zapisywane lokalnie w przeglądarce

## Kategorie

| Kategoria     | Ikona |
|---------------|-------|
| Jedzenie      | 🍽    |
| Transport     | 🚌    |
| Rozrywka      | 🎬    |
| Zdrowie       | 💊    |
| Inne          | 📦    |

---

## Instalacja i uruchomienie

### Wymagania

- [Node.js](https://nodejs.org/) v18 lub nowszy
- npm lub yarn

### Kroki

```bash
# 1. Sklonuj repozytorium lub rozpakuj pliki
cd expense-tracker

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer developerski
npm run dev
```

Otwórz http://localhost:3000 w przeglądarce.

---

## Wdrożenie na GitHub Pages (statyczne)

Ponieważ Next.js domyślnie wymaga serwera Node.js, najłatwiej wdrożyć na **Vercel** (bezpłatnie).

### Opcja 1: Vercel (zalecana)

1. Utwórz konto na [vercel.com](https://vercel.com)
2. Połącz z repozytorium GitHub
3. Vercel automatycznie wykryje Next.js i wdroży aplikację
4. Twoja aplikacja będzie dostępna pod adresem `https://twoja-nazwa.vercel.app`

### Opcja 2: GitHub Pages (eksport statyczny)

Dodaj do `next.config.js`:

```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
}
module.exports = nextConfig
```

Następnie:

```bash
npm run build
# Folder 'out' zawiera statyczną wersję aplikacji
```

Skonfiguruj GitHub Pages, aby serwował z folderu `out/` lub użyj GitHub Actions.

---

## Struktura projektu

```
expense-tracker/
├── pages/
│   ├── _app.js          # Główny komponent aplikacji
│   ├── _document.js     # Dokument HTML
│   └── index.js         # Strona główna
├── components/
│   ├── constants.js     # Kategorie, formatowanie, helpers
│   ├── useExpenses.js   # Hook do zarządzania danymi (localStorage)
│   ├── StatsCard.js     # Karta statystyk
│   ├── AddExpenseForm.js # Formularz dodawania
│   ├── CategoryBreakdown.js # Wykres kategorii
│   └── ExpenseList.js   # Lista wydatków z filtrowaniem
├── styles/
│   └── globals.css      # Globalne style + Tailwind
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json
```

---

## Dostosowanie

### Zmiana walut lub języka

W pliku `components/constants.js` znajdziesz funkcję `formatPLN`:

```js
export const formatPLN = (amount) =>
  new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',   // zmień na 'EUR', 'USD' itd.
  }).format(amount)
```

### Dodanie nowej kategorii

W `components/constants.js` dodaj do tablicy `CATEGORIES`:

```js
{ id: 'shopping', label: 'Zakupy', icon: '🛍', color: '#8b5cf6', bg: '#f5f3ff' },
```
