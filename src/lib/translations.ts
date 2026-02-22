export type Lang = "en" | "bg" | "tr";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      events: "Events",
      contact: "Contact",
    },
    hero: {
      badge: "Est. 2003",
      title: "Mustafa Kemal Atatürk Community Center",
      subtitle: "Established cultural and educational institution in Plovdiv with over 23 years of history.",
      cta: "Explore Events",
    },
    about: {
      subtitle: "SINCE 2003",
      title: "About The Institution",
      content:
        "The 'Mustafa Kemal Ataturk – 2003' Community Center in Plovdiv is an established cultural and educational institution with over 23 years of history. It is the only institution of its kind in Bulgaria, occupying a unique place in the country's cultural life. The center applies modern cultural, educational, and social policies, functioning as an open community hub that creates space for creativity, education, and social inclusion — bringing together people of all ages, cultures, and ethnic backgrounds.",
      learnMore: "Learn More",
      yearsLabel: "Years of History",
      programs: "Programs",
      languages: "Languages",
      mission: "Our Mission & Vision",
      missionText:
        "To contribute to European integration, international cultural exchange, and sustainable cultural development by providing equal, accessible, and inclusive access to cultural and educational activities — including for people with disabilities and disadvantaged communities. Our work is guided by the principles of cultural diversity and mutual respect, development of creative, artistic, and social skills, support for lifelong learning, and partnership with cultural, educational, and social institutions in Bulgaria and abroad. Our vision is to establish the center as a modern cultural, artistic, and social hub — uniting tradition, art, and innovation for the cultural future of Plovdiv, Bulgaria, and Europe.",
      services: "Our Services",
      servicesList: [
        "Multilingual library with books in Bulgarian, Turkish, English, Russian, German, French, and more",
        "Acting school, theater training, and stage productions — including performances with sign language",
        "Atatürk Music Studio — vocal training and singing classes",
        "Art therapy, music therapy, and emotional intelligence workshops",
        "Language courses in Bulgarian and Turkish",
        "Literary club, sports club, and educational studios for children",
        "Erasmus+ international youth exchange programs",
        "Summer school combining educational, creative, and social activities",
      ],
    },
    activities: {
      title: "Our Activities",
      subtitle:
        "A rich, multifaceted program of cultural, artistic, and educational initiatives for children, youth, and adults.",
      culture: "Cultural & Artistic",
      cultureDesc:
        "Acting school, theater productions (including sign language performances), music studio, dance, art therapy, and karaoke & quiz nights.",
      library: "Library",
      libraryDesc:
        "Multilingual library with books in Bulgarian, Turkish, English, Russian, German, and French. Literary readings, book launches, and author meetings.",
      clubs: "Clubs & Education",
      clubsDesc:
        "Literary club, sports club, language courses in Bulgarian & Turkish, educational studios, and emotional intelligence workshops.",
      kids: "Youth Activities",
      kidsDesc:
        "Lego workshops, summer school, art ateliers, sports initiatives, and creative programs for children and young people.",
      social: "Social Initiatives",
      socialDesc:
        "Handmade crafts donated to charitable causes, building empathy, solidarity, and active civic awareness.",
      erasmus: "Erasmus+",
      erasmusDesc:
        "Active participation in international youth exchange programs focused on culture, volunteering, and European values.",
    },
    events: {
      title: "Events",
      subtitle:
        "Explore our latest news, upcoming events, and cultural stories.",
      latestNews: "Highlights",
      viewAll: "View All Events",
      readMore: "Read More",
      noEvents: "No upcoming events at the moment. Check back soon!",
      backToList: "Back to Events",
      upcoming: "Upcoming Events",
      past: "Past Events",
      updates: "Updates",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with us. We'd love to hear from you.",
      address: "Plovdiv, Bulgaria",
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      phone: "+359 88 123 4567",
      email: "info@ataturk-library.bg",
      hours: "Opening Hours",
      hoursData: [
        { day: "Monday - Friday", time: "09:00 - 18:00" },
        { day: "Saturday", time: "10:00 - 14:00" },
        { day: "Sunday", time: "Closed" },
      ],
    },
    footer: {
      brand: "Community Center",
      brandName: "Mustafa Kemal Ataturk – 2003",
      tagline: "A cultural bridge between traditions and the future.",
      contactTitle: "CONTACT",
      followTitle: "FOLLOW US",
      rights: "All rights reserved.",
      address: "Plovdiv, Bulgaria",
    },
  },
  bg: {
    nav: {
      home: "Начало",
      about: "За нас",
      events: "Събития",
      contact: "Контакти",
    },
    hero: {
      badge: "Осн. 2003",
      title: 'Народно читалище „Мустафа Кемал Ататюрк"',
      subtitle: "Утвърдена културно-просветна институция в Пловдив с над 23 години история.",
      cta: "Разгледай Събития",
    },
    about: {
      subtitle: "ОТ 2003",
      title: "За Институцията",
      content:
        'Народно читалище „Мустафа Кемал Ататюрк – 2003" – Пловдив е утвърдена културно-просветна институция с над 23 години история. Читалището е единствено по рода си в страната и заема уникално място в културния живот на България. Институцията прилага съвременни културни, образователни и социални политики и функционира като модерен, отворен към общността културен център, създаващ пространство за творчество, образование и социално включване, обединяващо хора от различни възрасти, култури и етнически общности.',
      learnMore: "Научете Повече",
      yearsLabel: "Години История",
      programs: "Програми",
      languages: "Езици",
      mission: "Нашата Мисия и Визия",
      missionText:
        "Да допринасяме за европейската интеграция, международния културен обмен и устойчивото развитие на културата, като осигуряваме равен, достъпен и приобщаващ достъп до културни и образователни дейности — включително за хора с увреждания и хора в неравностойно положение. В дейността си следваме принципите на културно многообразие и взаимно уважение, развитие на творческите, артистичните и социалните умения, подкрепа на ученето през целия живот и партньорство с културни, образователни и социални институции в България и чужбина. Нашата визия е читалището да се утвърди като съвременен културен, артистичен и социален център, който обединява традиция, изкуство и иновации за културното бъдеще на Пловдив, България и Европа.",
      services: "Нашите Услуги",
      servicesList: [
        "Многоезична библиотека с книги на български, турски, английски, руски, немски, френски и други езици",
        "Школа по актьорско майсторство, театрални постановки — включително продукции с жестов превод",
        'Музикално студио „Ататюрк" — обучения по пеене и вокално развитие',
        "Арт терапии, музикотерапия и обучения по емоционална интелигентност",
        "Езикови курсове по български и турски език",
        "Литературен клуб, спортен клуб и образователни студиа за деца",
        "Международни програми за обмен Erasmus+",
        "Лятно училище, съчетаващо образователни, творчески и социални дейности",
      ],
    },
    activities: {
      title: "Нашите Дейности",
      subtitle:
        "Богата, многостранна програма от културни, артистични и образователни инициативи за деца, младежи и възрастни.",
      culture: "Културна и Артистична",
      cultureDesc:
        "Школа по актьорско майсторство, театрални постановки (включително с жестов превод), музикално студио, танци, арт терапия, караоке и куиз вечери.",
      library: "Библиотека",
      libraryDesc:
        "Многоезична библиотека с книги на български, турски, английски, руски, немски и френски. Литературни четения, представяния на книги и срещи с автори.",
      clubs: "Клубна и Образователна",
      clubsDesc:
        "Литературен клуб, спортен клуб, езикови курсове по български и турски, образователни студиа и обучения по емоционална интелигентност.",
      kids: "Работа с Деца",
      kidsDesc:
        "Лего работилници, лятно училище, арт ателиета, спортни инициативи и творчески програми за деца и младежи.",
      social: "Социални Инициативи",
      socialDesc:
        "Ръчно изработени предмети, дарявани за благотворителни каузи, изграждащи емпатия, солидарност и активно гражданско съзнание.",
      erasmus: "Erasmus+",
      erasmusDesc:
        "Активно участие в международни младежки програми за обмен, насочени към култура, доброволчество и европейски ценности.",
    },
    events: {
      title: "Събития",
      subtitle:
        "Разгледайте последните ни новини, предстоящи събития и културни истории.",
      latestNews: "Акценти",
      viewAll: "Виж Всички",
      readMore: "Прочети още",
      noEvents: "В момента няма предстоящи събития. Проверете отново скоро!",
      backToList: "Обратно към Събития",
      upcoming: "Предстоящи Събития",
      past: "Минали Събития",
      updates: "Новини",
    },
    contact: {
      title: "Свържете се с нас",
      subtitle: "Свържете се с нас. Ще се радваме да чуем от вас.",
      address: "гр. Пловдив, България",
      addressLabel: "Адрес",
      phoneLabel: "Телефон",
      emailLabel: "Имейл",
      phone: "+359 88 123 4567",
      email: "info@ataturk-library.bg",
      hours: "Работно Време",
      hoursData: [
        { day: "Понеделник - Петък", time: "09:00 - 18:00" },
        { day: "Събота", time: "10:00 - 14:00" },
        { day: "Неделя", time: "Затворено" },
      ],
    },
    footer: {
      brand: "Народно читалище",
      brandName: "Мустафа Кемал Ататюрк – 2003",
      tagline: "Културен мост между традиции и бъдеще.",
      contactTitle: "КОНТАКТИ",
      followTitle: "ПОСЛЕДВАЙТЕ НИ",
      rights: "Всички права запазени.",
      address: "гр. Пловдив, България",
    },
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkımızda",
      events: "Etkinlikler",
      contact: "İletişim",
    },
    hero: {
      badge: "Kur. 2003",
      title: "Mustafa Kemal Atatürk Halk Kültür Evi",
      subtitle: "Filibe'de 23 yılı aşkın geçmişi olan köklü bir kültür ve eğitim kurumu.",
      cta: "Etkinlikleri Keşfet",
    },
    about: {
      subtitle: "2003'TEN BERİ",
      title: "Kurum Hakkında",
      content:
        "Filibe'deki 'Mustafa Kemal Atatürk – 2003' Halk Kültür Merkezi, 23 yılı aşkın geçmişiyle köklü bir kültür ve eğitim kurumudur. Bulgaristan'da türünün tek örneğidir ve ülkenin kültürel yaşamında benzersiz bir yere sahiptir. Kurum, modern kültürel, eğitimsel ve sosyal politikalar uygulayarak yaratıcılık, eğitim ve sosyal katılım için alan yaratan, her yaştan, kültürden ve etnik topluluktan insanı bir araya getiren açık bir toplum merkezi olarak faaliyet göstermektedir.",
      learnMore: "Daha Fazla Bilgi",
      yearsLabel: "Yıllık Tarih",
      programs: "Programlar",
      languages: "Diller",
      mission: "Misyon ve Vizyonumuz",
      missionText:
        "Engelli bireyler ve dezavantajlı topluluklar dahil olmak üzere kültürel ve eğitimsel faaliyetlere eşit, erişilebilir ve kapsayıcı erişim sağlayarak Avrupa entegrasyonuna, uluslararası kültürel değişime ve sürdürülebilir kültürel kalkınmaya katkıda bulunmak. Çalışmalarımız kültürel çeşitlilik ve karşılıklı saygı, yaratıcı, sanatsal ve sosyal becerilerin geliştirilmesi, yaşam boyu öğrenmenin desteklenmesi ve Bulgaristan ile yurt dışındaki kültürel, eğitimsel ve sosyal kurumlarla ortaklık ilkeleri doğrultusunda yürütülmektedir. Vizyonumuz, merkezi gelenek, sanat ve yeniliği birleştiren, Filibe, Bulgaristan ve Avrupa'nın kültürel geleceğine katkıda bulunan modern bir kültürel, sanatsal ve sosyal merkez olarak konumlandırmaktır.",
      services: "Hizmetlerimiz",
      servicesList: [
        "Bulgarca, Türkçe, İngilizce, Rusça, Almanca, Fransızca ve daha fazla dilde çok dilli kütüphane",
        "Oyunculuk okulu, tiyatro eğitimleri ve sahne yapımları — işaret dili performansları dahil",
        "Atatürk Müzik Stüdyosu — şan ve vokal eğitimi",
        "Sanat terapisi, müzik terapisi ve duygusal zeka atölyeleri",
        "Bulgarca ve Türkçe dil kursları",
        "Edebiyat kulübü, spor kulübü ve çocuklar için eğitim stüdyoları",
        "Erasmus+ uluslararası gençlik değişim programları",
        "Eğitim, yaratıcılık ve sosyal aktiviteleri birleştiren yaz okulu",
      ],
    },
    activities: {
      title: "Faaliyetlerimiz",
      subtitle:
        "Çocuklar, gençler ve yetişkinler için zengin, çok yönlü bir kültürel, sanatsal ve eğitimsel program.",
      culture: "Kültür ve Sanat",
      cultureDesc:
        "Oyunculuk okulu, tiyatro yapımları (işaret dili performansları dahil), müzik stüdyosu, dans, sanat terapisi, karaoke ve bilgi yarışması geceleri.",
      library: "Kütüphane",
      libraryDesc:
        "Bulgarca, Türkçe, İngilizce, Rusça, Almanca ve Fransızca kitaplarla çok dilli kütüphane. Edebiyat okumaları, kitap tanıtımları ve yazar buluşmaları.",
      clubs: "Kulüpler ve Eğitim",
      clubsDesc:
        "Edebiyat kulübü, spor kulübü, Bulgarca ve Türkçe dil kursları, eğitim stüdyoları ve duygusal zeka atölyeleri.",
      kids: "Gençlik Faaliyetleri",
      kidsDesc:
        "Lego atölyeleri, yaz okulu, sanat atölyeleri, spor girişimleri ve çocuklar ile gençler için yaratıcı programlar.",
      social: "Sosyal Girişimler",
      socialDesc:
        "Hayırseverlik amaçlarına bağışlanan el yapımı ürünler, empati, dayanışma ve aktif vatandaşlık bilinci oluşturma.",
      erasmus: "Erasmus+",
      erasmusDesc:
        "Kültür, gönüllülük ve Avrupa değerlerine odaklanan uluslararası gençlik değişim programlarına aktif katılım.",
    },
    events: {
      title: "Etkinlikler",
      subtitle:
        "En son haberlerimizi, yaklaşan etkinliklerimizi ve kültürel hikayelerimizi keşfedin.",
      latestNews: "Öne Çıkanlar",
      viewAll: "Tüm Etkinlikler",
      readMore: "Devamını Oku",
      noEvents:
        "Şu anda yaklaşan etkinlik yok. Yakında tekrar kontrol edin!",
      backToList: "Etkinliklere Dön",
      upcoming: "Yaklaşan Etkinlikler",
      past: "Geçmiş Etkinlikler",
      updates: "Güncellemeler",
    },
    contact: {
      title: "Bize Ulaşın",
      subtitle: "Bizimle iletişime geçin. Sizden haber almak isteriz.",
      address: "Filibe, Bulgaristan",
      addressLabel: "Adres",
      phoneLabel: "Telefon",
      emailLabel: "E-posta",
      phone: "+359 88 123 4567",
      email: "info@ataturk-library.bg",
      hours: "Çalışma Saatleri",
      hoursData: [
        { day: "Pazartesi - Cuma", time: "09:00 - 18:00" },
        { day: "Cumartesi", time: "10:00 - 14:00" },
        { day: "Pazar", time: "Kapalı" },
      ],
    },
    footer: {
      brand: "Halk Kültür Merkezi",
      brandName: "Mustafa Kemal Atatürk – 2003",
      tagline: "Gelenekler ve gelecek arasında bir kültür köprüsü.",
      contactTitle: "İLETİŞİM",
      followTitle: "BİZİ TAKİP EDİN",
      rights: "Tüm hakları saklıdır.",
      address: "Filibe, Bulgaristan",
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
