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
| `bal-01.jpg` à `bal-03.jpg` | Séphora au Bal des Parisiennes 2026 (en robe, en salle) ; la salle, la valse ; Séphora marraine 2027 (affiche, annonce, portrait) | 1200 × 1500 px |
| `couture-01.jpg` à `couture-03.jpg` | Une robe cousue main portée ; une pièce en cours (atelier) ; un détail de finition | 1200 × 1500 px |
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
| `galerie-01.jpg` à `galerie-06.jpg` | Galerie sous le paravent : le paravent en salle le jour de la vente, deux détails de laque (recto, verso), la salle pendant les enchères, l’équipe ou le marteau à l’adjudication, un autre lot phare | 1600 × 1200 px |
| `travaux-01.jpg` à `travaux-03.jpg` | Autres travaux : la Grand-Place d'Arras reconstruite ; la couverture du mémoire ; l'Institut français de Stuttgart (travaux-03) | 1600 × 1200 px |
| `choeur-01.jpg` à `choeur-03.jpg` | Le chœur en concert ; Séphora en répétition ou en concert ; l'Académie du Palais Royal (orchestre, salle) | 1200 × 1500 px |

## Photos déjà reçues (19 oct. 2026)

- `sephora-travail.jpg` : Séphora devant le paravent Pham Hau, exposé à Drouot
- `asie-lots.jpg` : lots d'art asiatique sur socles avant la vente
- `objets.jpg` : exposition avant-vente, tableaux et mobilier (reçue, non utilisée pour l'instant)
- `travaux-02.jpg` : couverture du mémoire sur Arras
- `bal-01.jpg` : Séphora valsant au Bal des Parisiennes 2026
- `catalogue-paravent.jpg` : couverture du catalogue de la vente Arts asiatiques du 1er octobre 2026 (galerie du paravent)
- `livres.jpg` : couverture du catalogue Bibliothèque Jean Demaux, 18 et 19 juin 2026 (fiche Livres anciens)
