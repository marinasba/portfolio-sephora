# Photos à fournir

Chaque rectangle vide du site porte son étiquette « Photo de … » et le nom de fichier attendu.

| Fichier | Photo de… | Format conseillé |
|---|---|---|
| `portrait.jpg` | Séphora — portrait sobre, lumière naturelle, idéalement en salle de vente | 1600 × 2000 px |
| `paravent-recto.jpg` | Paravent Pham Hau — face recto, HD, fond neutre | 2400 × 1800 px |
| `paravent-verso.jpg` | Paravent Pham Hau — face verso | 2400 × 1800 px |
| `livres.jpg` | Un livre ancien ou une reliure vendu(e) par l'étude | 900 × 1200 px |
| `lettres.jpg` | Une lettre autographe ou un manuscrit | 900 × 1200 px |
| `asie.jpg` | Un objet d'art asiatique (laque, bronze, céramique) | 900 × 1200 px |
| `photo-ancienne.jpg` | Un tirage ancien (album, daguerréotype…) | 900 × 1200 px |
| `etape-01.jpg` | Lots rassemblés à l'étude | 1600 × 1000 px |
| `etape-02.jpg` | Un expert examinant un lot | 1600 × 1000 px |
| `etape-03.jpg` | Un catalogue de vente de l'étude, ouvert | 1600 × 1000 px |
| `etape-04.jpg` | La séance photo (studio, lot sous les lumières) | 1600 × 1000 px |
| `etape-05.jpg` | Maquette de catalogue ou épreuves chez le graphiste | 1600 × 1000 px |
| `etape-06.jpg` | Transport des lots (caisses, camion, emballage) | 1600 × 1000 px |
| `etape-07.jpg` | La salle de vente scénographiée à l'Hôtel Drouot | 1600 × 1000 px |
| `etape-08.jpg` | Le marteau ou le commissaire-priseur pendant la séance | 1600 × 1000 px |
| `etape-09.jpg` | Un bordereau ou le bureau de facturation | 1600 × 1000 px |
| `etape-10.jpg` | Le retrait des lots ou un acheteur après la vente | 1600 × 1000 px |
| `bal.jpg` | Séphora au Bal des Parisiennes 2026 | 1200 × 1500 px |
| `couture.jpg` | Une robe ou pièce cousue main | 1200 × 1500 px |
| `cv-fr.pdf`, `cv-de.pdf`, `cv-en.pdf` | CV téléchargeables | PDF |

## Brancher les photos

- **Rectangles simples** (`<div class="ph" …>`) : remplacer par `<img class="ph" src="assets/fichier.jpg" alt="…">`.
- **Paravent et tirage Nadar** : dans `css/style.css` (bloc `:root`), décommenter
  `--pv-recto`, `--pv-verso`, `--nadar` et supprimer les lignes `…:none;`.
  Ajouter la classe `has-photo` sur `<div class="bath">` et retirer les deux `<div class="ph-tag">` du paravent.

Avant mise en ligne : droits sur les photos des lots (étude / photographe),
accord d'Oger Blanchet pour citer les résultats et le nom de Guillaume Lemoine.

Ajouts :

| `asie-salle.jpg` | Une vente d'art asiatique à l'Hôtel Drouot (la salle, le public) | 1600 × 1000 px |
| `asie-lots.jpg` | Lots d'art asiatique exposés avant la vente | 1600 × 1000 px |
| `asie-catalogue.jpg` | Catalogue d'une vente d'art asiatique | 1600 × 1000 px |
| `sephora-travail.jpg` | Séphora au travail (en salle de vente, à l'étude ou devant un lot) | 1200 × 1500 px |
