import type { Messages } from './ko'

const fr: Messages = {
  common: {
    all: 'Tout',
    retry: 'Réessayer',
    reload: 'Recharger',
    backToList: 'Retour à la liste',
    viewAll: 'Tout voir',
    viewDetails: 'Voir les détails',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    share: 'Partager',
    loading: 'Chargement…',
    seoul: 'Séoul',
    none: '-',
    linkCopied: 'Lien copié.',
    copyFailed: 'Impossible de copier le lien.',
    skipToContent: 'Aller au contenu',
  },

  nav: {
    home: 'Accueil',
    explore: 'Explorer',
    festival: 'Festivals',
    community: 'Communauté',
    mainMenu: 'Menu principal',
    homeLink: 'Accueil Soulrip',
    language: 'Langue',
    themeToLight: 'Passer en mode clair',
    themeToDark: 'Passer en mode sombre',
  },

  footer: {
    tagline: 'Un voyage à Séoul qui relie les voyageurs solo',
    menu: 'Liens rapides',
  },

  meta: {
    home: 'Séoul pour les voyageurs solo',
    placeList: 'Explorer Séoul',
    placeDetail: 'Détails du lieu',
    festivalList: 'Festivals de Séoul',
    festivalDetail: 'Détails du festival',
    postList: 'Communauté solo',
    postNew: 'Nouvelle publication',
    postDetail: 'Publication',
    postEdit: 'Modifier la publication',
    notFound: 'Page introuvable',
  },

  ds: {
    pagination: {
      label: 'Pagination',
      prev: 'Page précédente',
      next: 'Page suivante',
      page: (page: number) => `Page ${page}`,
    },
    image: { empty: "Pas d'image" },
    modal: { close: 'Fermer' },
    search: { clear: 'Effacer la recherche' },
    loading: 'Chargement…',
    count: (current: number, max: number) => `${current} / ${max}`,
  },

  home: {
    hero: {
      badge: 'Un voyage à Séoul agréable, même en solo',
      title1: 'À votre rythme,',
      title2: 'Séoul avec Soulrip',
      description:
        'Trouvez sites, restaurants adaptés aux solos et festivals au même endroit.\nPartagez vos voyages ou trouvez des compagnons de route anonymement.',
      exploreCta: 'Explorer Séoul',
      communityCta: 'Lire les récits solo',
    },
    stats: {
      label: 'Soulrip en chiffres',
      places: 'Lieux',
      festivals: 'Festivals',
      posts: 'Récits',
    },
    insight: {
      title: 'Analyses IA du jour',
      load: 'Voir les analyses',
      reload: 'Actualiser',
      loading: 'Analyse…',
      emptyTitle: 'Découvrez les analyses de Séoul du jour.',
      emptyDescription:
        "L'IA analyse les données touristiques de Séoul\npour vous conseiller en voyage solo.",
      loadingTitle: 'Analyse des données touristiques de Séoul.',
      loadingDescription: 'Recherche des meilleurs conseils pour voyager seul.',
      errorTitle: 'Impossible de charger les analyses.',
      refreshFailed: "Échec de l'actualisation. Affichage des analyses précédentes.",
    },
    keywords: {
      title: 'Recherches populaires',
      items: [
        { label: '#RepasSolo', query: '혼밥' },
        { label: '#BaladeSolo', query: '혼자걷기' },
        { label: '#VueDeNuit', query: '야경' },
        { label: '#Expositions', query: '전시' },
        { label: '#Cafés', query: '카페' },
        { label: '#ExcursionDuJour', query: '당일' },
      ],
    },
    sections: {
      places: { eyebrow: 'Explorer Séoul', title: 'Des lieux parfaits en solo' },
      festivals: {
        eyebrow: 'Calendrier des festivals',
        title: 'Festivals à venir à Séoul',
        cta: 'Tout le programme',
      },
      posts: {
        eyebrow: 'Communauté anonyme',
        title: 'Des bonnes adresses aux compagnons de voyage',
        cta: 'Écrire',
      },
    },
    sectionError: 'Impossible de charger la liste.',
    sectionEmpty: "Rien pour l'instant.",
  },

  place: {
    filters: {
      ALL: 'Tout',
      TOUR: 'Sites',
      LEISURE: 'Loisirs',
      CULTURE: 'Culture',
      SHOPPING: 'Shopping',
      ACCOMMODATION: 'Hébergement',
      COURSE: 'Itinéraires',
      FESTIVAL: 'Festivals et événements',
    },
    categoryLabels: {
      TOUR: 'Site touristique',
      LEISURE: 'Loisirs',
      CULTURE: 'Culture',
      SHOPPING: 'Shopping',
      ACCOMMODATION: 'Hébergement',
      COURSE: 'Itinéraire',
      FESTIVAL: 'Festival et événement',
      FOOD: 'Restaurant',
      CAFE: 'Café',
      NATURE: 'Nature',
    },
    fallbackName: 'Lieu',
    fallbackCategory: 'Lieu à Séoul',
    fallbackSummary: 'Découvrez les informations sur ce lieu de Séoul.',
    soloScore: (score: number) => `Solo ${score}`,
    list: {
      eyebrow: 'Guide de Séoul',
      title: 'Trouvez votre Séoul',
      description:
        'Parcourez par type les sites, loisirs, lieux culturels, boutiques, hébergements, itinéraires et festivals de Séoul.',
      searchLabel: 'Rechercher un lieu',
      searchPlaceholder: 'Lieu, quartier ou tag',
      categoryLabel: 'Type de lieu',
      resultCount: (count: number) => `${count.toLocaleString('fr-FR')} lieux`,
      emptyTitle: 'Aucun lieu ne correspond à votre recherche.',
      emptyDescription: 'Essayez un autre mot-clé ou un autre type.',
      resetFilters: 'Réinitialiser',
      errorTitle: 'Impossible de charger les lieux.',
    },
    detail: {
      back: "Retour à l'exploration",
      loading: 'Chargement du lieu…',
      errorTitle: 'Impossible de charger ce lieu.',
      about: 'Présentation',
      summary: (category: string, name: string) =>
        `${name} est classé dans la catégorie « ${category} ».`,
      tagsSummary: (tags: string) => `Mots-clés : ${tags}.`,
      visitorInfo: 'Infos pratiques',
      address: 'Adresse',
      district: 'Quartier',
      phone: 'Téléphone',
      soloScore: 'Score voyage solo',
      scoreValue: (score: number) => `${score} pts`,
      category: 'Type',
      tipBadge: 'Conseil solo',
      tipTitle:
        "Vérifiez les horaires et l'emplacement pour savoir si le lieu convient à une visite en solo.",
      bookmark: 'Enregistrer',
      bookmarked: 'Enregistré',
      dataInfo: 'Données',
      contentId: 'ID du contenu',
      contentType: 'Type de contenu',
    },
  },

  festival: {
    fallbackName: 'Festival',
    fallbackCategory: 'Festival',
    fallbackDescription: 'Découvrez les informations sur ce festival.',
    noSchedule: 'Dates à confirmer',
    list: {
      eyebrow: 'Calendrier des festivals',
      title: 'Des festivals à vivre seul ou à plusieurs',
      description:
        'Consultez le programme du mois et touchez une date pour voir les festivals en cours.\nBesoin de compagnie ? Trouvez quelqu’un dans la communauté.',
      companionCta: 'Trouver un compagnon',
      monthFilterLabel: 'Choisir le mois',
      listEyebrow: 'Liste des festivals',
      listTitleAll: 'Festivals à Séoul',
      listTitleMonth: (month: string) => `Festivals en ${month}`,
      total: (count: number) => `${count.toLocaleString('fr-FR')} au total`,
      emptyTitle: 'Aucun festival ce mois-ci.',
      emptyDescription: 'Essayez un autre mois.',
      errorTitle: 'Impossible de charger les festivals.',
    },
    calendar: {
      eyebrow: 'FESTIVAL CALENDAR',
      legend: 'Jours de festival',
      today: "Aujourd'hui",
      prevMonth: 'Mois précédent',
      nextMonth: 'Mois suivant',
      loading: 'Chargement du calendrier.',
      more: (count: number) => `+${count}`,
      dayLabel: (date: string, count: number) =>
        count > 0 ? `${date}, ${count} festival${count > 1 ? 's' : ''}` : date,
    },
    selected: {
      badge: 'Date sélectionnée',
      count: (count: number) => `${count} festival${count > 1 ? 's' : ''}`,
      emptyTitle: 'Aucun festival prévu ce jour-là.',
      emptyDescription: 'Choisissez une autre date pour voir les festivals en cours.',
    },
    detail: {
      back: 'Retour aux festivals',
      loading: 'Chargement du festival…',
      errorTitle: 'Impossible de charger ce festival.',
      about: 'Présentation',
      noDescription: 'Aucune description disponible.',
      visitorInfo: 'Infos pratiques',
      period: 'Dates',
      place: 'Lieu',
      district: 'Quartier',
      phone: 'Téléphone',
      tipBadge: 'Conseil solo',
      tipTitle: 'Besoin de compagnie ? Publiez une annonce dans la communauté.',
      companionCta: 'Trouver un compagnon pour ce festival',
      dataInfo: 'Données',
      contentId: 'ID du contenu',
    },
  },

  post: {
    types: {
      ALL: 'Tout',
      FOOD: 'Repas et bons plans',
      REVIEW: 'Récits de voyage',
      COMPANION: 'Compagnons',
      GENERAL: 'Discussion libre',
    },
    fallbackType: 'Communauté',
    stats: {
      views: (count: number) => `${count} vues`,
      likes: (count: number) => `${count} j'aime`,
      comments: (count: number) => `${count} commentaires`,
    },
    list: {
      eyebrow: 'Communauté solo anonyme',
      title: 'Partagez vos voyages en solo et trouvez des compagnons',
      description:
        "Pas d'inscription : un pseudo et un mot de passe suffisent.\nLe même mot de passe est nécessaire pour modifier ou supprimer.",
      write: 'Nouvelle publication',
      searchLabel: 'Rechercher des publications',
      searchPlaceholder: 'Titre, contenu ou tags',
      typeFilterLabel: 'Type de publication',
      total: (count: number) => `${count.toLocaleString('fr-FR')} publications`,
      pageOf: (page: number, pages: number) => `Page ${page} sur ${pages}`,
      emptyTitle: 'Aucune publication trouvée.',
      emptyDescription: 'Soyez le premier à partager une histoire.',
      errorTitle: 'Impossible de charger les publications.',
    },
    detail: {
      back: 'Retour à la communauté',
      loading: 'Chargement de la publication…',
      errorTitle: 'Impossible de charger cette publication.',
      author: 'Auteur',
      views: 'Vues',
      likes: "J'aime",
      comments: 'Commentaires',
    },
    like: {
      like: "J'aime",
      liked: 'Aimé',
      error: "Impossible d'aimer cette publication.",
    },
    remove: {
      title: 'Supprimer la publication',
      description: 'Saisissez le mot de passe utilisé lors de la publication.',
      password: 'Mot de passe',
      submit: 'Supprimer',
      submitting: 'Suppression…',
      error: 'Impossible de supprimer.',
    },
    editor: {
      createBadge: 'Publication anonyme',
      editBadge: 'Modifier la publication',
      createTitle: 'Partagez librement vos conseils de voyage solo',
      editTitle: 'Modifiez votre publication',
      description: 'Le mot de passe est nécessaire pour modifier ou supprimer.',
      back: 'Retour',
      loading: 'Chargement de la publication…',
      loadError: 'Impossible de charger la publication.',
      type: 'Type de publication',
      nickname: 'Pseudo',
      nicknamePlaceholder: 'Pseudo anonyme',
      password: 'Mot de passe',
      passwordPlaceholder: 'Au moins 4 caractères',
      passwordHintEdit: 'Saisissez le mot de passe utilisé lors de la publication.',
      title: 'Titre',
      titlePlaceholder: 'Saisissez un titre',
      content: 'Contenu',
      contentPlaceholder: 'Décrivez vos conseils, impressions ou conditions pour voyager ensemble.',
      tags: 'Tags',
      tagsPlaceholder: 'repas solo, Gyeongbokgung, compagnon (séparés par des virgules)',
      tagsHint: 'Ajoutez des mots-clés : sites, restaurants, festivals, repas solo, compagnons…',
      submitCreate: 'Publier',
      submitEdit: 'Enregistrer',
      submitting: 'Enregistrement…',
      saveError: "Impossible d'enregistrer la publication.",
      validation: {
        title: 'Le titre doit contenir au moins 2 caractères.',
        content: 'Le contenu doit contenir au moins 2 caractères.',
        nickname: 'Saisissez un pseudo.',
        password: 'Le mot de passe doit contenir au moins 4 caractères.',
      },
    },
  },

  comment: {
    eyebrow: 'COMMENTS',
    title: 'Commentaires',
    formLabel: 'Écrire un commentaire',
    nickname: 'Pseudo',
    nicknamePlaceholder: 'Saisissez un pseudo',
    password: 'Mot de passe',
    passwordPlaceholder: 'Mot de passe pour gérer le commentaire',
    content: 'Commentaire',
    contentPlaceholder: 'Écrivez un commentaire.',
    shortcut: 'Ctrl + Entrée pour publier',
    submit: 'Publier',
    submitting: 'Publication…',
    required: 'Saisissez un pseudo, un mot de passe et un commentaire.',
    loading: 'Chargement des commentaires…',
    loadError: 'Impossible de charger les commentaires.',
    submitError: 'Impossible de publier le commentaire.',
    emptyTitle: 'Aucun commentaire pour le moment.',
    emptyDescription: 'Soyez le premier à commenter.',
  },

  chat: {
    title: 'Soulrip AI',
    subtitle: 'Assistant voyage solo à Séoul',
    greeting:
      'Bonjour ! Posez-moi vos questions sur les lieux, les repas en solo et les festivals de Séoul.',
    quick: ['Un restaurant pour manger seul', 'Où se promener seul ?', 'Les festivals de Séoul'],
    quickLabel: 'Questions suggérées',
    loading: 'Recherche de la réponse…',
    placeholder: 'Posez une question sur Séoul',
    inputLabel: 'Message pour le chatbot',
    send: 'Envoyer',
    error: 'Vérifiez la connexion du chatbot.',
    sources: 'Informations liées',
    open: 'Ouvrir le chatbot Soulrip',
    close: 'Fermer le chatbot',
    reset: 'Nouvelle conversation',
  },

  map: {
    badge: 'Carte',
    title: (name: string) => `Où se trouve ${name}`,
    iframeTitle: (name: string) => `Carte de ${name}`,
    open: 'Ouvrir une carte plus grande',
    emptyTitle: 'Aucune localisation.',
    emptyDescription: 'La carte s’affichera dès que les coordonnées seront disponibles.',
  },

  journey: {
    eyebrow: 'Carte du voyage solo',
    title: 'Ma carte du voyage solo à Séoul',
    description:
      'Touchez un arrondissement sur la carte pour voir les lieux recommandés. Les arrondissements visités se colorent et les missions vous font monter de niveau.',
    mapLabel: 'Carte des 25 arrondissements de Séoul',
    districtLabel: (name: string, explored: boolean) => (explored ? `${name}, visité` : name),
    chooserLabel: 'Choisir un arrondissement',
    all: 'Tout',
    mapHint: 'Touchez un arrondissement sur la carte pour afficher sa présentation ici.',
    steps: {
      discover: {
        title: 'Parcourir les lieux de Séoul',
        short: 'Explorer',
        mission: 'Ouvrir la fiche d’un lieu',
      },
      save: {
        title: 'Enregistrer vos coups de cœur',
        short: 'Favoris',
        mission: 'Enregistrer un lieu',
      },
      plan: {
        title: 'Consulter les dates des festivals',
        short: 'Festivals',
        mission: 'Ouvrir la fiche d’un festival',
      },
      ask: {
        title: 'Interroger le chatbot IA',
        short: 'Chat IA',
        mission: 'Poser une question au chatbot',
      },
      share: {
        title: 'Partager votre expérience',
        short: 'Partager',
        mission: 'Aimer, commenter ou publier',
      },
    },
    missionsLabel: 'Missions solo',
    missionDone: 'terminée',
    missionTodo: 'à faire',
    progressLabel: 'Progression des missions',
    progress: (done: number, total: number) => `Missions ${done} / ${total}`,
    levels: ['En préparation', 'Débutant solo', 'Explorateur solo', 'Maître du solo à Séoul'],
    reset: 'Recommencer',
    recommend: {
      allTitle: 'Sélection dans tout Séoul',
      allDescription:
        'Sans arrondissement choisi, nous mélangeons des lieux de plusieurs quartiers.',
      districtTitle: (name: string) => `Lieux recommandés à ${name}`,
      districtDescription: (name: string) =>
        `Jusqu’à 10 lieux adaptés aux voyageurs solo à ${name}.`,
      shuffle: 'Autres idées',
      sampleBadge: 'Données d’exemple',
      sampleNotice: 'Le serveur est injoignable : voici des lieux d’exemple.',
      emptyTitle: 'Pas encore de recommandation.',
      emptyDescription: 'Utilisez « Tout voir » pour chercher ce quartier directement.',
      clear: 'Effacer la sélection',
    },
    toastTitle: 'Mission réussie !',
    toastBody: (title: string, done: number, total: number) => `${title} · ${done}/${total}`,
    toastMaster: 'Toutes les missions sont terminées ! Vous êtes maître du solo à Séoul.',
    viewMap: 'Voir la carte',
  },

  district: {
    /** 자치구 소개 (홈 여정 지도에서 구를 선택하면 표시) */
    descriptions: {
      jongno:
        'Centre politique et culturel de Séoul depuis la dynastie Joseon, Jongno doit son nom au pavillon de la cloche qui sonnait les heures. Gyeongbokgung, Changdeokgung, le village hanok de Bukchon et Insa-dong permettent de plonger dans l’histoire et la culture coréennes.',
      jung: 'En plein centre-ville, Jung-gu est un pôle de shopping, de tourisme et d’affaires. Rues commerçantes et cuisine de Myeong-dong, histoire du palais Deoksugung, ruelles anciennes et cafés originaux d’Euljiro.',
      yongsan:
        'Au cœur de Séoul, Yongsan est un quartier international où se croisent nationalités et cultures. Goûtez aux cuisines du monde à Itaewon, puis découvrez l’histoire coréenne et le panorama de Séoul au Musée national de Corée et à la N Seoul Tower.',
      seongdong:
        'D’anciennes usines et ateliers y sont devenus des espaces culturels et commerciaux modernes. Les cafés tendance et concept stores de Seongsu-dong, ainsi que les allées vertes de la forêt de Séoul, sont très prisés.',
      gwangjin:
        'Au nord du fleuve Han, Gwangjin mêle culture étudiante animée et sorties en famille. Les rues vivantes autour de l’université Konkuk, le Children’s Grand Park et le parc Ttukseom Hangang en sont les incontournables.',
      dongdaemun:
        'Carrefour de marchés traditionnels et de transports au nord-est de Séoul, où l’on découvre la vie quotidienne du vieux Séoul. Marchés et médecine traditionnelle coréenne vous attendent à Gyeongdong, au marché Yangnyeongsi et au centre de la médecine coréenne de Séoul.',
      jungnang:
        'Au nord-est de Séoul, Jungnang est riche en nature autour du ruisseau Jungnangcheon et du mont Yongmasan. Allées fleuries du parc des roses, observatoire du Yongmasan et parc historique et culturel de Mangu réunissent nature et histoire.',
      seongbuk:
        'Centre historique et culturel où subsistent les anciennes murailles de Séoul et des quartiers traditionnels. Les hanok et ruelles de Seongbuk-dong, le temple Gilsangsa et Jeongneung offrent une atmosphère paisible.',
      gangbuk:
        'Au pied sud-est du Bukhansan, Gangbuk est riche en montagnes et en forêts. Les sentiers du Bukhansan et le cimetière national du 19-Avril font découvrir à la fois la nature de Séoul et l’histoire de sa démocratisation.',
      dobong:
        'Tout au nord de Séoul, Dobong est célèbre pour le Dobongsan, une impressionnante montagne rocheuse. Idéal pour la randonnée, il offre aussi détente et culture au jardin Changpowon et au musée de la photographie de Séoul.',
      nowon:
        'Quartier résidentiel du nord-est de Séoul, riche en nature avec les monts Buramsan et Suraksan. Au parc ferroviaire de Hwarangdae et sur la promenade forestière de la ligne Gyeongchun, flânez le long d’anciennes voies ferrées.',
      eunpyeong:
        'Au pied du Bukhansan, au nord-ouest de Séoul, Eunpyeong offre nature et culture traditionnelle près du centre. Architecture traditionnelle et culture bouddhique au village hanok d’Eunpyeong et au temple Jingwansa, beaux paysages de montagne sur le Bukhansan.',
      seodaemun:
        'Seodaemun mêle traces de l’histoire moderne et ambiance étudiante. Découvrez l’histoire du mouvement d’indépendance coréen au musée de la prison de Seodaemun, puis la cuisine et les cafés de Sinchon et Yeonhui-dong.',
      mapo: 'Au nord-ouest du fleuve Han, Mapo est le quartier emblématique de la jeunesse et des arts. Musique et spectacles de rue à Hongdae, cafés et marché de Mangwon-dong, couchers de soleil au parc Haneul de Sangam-dong.',
      yangcheon:
        'Quartier résidentiel planifié du sud-ouest de Séoul, avec des parcs et des promenades bien aménagés. Profitez du paysage urbain moderne de Mok-dong, des berges de l’Anyangcheon et du belvédère du mont Yongwangsan.',
      gangseo:
        'À l’ouest de Séoul, près de l’aéroport international de Gimpo, Gangseo est pratique pour les voyageurs. Le jardin botanique de Séoul et le musée national de l’aviation font découvrir la nature et la culture aéronautique.',
      guro: 'Autrefois l’un des grands quartiers industriels de Séoul, Guro associe aujourd’hui industries numériques et zones résidentielles. Assistez à un match de baseball ou à un concert au Gocheok Sky Dome, ou détendez-vous à l’arboretum Pureun.',
      geumcheon:
        'Au sud-ouest de Séoul, Geumcheon passe d’ancien complexe industriel à quartier moderne d’affaires et de culture. On y trouve les centres commerciaux du complexe numérique de Gasan et les paysages du mont Hoamsan.',
      yeongdeungpo:
        'Au sud du Han, Yeongdeungpo est l’un des grands centres financiers, d’affaires et commerciaux de Séoul. Les tours et le parc riverain de Yeouido contrastent avec les vieilles forges et espaces artistiques de Mullae-dong.',
      dongjak:
        'Au sud du fleuve Han, Dongjak associe lieux historiques et vie locale animée. Découvrez l’histoire moderne coréenne au cimetière national de Séoul et goûtez des produits de la mer au marché de Noryangjin.',
      gwanak:
        'Organisé autour du mont Gwanak au sud de Séoul, ce quartier accueille l’Université nationale de Séoul. Randonnée sur le Gwanaksan, cuisine de Sillim-dong et cafés et restaurants originaux de Sharosu-gil.',
      seocho:
        'Quartier résidentiel et d’affaires moderne au sud du Han, Seocho est aussi un grand centre culturel de Séoul. Spectacles et expositions au Seoul Arts Center, et vues nocturnes sur le fleuve au parc Banpo Hangang.',
      gangnam:
        'Au sud du fleuve Han, Gangnam est le grand pôle commercial et culturel de Séoul. Gratte-ciel, rues commerçantes haut de gamme et culture K-pop : à COEX, Apgujeong et Cheongdam-dong, vous découvrez le visage moderne de Séoul.',
      songpa:
        'Au sud-est du Han, Songpa est un grand pôle de tourisme, de shopping et de loisirs. Outre la Lotte World Tower, Lotte World et le lac Seokchon, on y trouve des vestiges de l’ère Hanseong Baekje.',
      gangdong:
        'À l’extrémité est de Séoul, Gangdong mêle le fleuve Han et les espaces verts. Le site préhistorique d’Amsa-dong raconte la préhistoire, et les parcs du Han se prêtent au vélo et à la promenade.',
    },
  },

  notFound: {
    code: '404',
    title: 'Page introuvable',
    description: "L'adresse a peut-être changé ou la page a été supprimée.",
    home: "Retour à l'accueil",
    explore: 'Explorer Séoul',
  },
}

export default fr
