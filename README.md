AgriIA
Un terrain, mille possibles.
AgriIA est une PWA (Progressive Web App) 100% statique qui aide les propriétaires de terres agricoles — petits propriétaires, néo-ruraux, héritiers de terrain, agriculture urbaine/périurbaine, agroécologie/permaculture — à savoir quoi cultiver selon leur localisation, leur climat et la nature de leur sol, et à faire reconnaître leurs pratiques via un parcours de certification.
Fonctionnalités
Diagnostic — géolocalisation ou recherche de ville, récupération automatique du climat (Open-Meteo) et du sol (ISRIC SoilGrids), avec repli manuel. Moteur de recommandation sur une base de 13 cultures courantes, scorées par compatibilité.
Carte — carte interactive (Leaflet + OpenStreetMap) avec outil de dessin pour tracer une parcelle et calculer automatiquement sa surface en hectares.
Mes terrains — carnet personnel (stocké en local sur l'appareil, localStorage) : nom, type de titre foncier, numéro/référence, superficie, notes.
Parcours certification — checklist simplifiée pour trois labels (Bio France, HVE France, USDA Organic), intégrée à chaque fiche terrain, avec suivi de progression.
⚠️ Limite assumée
Le carnet de terrains est un registre personnel non officiel. Il n'existe pas d'API publique gratuite permettant de vérifier un titre foncier auprès d'une administration — ces informations ne remplacent aucune démarche officielle.
Stack technique
Un seul fichier HTML autonome (index.html) — HTML/CSS/JS vanilla, aucune dépendance à installer, aucun build. Hébergé via GitHub Pages.
APIs externes utilisées (toutes gratuites, sans clé) :
Open-Meteo Geocoding
Open-Meteo Archive
ISRIC SoilGrids
Leaflet + Leaflet.draw
Licence
Tous droits réservés — voir LICENSE. Code publié à titre de démonstration ; toute réutilisation nécessite une autorisation préalable.
