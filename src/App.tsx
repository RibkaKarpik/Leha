import { createSignal, onMount, onCleanup, For } from 'solid-js';
import './WeddingInvitation.scss';

function WeddingInvitation() {
  const [timeLeft, setTimeLeft] = createSignal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Тайминг мероприятия
  const schedule = [
    {
      time: "13:00",
      title: "Регистрация",
      description: "Дворец бракосочетания №1",
      photo: "two_rings.svg"
    },
    {
      time: "14:30",
      title: "Банкет",
      description: "Танцы, веселье и много любви",
      photo: "two_glass.svg"
    },
    {
      time: "18:00",
      title: "Торт",
      description: "Сладкая пауза",
      photo: "cake.svg"
    }
  ];

  // Галерея локации
  const locationPhotos = [
    "place1.jpg",
    "place2.jpg",
    "place3.jpg"
  ];

  // Обратный отсчет
  const updateCountdown = () => {
    const now = new Date();
    const weddingDate = new Date(2025, 7, 5, 12, 0, 0);
    const diff = weddingDate - now;

    if (diff <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  onMount(() => {
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Настройка Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    // Наблюдаем за всеми блоками
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => observer.observe(block));

    onCleanup(() => {
      clearInterval(timer);
      observer.disconnect();
    });
  });

  return (
      <div class="wedding-invitation">
        {/* Блок 1 */}
        <div class="block">
          <div class="block1-top">
            <div class="block1-left">
              <p class="child-question">"Интересно, кто будет моим мужем, когда я выросту?"</p>
              <div class="photo-card">
                <img src="girl.png" alt="Сонечка"/>
                <p>КТО-ТО, 4 года</p>
              </div>
            </div>
            <div class="block1-right">
              <img src="flower.svg" alt="Цветок" class="flower" />
            </div>
          </div>

          <div class="block1-middle">
            <h1>Л+?=</h1>
            <img src="heart.svg" alt="Сердце"/>
          </div>

          <div class="block1-bottom">
            <div class="smile-emoji">😊</div>
            <div class="block1-right-content">
              <div class="photo-card">
                <img src="boy.png" alt="Леха" />
                <p>Леха, 4 года</p>
              </div>
              <p class="answer">"Им буду я!"</p>
            </div>
          </div>
        </div>

        {/* Блок 2 */}
        <div class="block text-block">
          <h1>Узнаете этих детишек?</h1>
          <p class="main-text">
            Да-да, это мы! Время пролетело так быстро, представляете? И вот, повзрослев, мы приняли решение, что пора жениться!
            <br /><br />
            Приглашаем вас присоединиться к нашему первому семейному празднику - нашей свадьбе! Будем счастливы, если это событие вы разделите с нами.
            <br /><br />
            Свадьба состоится:
          </p>

          <div class="date-box">
            <div class="date-day">05</div>
            <div class="date-month">августа</div>
          </div>

          <p class="signature">С любовью,<br />КТО-ТО и Алексей</p>

          <img src="girl_boy.svg" alt="Мы вместе" class="couple-photo" />

          <div class="countdown">
            <h1>До свадьбы осталось</h1>
            <div class="countdown-timer">
              <div class="countdown-item">
                <div class="countdown-value">{timeLeft().days}</div>
                <div class="countdown-label">дней</div>
              </div>
              <div class="countdown-item">
                <div class="countdown-value">{timeLeft().hours}</div>
                <div class="countdown-label">часов</div>
              </div>
              <div class="countdown-item">
                <div class="countdown-value">{timeLeft().minutes}</div>
                <div class="countdown-label">минут</div>
              </div>
              <div class="countdown-item">
                <div class="countdown-value">{timeLeft().seconds}</div>
                <div class="countdown-label">секунд</div>
              </div>
            </div>
          </div>

          <img src="girl_boy.jpg" alt="Любовь" class="love-photo" />
        </div>

        {/* Блок 3 - Тайминг */}
        <div class="block timing-block">
          <h1>Тайминг</h1>
          <p class="timing-description">
            Просим вас прибыть на мероприятие за час до начала церемонии, чтобы провести фотосессию и сохранить моменты этого счастливого дня на всю жизнь!
          </p>

          <div class="schedule-container">
            <For each={schedule}>
              {(item) => (
                  <div class="schedule-item">
                    <div class="schedule-photo">
                      <img src={item.photo} alt={item.title} />
                    </div>
                    <div class="schedule-details">
                      <div class="schedule-time-title">
                        <div class="schedule-time">{item.time}</div>
                        <div class="schedule-title">{item.title}</div>
                      </div>
                      <div class="schedule-description">
                        {item.description}
                      </div>
                    </div>
                  </div>
              )}
            </For>
          </div>
        </div>

        {/* Блок 4 - Локация */}
        <div class="block location-block">
          <h1>Локация</h1>
          <p class="location-description">
            Наше торжество пройдет в стильной усадьбе "Тайны Рублева" по адресу:<br />
            МО, Маслово, 62 (вблизи МКАД)<br /><br />
            Пожалуйста, захватите теплые вещи, вечером может быть прохладно)
          </p>

          <div class="location-gallery-container">
            <div class="location-gallery">
              <For each={locationPhotos}>
                {(photo) => (
                    <div class="gallery-item">
                      <img src={photo} alt="Усадьба" class="gallery-photo" />
                    </div>
                )}
              </For>
            </div>
          </div>

          <h1 class="map-title">Как добраться</h1>
          <div class="map-container">
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A07f9f691cb29154f435bf29263a6f74491fc2969972ac2cd009f8137cb0532ce&amp;source=constructor" width="683" height="495" frameborder="0"></iframe></div>
        </div>
      </div>
  );
}

export default WeddingInvitation;