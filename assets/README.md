# Fichiers à déposer ici

| Fichier | Usage | Format conseillé |
|---|---|---|
| `paravent-recto.jpg` | Face avant du paravent Pham Hau (hero) | 2400 × 1800 px, JPG |
| `paravent-verso.jpg` | Face arrière du paravent | 2400 × 1800 px, JPG |
| `nadar.jpg` | Tirage Nadar (section « le tirage se révèle ») | 1600 × 2000 px, JPG |
| `livres.jpg`, `lettres.jpg`, `asie.jpg` | Vignettes des spécialités | 900 × 1200 px, JPG |
| `cv-fr.pdf`, `cv-de.pdf`, `cv-en.pdf` | CV téléchargeables | PDF |

Une fois les photos déposées, dans `css/style.css` (bloc `:root`), décommenter :

```css
--pv-recto:url("../assets/paravent-recto.jpg");
--pv-verso:url("../assets/paravent-verso.jpg");
--nadar:url("../assets/nadar.jpg");
```

et supprimer les trois lignes `--pv-recto:none;` etc. juste en dessous.

Pour les vignettes, remplacer dans `index.html` les `<div class="ph ph-…" data-slot="…">`
par `<img class="ph" src="assets/livres.jpg" alt="…">`.

Vérifier avant mise en ligne : droits sur les photos des lots (étude / photographe),
accord d'Oger Blanchet pour citer les résultats et le nom de Guillaume Lemoine.
