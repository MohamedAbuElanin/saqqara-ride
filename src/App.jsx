import { useState, useEffect } from 'react';
import Question from './components/Question';
import Buttons from './components/Buttons';
import Popup from './components/Popup';
import fineshMp3 from './Sounds/Finesh.mp3';
import laughSoundMp3 from './Sounds/laugh sound.mp3';
import horseNeighMp3 from './Sounds/Horse Neigh Sounds.mp3';
import horseFootstepsMp3 from './Sounds/Horse footsteps.mp3';
import sound1 from './Sounds/1.mp3';
import sound2 from './Sounds/2.mp3';
import sound3 from './Sounds/3.mp3';

function App() {
  const [comingCount, setComingCount] = useState(0);
  const [escapeCount, setEscapeCount] = useState(0);
  const [popupData, setPopupData] = useState({ show: false, message: '', type: '' });
  const [accepted, setAccepted] = useState(false);

  const trollMessages = [
    "يا بني عيب اللي انت بتعمله 😂",
    "يا بني عيب برضه… بلاش هروب 😏",
    "بتهرب من Ride الخيل ليه بس 😂",
    "هو الخيل عضك قبل كده ولا ايه 😏",
    "دي خروجة مش حرب يا بطل 😈",
    "مش للدرجة دي تخاف من الخيل 😂",
    "يعني كل ده عشان متجيش؟ 😏",
    "الهروب مش هيحل المشكلة 😈",
    "الخيل مستنيك وانت بتهرب 😂",
    "ده Ride مش مطاردة بوليس 😎",
    "مش هتعرف تستخبى من الخروجة 😏",
    "انت بتجري من الخيل ولا مننا 😂",
    "الخروجة جاية جاية 😈",
    "بلاش دراما وتعالى 😎",
    "كل ده عشان تركب خيل بس 😂",
    "واضح انك خايف تتعلق بالخيل 😏",
    "الهروب ده مش هيعدي 😂",
    "الخيل هيجيلك لحد عندك 😈",
    "انت كده بتزوّدها بصراحة 😂",
    "تعالى بس وجرب ومش هتندم 😎",
    "انت ليه واخد الموضوع جد كده 😂",
    "ده Ride خفيف مش سباق فورمولا 😏",
    "واضح انك ناوي تهرب رسمي 😈",
    "مش هتستخبى من سقارة 😂",
    "الخيل مش مخيف كده 😎",
    "انت كده بتفوت حاجة جامدة 😏",
    "الهروب مش أسلوب 😂",
    "تعالى بس والخيل هيحبك 😈",
    "انت بتجري من تجربة حلوة 😂",
    "واضح انك مش قد Ride الخيل 😏",
    "دي فرصة تتصور جامد 😎",
    "مش هتلاقي خروجة زي دي 😂",
    "يعني سايب الخيل وعايز تقعد؟ 😈",
    "الخيل زعلان منك 😏",
    "انت كده بتكسر بخاطر الخيل 😂",
    "خلاص هنجيب الخيل لحد عندك 😈",
    "مفيش مهرب من Ride سقارة 😂",
    "الزر بيهرب زيك بالظبط 😏",
    "انت والزر عاملين فريق هروب 😂",
    "الهروب ده suspicious شوية 😈",
    "واضح انك داخل Mission Escape 😂",
    "بس احنا هنكسبك في الآخر 😎"
  ];

  const playAudio = (src) => {
    const audio = new Audio(src);
    audio.play().catch(e => console.log('Audio error:', e));
  };

  const handleYes = () => {
    playAudio(fineshMp3);
    setComingCount(prev => prev + 1);
    setAccepted(true);
    showPopup("جدع 🔥 مستنيك في سقارة يا بطل 🐎", 'success');
  };

  const handleNoHover = () => {
    setEscapeCount(prev => prev + 1);
    const msgIndex = Math.min(escapeCount, trollMessages.length - 1);
    const msg = trollMessages[msgIndex];
    showPopup(msg, 'troll');

    if (escapeCount === 0) {
      playAudio(horseFootstepsMp3);
      playAudio(horseNeighMp3);
      // Increased the delay to let the horse neigh finish before laughing
      setTimeout(() => playAudio(laughSoundMp3), 2000);
    } else {
      const laughs = [laughSoundMp3, sound1, sound2, sound3];
      playAudio(laughs[Math.floor(Math.random() * laughs.length)]);
    }
  };

  const showPopup = (message, type) => {
    setPopupData({ show: true, message, type });
  };

  const [hasStarted, setHasStarted] = useState(false);

  // Troll popup stays forever
  useEffect(() => {
    // No auto hide anymore
  }, [popupData.show, popupData.message]);

  if (!hasStarted) {
    return (
      <div className="app-container">
        <Question>
          <h1>مستعد لمهام Ride سقارة؟ <i className="fa-solid fa-horse-head"></i></h1>
          <h3>لازم تدوس على الزرار عشان التحدي يبدأ والأصوات تشتغل! 😎</h3>
        </Question>
        <button 
          className="yes-btn" 
          onClick={() => {
            // Unlock audio context with a silent play
            new Audio().play().catch(() => {});
            setHasStarted(true);
          }}
        >
          أنا جاهز 🔥
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      {popupData.show && <Popup message={popupData.message} type={popupData.type} />}
      
      {!accepted ? (
        <>
          <div className="counters">
            <div>مستوى العِنْد والغباء: <span>{escapeCount}</span> محاولات فاشلة 😂</div>
          </div>
          
          <Question>
            <h1>Are you coming to the horse ride in Saqqara this April? <i className="fa-solid fa-horse"></i></h1>
            <h1>هتيجي Ride الخيل في سقارة أول شهر 4؟ <i className="fa-solid fa-horse-head"></i></h1>
            <h3>No pressure… but there is <i className="fa-regular fa-face-laugh-squint"></i></h3>
            <h3>مفيش ضغط خالص… يعني تقريبًا <i className="fa-regular fa-face-laugh-beam"></i></h3>
          </Question>
          
          <Buttons onYes={handleYes} onNoHover={handleNoHover} />
        </>
      ) : (
        <div className="success-container">
          <div className="horse-icon"><i className="fa-solid fa-horse"></i></div>
          <Question>
            <h1>كده الكلام! جهز نفسك يا بطل <i className="fa-solid fa-fire"></i></h1>
          </Question>
          <button className="yes-btn accepted-glow" onClick={() => setAccepted(false)}>
            ارجع تاني
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
