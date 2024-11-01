const quotes = [
    "La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
    "No cuentes los días, haz que los días cuenten. - Muhammad Ali",
    "La felicidad no es algo hecho. Proviene de tus propias acciones. - Dalai Lama",
    "El único modo de hacer un gran trabajo es amar lo que haces. - Steve Jobs",
    "El futuro pertenece a quienes creen en la belleza de sus sueños. - Eleanor Roosevelt",
    "Todo lo que necesitas es amor. - The Beatles",
    "La vida es demasiado corta para perder el tiempo odiando a alguien. - Anonymous",
    "Hazlo con pasión o no lo hagas. - Rosa Nouchette Carey",
    "La mayor gloria no es nunca caer, sino levantarse siempre. - Confucio",
    "No se trata de cuántas veces caes, sino de cuántas veces te levantas. - Vince Lombardi",
    "La mente es todo. Lo que pienses, serás. - Buda",
    "La vida no se mide por las veces que respiras, sino por los momentos que te dejan sin aliento. - Anonymous",
    "Tu tiempo es limitado, así que no lo desperdicies viviendo la vida de alguien más. - Steve Jobs",
    "El que quiere hacer algo encuentra un medio; el que no quiere hacer nada encuentra una excusa. - Proverbio árabe",
    "El cambio es la ley de la vida. Y los que miran solo al pasado o al presente, seguramente se perderán el futuro. - John F. Kennedy",
    "No hay nada imposible, porque los sueños de ayer son las esperanzas de hoy y pueden convertirse en realidad mañana. - Walt Disney",
    "La vida es como andar en bicicleta: para mantener el equilibrio, debes seguir adelante. - Albert Einstein",
    "Todo lo que somos es el resultado de lo que hemos pensado. - Buda",
    "La mayor parte de lo que llamamos pensamiento son solo hábitos de pensamiento. - David Allen",
    "El viaje de mil millas comienza con un solo paso. - Lao Tzu",
    "El optimismo es la fe que conduce al logro. Nada se puede hacer sin esperanza y confianza. - Helen Keller",
    "A veces, las preguntas son complicadas y las respuestas son sencillas. - Dr. Seuss",
    "No dejes que el ruido de las opiniones de los demás ahogue tu propia voz interior. - Steve Jobs",
    "La vida es realmente simple, pero insistimos en hacerla complicada. - Confucio",
    "No esperes. Nunca va a ser el momento perfecto. - Napoleon Hill",
    "La creatividad es la inteligencia divirtiéndose. - Albert Einstein"
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById('quote').innerHTML = `"${randomQuote}"`;
