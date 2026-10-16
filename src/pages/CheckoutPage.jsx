import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PRODUCTS, COLOR_OPTIONS, ADDONS } from '../data/products';
import { 
  CheckCircle2, ShieldCheck, ShoppingBag, ArrowRight, Sparkles, 
  Gift, Tag, Clock, Send, Truck, Calendar, MapPin, Navigation, Bell, Zap,
  Coffee, HeartHandshake, QrCode, Video, Lock, Key, Eye, Play, Sparkle, 
  UserX, AlertCircle, ExternalLink, HelpCircle, Edit3, Camera, Palette, Flame, Heart, Smartphone, X 
} from 'lucide-react';
import { dispatchLead } from '../utils/leadDispatcher';
import { useCurrency } from '../context/CurrencyContext';
import { launchLuxuryConfetti } from '../utils/confetti';
import { playLuxuryChime, playWaxSealBreakSound } from '../utils/audioAlert';
import CustomRibbonSimulator from '../components/CustomRibbonSimulator';
import VelvetBoxEngravingCustomizer from '../components/VelvetBoxEngravingCustomizer';
import FloralFragranceSelector, { FRAGRANCE_OPTIONS } from '../components/FloralFragranceSelector';
import GourmetChampagneStrawberriesSelector, { CHAMPAGNE_OPTIONS, STRAWBERRY_OPTIONS, CHOCOLATE_GLAZE_OPTIONS } from '../components/GourmetChampagneStrawberriesSelector';
import AudioWaveformEngravingSelector, { PAPER_STOCKS, PRESET_VOICE_MEMOS } from '../components/AudioWaveformEngravingSelector';
import PopUpCard3DSimulator, { POPUP_SCULPTURES, ENVELOPE_STYLES } from '../components/PopUpCard3DSimulator';
import VintageMusicBoxConfigurator, { MUSIC_BOX_MELODIES, MUSIC_BOX_FINISHES, ACTIVATION_MODES } from '../components/VintageMusicBoxConfigurator';
import RoyalUnboxingSimulator, { PACKAGING_THEMES, UNBOXING_BOUQUETS, SCENT_MISTS } from '../components/RoyalUnboxingSimulator';
import PetalLaserEngraver from '../components/PetalLaserEngraver';
import FlowerCareGuideWidget from '../components/FlowerCareGuideWidget';
import CeramicAromaDiffuserWidget, { AROMA_ESSENCES, DIFFUSION_LEVELS } from '../components/CeramicAromaDiffuserWidget';
import HolographicCard3DSimulator, { HOLO_THEMES, FOIL_STAMP_COLORS } from '../components/HolographicCard3DSimulator';
import SecretDrawerBoxWidget, { DRAWER_CONTENTS, VELVET_LININGS, DRAWER_HANDLES } from '../components/SecretDrawerBoxWidget';
import SmokeCascadeSimulator, { MIST_LIGHTINGS, MIST_AROMAS, CASCADE_TRIGGERS, EMISSION_DURATIONS } from '../components/SmokeCascadeSimulator';
import CosmicLocketSimulator, { LOCKET_METALS, LOCKET_SHAPES, DIAMOND_DUSTS, CHAIN_LENGTHS } from '../components/CosmicLocketSimulator';
import MechatronicRoseSimulator, { MECHATRONIC_FINISHES, PULSE_PRESETS, PULSE_LIGHTINGS } from '../components/MechatronicRoseSimulator';
import { 
  RoseIcon, CrownIcon, RibbonIcon, DiamondIcon, RingIcon, 
  SparkleIcon, CoffeeIcon, PartyIcon, CakeIcon, SecretMaskIcon, 
  SnowflakeIcon, QuillIcon, LivePulseDot, ScrollDiplomaIcon, WaxSealStampIcon,
  PerfumeBottleIcon, MistSprayIcon, CameraPlusIcon, ClimateVanIcon, ThermometerGaugeIcon,
  ParchmentScrollIcon, CalendarHeartIcon, FairyLightsIcon,
  ChampagneFlutesIcon, StrawberryGoldIcon, AudioWaveformIcon, VoiceRecordMicIcon,
  PopUpGreetingCardIcon, FlyingPetalsIcon, MusicBoxCrankIcon, MusicMelodyRollIcon,
  UnboxingVaultIcon, SatinRibbonBowIcon, LaserPetalEngraverIcon, PetalMagnifierIcon,
  FlowerCareKitIcon, StemCut45Icon, CeramicMedallionIcon, AromaWavesIcon,
  HolographicPrismIcon, LenticularEyeIcon, SecretDrawerIcon, EngagementRingIcon,
  SmokeCascadeIcon, DryIceFlaskIcon, CosmicLocketIcon, JewelerLoupeIcon,
  MechatronicRoseIcon, HeartbeatPulseIcon
} from '../components/CustomIcons';
import ClimateDeliveryMapSimulator from '../components/ClimateDeliveryMapSimulator';

const DELIVERY_ZONES = [
  { id: 'sector2', name: 'București — Sector 2 (Pipera, Floreasca, Tei, Colentina)', transitMin: 35, fee: 0, tag: 'Cel mai rapid (Atelier Local)' },
  { id: 'sector1', name: 'București — Sector 1 (Băneasa, Aviatorilor, Dorobanți, Victoriei)', transitMin: 45, fee: 0, tag: '40-50 min' },
  { id: 'sector3', name: 'București — Sector 3 (Unirii, Decebal, Titan, Dristor)', transitMin: 50, fee: 0, tag: '45-55 min' },
  { id: 'sector4', name: 'București — Sector 4 (Tineretului, Berceni, Olteniței)', transitMin: 55, fee: 0, tag: '50-60 min' },
  { id: 'sector5', name: 'București — Sector 5 (Cotroceni, 13 Septembrie, Rahova)', transitMin: 55, fee: 0, tag: '50-60 min' },
  { id: 'sector6', name: 'București — Sector 6 (Militari, Drumul Taberei, Crângași)', transitMin: 60, fee: 0, tag: '55-65 min' },
  { id: 'ilfov', name: 'Ilfov (Voluntari, Otopeni, Popești-Leordeni, Chiajna)', transitMin: 70, fee: 15, tag: '65-75 min' },
  { id: 'national', name: 'Național — Curier Securizat 24h Climatizat (Cluj, Timișoara, Iași...)', transitMin: 1440, fee: 25, tag: '24h Climatizat' },
];

export default function CheckoutPage({ onOpenCertificateModal, onOpenReviewModal, onOpenAnniversary, onOpenLedSimulator, onOpenGourmetTasting, onOpenAudioEngraving, onOpenPopUpCard, onOpenMusicBox, onOpenUnboxing, onOpenPetalLaser, onOpenCareGuide, onOpenAromaMedallion, onOpenHoloCard, onOpenSecretDrawer, onOpenSmokeCascade, onOpenCosmicLocket, onOpenMechatronicRose }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice, currency } = useCurrency();

  const bouquetParam = searchParams.get('bouquet');
  const discountParam = searchParams.get('discount');
  const addonParam = searchParams.get('addon');
  const addonsParam = searchParams.get('addons');
  const colorParam = searchParams.get('color');
  const ribbonTextParam = searchParams.get('ribbonText');
  const ribbonFabricParam = searchParams.get('ribbonFabric');
  const ribbonFoilParam = searchParams.get('ribbonFoil');

  // Velvet Box Query Params (Task 43)
  const boxShapeParam = searchParams.get('boxShape');
  const boxColorParam = searchParams.get('boxColor');
  const boxMetalParam = searchParams.get('boxMetal');
  const boxLine1Param = searchParams.get('line1');
  const boxLine2Param = searchParams.get('line2');
  const boxLine3Param = searchParams.get('line3');

  const initialColor = colorParam 
    ? (COLOR_OPTIONS.find((c) => c.id === colorParam || c.name.toLowerCase().includes(colorParam.toLowerCase()))?.name || COLOR_OPTIONS[0].name)
    : COLOR_OPTIONS[0].name;

  const [selectedBouquetId, setSelectedBouquetId] = useState(bouquetParam || 'signature-dual-noir-rouge');
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [couponCode, setCouponCode] = useState(discountParam || localStorage.getItem('stardust_active_discount') || '');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Custom Satin Ribbon State (Task 42)
  const [ribbonConfig, setRibbonConfig] = useState(() => ({
    text: ribbonTextParam ? decodeURIComponent(ribbonTextParam) : 'Te iubesc mai mult în fiecare zi, Ana',
    fabricId: ribbonFabricParam || 'noir-satin',
    fabricName: 'Noir Onyx Satin',
    foilId: ribbonFoilParam || 'gold-24k',
    foilName: 'Folie Aur 24K Lucios'
  }));
  const [showRibbonDrawer, setShowRibbonDrawer] = useState(false);

  // Royal Velvet Box with Laser Engraved Metal Plaque State (Task 43)
  const [boxConfig, setBoxConfig] = useState(() => ({
    shapeId: boxShapeParam || 'round-hatbox',
    shapeName: 'Cutie Rotundă Grand Hatbox',
    colorId: boxColorParam || 'bordeaux-imperial',
    colorName: 'Catifea Bordeaux Imperial',
    metalId: boxMetalParam || 'brushed-gold',
    metalName: 'Alamă Aurită Șlefuită (24K Gold)',
    line1: boxLine1Param ? decodeURIComponent(boxLine1Param) : 'A & M',
    line2: boxLine2Param ? decodeURIComponent(boxLine2Param) : '24.10.2023',
    line3: boxLine3Param ? decodeURIComponent(boxLine3Param) : 'PENTRU TOTDEAUNA'
  }));
  const [showBoxDrawer, setShowBoxDrawer] = useState(false);

  // Atelier Floral Fragrance State (Task 47)
  const [selectedFragrance, setSelectedFragrance] = useState(FRAGRANCE_OPTIONS[0]);
  const [showFragranceDrawer, setShowFragranceDrawer] = useState(false);

  // Gourmet Champagne & Gold Strawberries State (Task 54)
  const [gourmetConfig, setGourmetConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_gourmet_package');
      return saved ? JSON.parse(saved) : {
        champagne: CHAMPAGNE_OPTIONS[0],
        strawberries: STRAWBERRY_OPTIONS[0],
        glaze: CHOCOLATE_GLAZE_OPTIONS[0],
        message: 'Te iubesc',
        includeChilledPackaging: true,
        totalPrice: 400
      };
    } catch {
      return {
        champagne: CHAMPAGNE_OPTIONS[0],
        strawberries: STRAWBERRY_OPTIONS[0],
        glaze: CHOCOLATE_GLAZE_OPTIONS[0],
        message: 'Te iubesc',
        includeChilledPackaging: true,
        totalPrice: 400
      };
    }
  });
  const [showGourmetDrawer, setShowGourmetDrawer] = useState(false);

  // Audio Waveform & 24K Gold Spectrogram Engraving State (Task 55)
  const [audioEngravingConfig, setAudioEngravingConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_audio_engraving');
      return saved ? JSON.parse(saved) : {
        stock: PAPER_STOCKS[0],
        preset: PRESET_VOICE_MEMOS[0],
        mode: 'presets',
        initials: 'A & M',
        subtitle: 'Vocea mea este a ta pentru totdeauna',
        customText: PRESET_VOICE_MEMOS[0].transcript,
        durationSeconds: 14,
        totalPrice: 39
      };
    } catch {
      return {
        stock: PAPER_STOCKS[0],
        preset: PRESET_VOICE_MEMOS[0],
        mode: 'presets',
        initials: 'A & M',
        subtitle: 'Vocea mea este a ta pentru totdeauna',
        customText: PRESET_VOICE_MEMOS[0].transcript,
        durationSeconds: 14,
        totalPrice: 39
      };
    }
  });
  const [showAudioEngravingDrawer, setShowAudioEngravingDrawer] = useState(false);

  // 3D Pop-Up Greeting Card & Cascading Petals State (Task 56)
  const [popUpCardConfig, setPopUpCardConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_popup_card');
      return saved ? JSON.parse(saved) : {
        sculpture: POPUP_SCULPTURES[0],
        envelope: ENVELOPE_STYLES[0],
        message: 'Pentru persoana care aduce magie în fiecare clipă din viața mea. Te iubesc din tot sufletul!',
        recipient: 'Pentru Andreea',
        sender: 'Al tău, Andrei',
        totalPrice: 29
      };
    } catch {
      return {
        sculpture: POPUP_SCULPTURES[0],
        envelope: ENVELOPE_STYLES[0],
        message: 'Pentru persoana care aduce magie în fiecare clipă din viața mea. Te iubesc din tot sufletul!',
        recipient: 'Pentru Andreea',
        sender: 'Al tău, Andrei',
        totalPrice: 29
      };
    }
  });
  const [showPopUpCardDrawer, setShowPopUpCardDrawer] = useState(false);

  // Vintage Mechanical Music Box State (Task 57)
  const [musicBoxConfig, setMusicBoxConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_music_box');
      return saved ? JSON.parse(saved) : {
        melodyId: 'la-vie-en-rose',
        melodyTitle: 'Édith Piaf — La Vie En Rose',
        finishId: 'swiss-gold-24k',
        finishName: 'Mecanism Elvețian Placat cu Aur 24K',
        modeId: 'optical-sensor',
        modeName: 'Senzor la Ridicarea Capacului (Surpriză Automată)',
        engravedText: 'Pentru Sufletul Meu Pereche',
        totalPrice: 85
      };
    } catch {
      return {
        melodyId: 'la-vie-en-rose',
        melodyTitle: 'Édith Piaf — La Vie En Rose',
        finishId: 'swiss-gold-24k',
        finishName: 'Mecanism Elvețian Placat cu Aur 24K',
        modeId: 'optical-sensor',
        modeName: 'Senzor la Ridicarea Capacului (Surpriză Automată)',
        engravedText: 'Pentru Sufletul Meu Pereche',
        totalPrice: 85
      };
    }
  });
  const [showMusicBoxDrawer, setShowMusicBoxDrawer] = useState(false);

  // Royal Unboxing Experience State (Task 58)
  const [unboxingConfig, setUnboxingConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_unboxing_package');
      return saved ? JSON.parse(saved) : {
        themeId: PACKAGING_THEMES[0].id,
        themeName: PACKAGING_THEMES[0].name,
        bouquetId: UNBOXING_BOUQUETS[0].id,
        bouquetName: UNBOXING_BOUQUETS[0].name,
        ribbonText: 'Pentru Sufletul Meu Pereche',
        scentId: SCENT_MISTS[0].id,
        scentName: SCENT_MISTS[0].name,
        totalPrice: PACKAGING_THEMES[0].price
      };
    } catch {
      return {
        themeId: PACKAGING_THEMES[0].id,
        themeName: PACKAGING_THEMES[0].name,
        bouquetId: UNBOXING_BOUQUETS[0].id,
        bouquetName: UNBOXING_BOUQUETS[0].name,
        ribbonText: 'Pentru Sufletul Meu Pereche',
        scentId: SCENT_MISTS[0].id,
        scentName: SCENT_MISTS[0].name,
        totalPrice: PACKAGING_THEMES[0].price
      };
    }
  });
  const [showUnboxingDrawer, setShowUnboxingDrawer] = useState(false);

  // Laser Petal Engraving State (Task 59)
  const [petalLaserConfig, setPetalLaserConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_petal_laser');
      return saved ? JSON.parse(saved) : {
        text: 'Ești Universul Meu',
        styleId: 'script_regal',
        styleName: 'Caligrafie Regală Cursivă',
        foilId: 'gold_24k',
        foilName: 'Pulbere de Aur 24K Topită',
        colorId: 'rouge_imperial',
        colorName: 'Rouge Impérial',
        totalPrice: 49
      };
    } catch {
      return {
        text: 'Ești Universul Meu',
        styleId: 'script_regal',
        styleName: 'Caligrafie Regală Cursivă',
        foilId: 'gold_24k',
        foilName: 'Pulbere de Aur 24K Topită',
        colorId: 'rouge_imperial',
        colorName: 'Rouge Impérial',
        totalPrice: 49
      };
    }
  });
  const [showPetalLaserDrawer, setShowPetalLaserDrawer] = useState(false);

  // Flower Care & Longevity Kit State (Task 60)
  const [careKitConfig, setCareKitConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_care_kit');
      return saved ? JSON.parse(saved) : {
        kitType: 'standard',
        kitName: 'Kit Îngrijire & Nutrienți Chrysal Longevitate 14+ Zile',
        waterDays: 2,
        temperature: 19,
        stemCutAngle: 45,
        hasNutrients: true,
        protectGlitter: true,
        protectSunlight: true,
        flowerType: 'fresh',
        predictedDays: 14,
        totalPrice: 29
      };
    } catch {
      return {
        kitType: 'standard',
        kitName: 'Kit Îngrijire & Nutrienți Chrysal Longevitate 14+ Zile',
        waterDays: 2,
        temperature: 19,
        stemCutAngle: 45,
        hasNutrients: true,
        protectGlitter: true,
        protectSunlight: true,
        flowerType: 'fresh',
        predictedDays: 14,
        totalPrice: 29
      };
    }
  });
  const [showCareKitDrawer, setShowCareKitDrawer] = useState(false);

  // Ceramic Aroma Diffuser Medallion State (Task 61)
  const [aromaMedallionConfig, setAromaMedallionConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_aroma_medallion');
      return saved ? JSON.parse(saved) : {
        essenceId: AROMA_ESSENCES[0].id,
        essenceName: AROMA_ESSENCES[0].name,
        levelId: DIFFUSION_LEVELS[1].id,
        levelLabel: DIFFUSION_LEVELS[1].label,
        radius: DIFFUSION_LEVELS[1].radius,
        coverage: DIFFUSION_LEVELS[1].coverage,
        drops: DIFFUSION_LEVELS[1].drops,
        diffusionDays: AROMA_ESSENCES[0].diffusionDays,
        totalPrice: AROMA_ESSENCES[0].price
      };
    } catch {
      return {
        essenceId: AROMA_ESSENCES[0].id,
        essenceName: AROMA_ESSENCES[0].name,
        levelId: DIFFUSION_LEVELS[1].id,
        levelLabel: DIFFUSION_LEVELS[1].label,
        radius: DIFFUSION_LEVELS[1].radius,
        coverage: DIFFUSION_LEVELS[1].coverage,
        drops: DIFFUSION_LEVELS[1].drops,
        diffusionDays: AROMA_ESSENCES[0].diffusionDays,
        totalPrice: AROMA_ESSENCES[0].price
      };
    }
  });
  const [showAromaMedallionDrawer, setShowAromaMedallionDrawer] = useState(false);

  // Holographic 3D Card State (Task 62)
  const [holoCardConfig, setHoloCardConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_holo_card');
      return saved ? JSON.parse(saved) : {
        themeId: HOLO_THEMES[0].id,
        themeName: HOLO_THEMES[0].name,
        foilId: FOIL_STAMP_COLORS[0].id,
        foilName: FOIL_STAMP_COLORS[0].name,
        recipientName: 'Pentru Sufletul Meu Pereche',
        customDedication: 'În ochii tăi văd întregul univers strălucind mai frumos ca o mie de stele.',
        senderName: 'Cu dragoste veșnică, Andrei',
        totalPrice: HOLO_THEMES[0].price
      };
    } catch {
      return {
        themeId: HOLO_THEMES[0].id,
        themeName: HOLO_THEMES[0].name,
        foilId: FOIL_STAMP_COLORS[0].id,
        foilName: FOIL_STAMP_COLORS[0].name,
        recipientName: 'Pentru Sufletul Meu Pereche',
        customDedication: 'În ochii tăi văd întregul univers strălucind mai frumos ca o mie de stele.',
        senderName: 'Cu dragoste veșnică, Andrei',
        totalPrice: HOLO_THEMES[0].price
      };
    }
  });
  const [showHoloCardDrawer, setShowHoloCardDrawer] = useState(false);

  // Secret Drawer Box State (Task 63)
  const [secretDrawerConfig, setSecretDrawerConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_secret_drawer');
      return saved ? JSON.parse(saved) : {
        contentId: DRAWER_CONTENTS[0].id,
        contentName: DRAWER_CONTENTS[0].name,
        velvetId: VELVET_LININGS[0].id,
        velvetName: VELVET_LININGS[0].name,
        handleId: DRAWER_HANDLES[0].id,
        handleName: DRAWER_HANDLES[0].name,
        secretMessage: 'Vrei să fii soția mea?',
        monogramInitials: 'A & E',
        totalPrice: DRAWER_CONTENTS[0].price
      };
    } catch {
      return {
        contentId: DRAWER_CONTENTS[0].id,
        contentName: DRAWER_CONTENTS[0].name,
        velvetId: VELVET_LININGS[0].id,
        velvetName: VELVET_LININGS[0].name,
        handleId: DRAWER_HANDLES[0].id,
        handleName: DRAWER_HANDLES[0].name,
        secretMessage: 'Vrei să fii soția mea?',
        monogramInitials: 'A & E',
        totalPrice: DRAWER_CONTENTS[0].price
      };
    }
  });
  const [showSecretDrawerDrawer, setShowSecretDrawerDrawer] = useState(false);

  // Smoke & Dry Ice Cascade State (Task 64)
  const [smokeCascadeConfig, setSmokeCascadeConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_smoke_cascade');
      return saved ? JSON.parse(saved) : {
        lightingId: MIST_LIGHTINGS[0].id,
        lightingName: MIST_LIGHTINGS[0].name,
        lightingHex: MIST_LIGHTINGS[0].hex,
        aromaId: MIST_AROMAS[0].id,
        aromaName: MIST_AROMAS[0].name,
        triggerId: CASCADE_TRIGGERS[0].id,
        triggerName: CASCADE_TRIGGERS[0].name,
        durationId: EMISSION_DURATIONS[0].id,
        durationName: EMISSION_DURATIONS[0].name,
        totalPrice: 59
      };
    } catch {
      return {
        lightingId: MIST_LIGHTINGS[0].id,
        lightingName: MIST_LIGHTINGS[0].name,
        lightingHex: MIST_LIGHTINGS[0].hex,
        aromaId: MIST_AROMAS[0].id,
        aromaName: MIST_AROMAS[0].name,
        triggerId: CASCADE_TRIGGERS[0].id,
        triggerName: CASCADE_TRIGGERS[0].name,
        durationId: EMISSION_DURATIONS[0].id,
        durationName: EMISSION_DURATIONS[0].name,
        totalPrice: 59
      };
    }
  });
  const [showSmokeCascadeDrawer, setShowSmokeCascadeDrawer] = useState(false);

  // Cosmic Locket Secret Capsule State (Task 65)
  const [cosmicLocketConfig, setCosmicLocketConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_cosmic_locket');
      return saved ? JSON.parse(saved) : {
        metalId: LOCKET_METALS[0].id,
        metalName: LOCKET_METALS[0].name,
        shapeId: LOCKET_SHAPES[0].id,
        shapeName: LOCKET_SHAPES[0].name,
        dustId: DIAMOND_DUSTS[0].id,
        dustName: DIAMOND_DUSTS[0].name,
        chainId: CHAIN_LENGTHS[0].id,
        chainName: CHAIN_LENGTHS[0].name,
        secretMessage: 'Ești Universul Meu Etern',
        coordinatesDate: "44°26'N 26°06'E • 24.10.2023",
        totalPrice: 69
      };
    } catch {
      return {
        metalId: LOCKET_METALS[0].id,
        metalName: LOCKET_METALS[0].name,
        shapeId: LOCKET_SHAPES[0].id,
        shapeName: LOCKET_SHAPES[0].name,
        dustId: DIAMOND_DUSTS[0].id,
        dustName: DIAMOND_DUSTS[0].name,
        chainId: CHAIN_LENGTHS[0].id,
        chainName: CHAIN_LENGTHS[0].name,
        secretMessage: 'Ești Universul Meu Etern',
        coordinatesDate: "44°26'N 26°06'E • 24.10.2023",
        totalPrice: 69
      };
    }
  });
  const [showCosmicLocketDrawer, setShowCosmicLocketDrawer] = useState(false);

  // Mechatronic Motorized Rose with Heartbeat Pulse State (Task 66)
  const [mechatronicRoseConfig, setMechatronicRoseConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('stardust_mechatronic_rose');
      return saved ? JSON.parse(saved) : {
        finishId: MECHATRONIC_FINISHES[0].id,
        finishName: MECHATRONIC_FINISHES[0].name,
        presetId: PULSE_PRESETS[0].id,
        presetName: PULSE_PRESETS[0].name,
        bpm: 68,
        lightingId: PULSE_LIGHTINGS[0].id,
        lightingName: PULSE_LIGHTINGS[0].name,
        sensorDedication: 'Inima mea bate doar pentru tine',
        senderName: 'Al tău pentru totdeauna',
        totalPrice: 95
      };
    } catch {
      return {
        finishId: MECHATRONIC_FINISHES[0].id,
        finishName: MECHATRONIC_FINISHES[0].name,
        presetId: PULSE_PRESETS[0].id,
        presetName: PULSE_PRESETS[0].name,
        bpm: 68,
        lightingId: PULSE_LIGHTINGS[0].id,
        lightingName: PULSE_LIGHTINGS[0].name,
        sensorDedication: 'Inima mea bate doar pentru tine',
        senderName: 'Al tău pentru totdeauna',
        totalPrice: 95
      };
    }
  });
  const [showMechatronicRoseDrawer, setShowMechatronicRoseDrawer] = useState(false);

  // Gratitude Tip Jar state (Task 40)
  const [selectedTipId, setSelectedTipId] = useState('none');
  const [tipAmount, setTipAmount] = useState(0);
  const [customTipInput, setCustomTipInput] = useState('');

  // Delivery details & ETA Clock (Task 33 & Task 36)
  const [deliveryType, setDeliveryType] = useState('express_today'); // 'express_today' | 'scheduled'
  const [selectedZone, setSelectedZone] = useState('sector2');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('14:00 - 18:00');
  const [isSecretDelivery, setIsSecretDelivery] = useState(false);
  const [notifyOnMorning, setNotifyOnMorning] = useState(true);

  // Customer details
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [cardMessage, setCardMessage] = useState('');

  // Modal success state
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [placedOrderData, setPlacedOrderData] = useState(null);

  // Video QR on Greeting Card State (Task 44)
  const [videoQrEnabled, setVideoQrEnabled] = useState(true);
  const [videoQrUrl, setVideoQrUrl] = useState(() => localStorage.getItem('stardust_draft_videolink') || 'https://youtu.be/stardust-romance-surprise');
  const [videoQrUsePin, setVideoQrUsePin] = useState(false);
  const [videoQrPin, setVideoQrPin] = useState('2026');
  const [cardTheme, setCardTheme] = useState('ivory'); // 'ivory' | 'noir' | 'rose'
  const [videoTestModalOpen, setVideoTestModalOpen] = useState(false);
  const [testPinInput, setTestPinInput] = useState('');
  const [testPinUnlocked, setTestPinUnlocked] = useState(false);

  // Anonymous Surprise Delivery State (Task 44)
  const [secretHint, setSecretHint] = useState('De la un admirator secret');

  // Climate-Controlled Van GPS Drawer State (Task 50)
  const [showClimateMapDrawer, setShowClimateMapDrawer] = useState(false);

  const getVideoPlatform = (url) => {
    if (!url) return { name: 'Video Personal', badge: 'Video', color: '#64748b' };
    const lower = url.toLowerCase();
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
      return { name: 'YouTube Video', badge: 'YouTube', color: '#ef4444' };
    }
    if (lower.includes('tiktok.com')) {
      return { name: 'TikTok Clip', badge: 'TikTok', color: '#000000' };
    }
    if (lower.includes('loom.com')) {
      return { name: 'Loom Walkthrough', badge: 'Loom', color: '#8b5cf6' };
    }
    if (lower.includes('vimeo.com')) {
      return { name: 'Vimeo HD', badge: 'Vimeo', color: '#0ea5e9' };
    }
    if (lower.includes('drive.google.com')) {
      return { name: 'Google Drive', badge: 'Drive', color: '#10b981' };
    }
    return { name: 'Video Web Direct', badge: 'Video Link', color: '#e11d48' };
  };

  useEffect(() => {
    // Set default delivery date: today for express, tomorrow for scheduled
    const today = new Date();
    setDeliveryDate(today.toISOString().split('T')[0]);

    // Load pre-filled lead info if existing
    const leadInfo = JSON.parse(localStorage.getItem('stardust_lead_info') || '{}');
    if (leadInfo.name) setSenderName(leadInfo.name);
    if (leadInfo.phone) setSenderPhone(leadInfo.phone);

    const draftMsg = localStorage.getItem('stardust_draft_message') || '';
    const draftLink = localStorage.getItem('stardust_draft_videolink') || '';
    if (draftMsg || draftLink) {
      setCardMessage([draftMsg, draftLink ? `Link video: ${draftLink}` : ''].filter(Boolean).join('\n'));
    }

    const activeDisc = (discountParam || localStorage.getItem('stardust_active_discount') || '').toUpperCase();
    if (activeDisc === 'STARDUST20') {
      setDiscountApplied(true);
      setDiscountPercent(20);
      setCouponCode('STARDUST20');
    } else if (activeDisc === 'STARDUST15') {
      setDiscountApplied(true);
      setDiscountPercent(15);
      setCouponCode('STARDUST15');
    } else if (activeDisc === 'STARDUST10') {
      setDiscountApplied(true);
      setDiscountPercent(10);
      setCouponCode('STARDUST10');
    }

    if (addonParam === 'panglica-caligrafica' || ribbonTextParam) {
      setSelectedAddons((prev) => prev.includes('panglica-caligrafica') ? prev : [...prev, 'panglica-caligrafica']);
    }

    if (addonParam === 'cutie-catifea-gravata' || boxLine1Param) {
      setSelectedAddons((prev) => prev.includes('cutie-catifea-gravata') ? prev : [...prev, 'cutie-catifea-gravata']);
    }

    if (addonParam === 'royal-unboxing-experience') {
      setSelectedAddons((prev) => prev.includes('royal-unboxing-experience') ? prev : [...prev, 'royal-unboxing-experience']);
    }

    if (addonParam === 'kit-ingrijire-longevitate') {
      setSelectedAddons((prev) => prev.includes('kit-ingrijire-longevitate') ? prev : [...prev, 'kit-ingrijire-longevitate']);
    }

    if (addonParam === 'medalion-ceramic-parfum') {
      setSelectedAddons((prev) => prev.includes('medalion-ceramic-parfum') ? prev : [...prev, 'medalion-ceramic-parfum']);
    }

    if (addonParam === 'felicitare-holografica-3d') {
      setSelectedAddons((prev) => prev.includes('felicitare-holografica-3d') ? prev : [...prev, 'felicitare-holografica-3d']);
    }

    if (addonParam === 'cutie-secret-sertar-glisant') {
      setSelectedAddons((prev) => prev.includes('cutie-secret-sertar-glisant') ? prev : [...prev, 'cutie-secret-sertar-glisant']);
    }

    if (addonParam === 'efect-fum-cascada-dry-ice') {
      setSelectedAddons((prev) => prev.includes('efect-fum-cascada-dry-ice') ? prev : [...prev, 'efect-fum-cascada-dry-ice']);
    }

    if (addonParam === 'pandantiv-capsula-diamant-cosmic') {
      setSelectedAddons((prev) => prev.includes('pandantiv-capsula-diamant-cosmic') ? prev : [...prev, 'pandantiv-capsula-diamant-cosmic']);
    }

    if (addonParam === 'floare-mecatronica-puls-cardiac') {
      setSelectedAddons((prev) => prev.includes('floare-mecatronica-puls-cardiac') ? prev : [...prev, 'floare-mecatronica-puls-cardiac']);
    }

    if (addonsParam) {
      const ids = addonsParam.split(',').map((s) => s.trim()).filter(Boolean);
      setSelectedAddons((prev) => {
        const next = new Set([...prev, ...ids]);
        return Array.from(next);
      });
    }

    if (colorParam) {
      const matchColor = COLOR_OPTIONS.find((c) => c.id === colorParam || c.name.toLowerCase().includes(colorParam.toLowerCase()));
      if (matchColor) {
        setSelectedColor(matchColor.name);
      }
    }

    if (bouquetParam) {
      const matchBouquet = PRODUCTS.find((p) => p.id === bouquetParam);
      if (matchBouquet) {
        setSelectedBouquetId(matchBouquet.id);
      }
    }
  }, [discountParam, addonParam, addonsParam, colorParam, bouquetParam, ribbonTextParam, boxLine1Param]);

  const currentBouquet = PRODUCTS.find((p) => p.id === selectedBouquetId) || PRODUCTS[1];

  const handleToggleAddon = (addonId) => {
    setSelectedAddons((prev) => 
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'STARDUST20') {
      setDiscountApplied(true);
      setDiscountPercent(20);
      localStorage.setItem('stardust_active_discount', 'STARDUST20');
    } else if (code === 'STARDUST15') {
      setDiscountApplied(true);
      setDiscountPercent(15);
      localStorage.setItem('stardust_active_discount', 'STARDUST15');
    } else if (code === 'STARDUST10') {
      setDiscountApplied(true);
      setDiscountPercent(10);
      localStorage.setItem('stardust_active_discount', 'STARDUST10');
    } else {
      alert('Codul introdus nu este valid. Folosește codul STARDUST10, STARDUST15 sau STARDUST20.');
    }
  };

  // Price calculations, Zone Fees & Bundle Savings
  const zoneInfo = DELIVERY_ZONES.find((z) => z.id === selectedZone) || DELIVERY_ZONES[0];
  const deliveryFee = zoneInfo.fee;

  const basePrice = currentBouquet.price;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    if (addonId === 'pachet-gourmet-moet-capsuni' && gourmetConfig && gourmetConfig.totalPrice !== undefined) {
      return sum + gourmetConfig.totalPrice;
    }
    if (addonId === 'gravura-audio-spectrograma' && audioEngravingConfig && audioEngravingConfig.totalPrice !== undefined) {
      return sum + audioEngravingConfig.totalPrice;
    }
    if (addonId === 'felicitare-popup-3d-petale' && popUpCardConfig && popUpCardConfig.totalPrice !== undefined) {
      return sum + popUpCardConfig.totalPrice;
    }
    if (addonId === 'cutie-muzicala-mecanica' && musicBoxConfig && musicBoxConfig.totalPrice !== undefined) {
      return sum + musicBoxConfig.totalPrice;
    }
    if (addonId === 'royal-unboxing-experience' && unboxingConfig && unboxingConfig.totalPrice !== undefined) {
      return sum + unboxingConfig.totalPrice;
    }
    if (addonId === 'gravura-laser-petala' && petalLaserConfig && petalLaserConfig.totalPrice !== undefined) {
      return sum + petalLaserConfig.totalPrice;
    }
    if (addonId === 'kit-ingrijire-longevitate' && careKitConfig && careKitConfig.totalPrice !== undefined) {
      return sum + careKitConfig.totalPrice;
    }
    if (addonId === 'medalion-ceramic-parfum' && aromaMedallionConfig && aromaMedallionConfig.totalPrice !== undefined) {
      return sum + aromaMedallionConfig.totalPrice;
    }
    if (addonId === 'felicitare-holografica-3d' && holoCardConfig && holoCardConfig.totalPrice !== undefined) {
      return sum + holoCardConfig.totalPrice;
    }
    if (addonId === 'cutie-secret-sertar-glisant' && secretDrawerConfig && secretDrawerConfig.totalPrice !== undefined) {
      return sum + secretDrawerConfig.totalPrice;
    }
    if (addonId === 'efect-fum-cascada-dry-ice' && smokeCascadeConfig && smokeCascadeConfig.totalPrice !== undefined) {
      return sum + smokeCascadeConfig.totalPrice;
    }
    if (addonId === 'pandantiv-capsula-diamant-cosmic' && cosmicLocketConfig && cosmicLocketConfig.totalPrice !== undefined) {
      return sum + cosmicLocketConfig.totalPrice;
    }
    if (addonId === 'floare-mecatronica-puls-cardiac' && mechatronicRoseConfig && mechatronicRoseConfig.totalPrice !== undefined) {
      return sum + mechatronicRoseConfig.totalPrice;
    }
    const item = ADDONS.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  // Automatic bundle discount: 2 addons = 15 RON off, 3+ addons = 25 RON off
  const bundleDiscount = selectedAddons.length >= 2 ? (selectedAddons.length === 2 ? 15 : 25) : 0;

  const subtotal = basePrice + addonsTotal;
  const couponDiscountAmount = discountApplied ? Math.round((subtotal - bundleDiscount) * (discountPercent / 100)) : 0;
  const totalDiscount = couponDiscountAmount + bundleDiscount;
  const finalTotal = Math.max(0, subtotal - totalDiscount + deliveryFee + Number(tipAmount || 0));

  // Tip Options Configuration (Task 40)
  const isEur = currency === 'EUR';
  const TIP_OPTIONS = isEur ? [
    { id: 'none', label: 'Fără bacșiș', amount: 0, sub: '0 €', Icon: null },
    { id: 'coffee', label: 'Cafea Florar', amount: 2, sub: '+2 €', Icon: CoffeeIcon },
    { id: 'artisan', label: 'Apreciere Artizan', amount: 4, sub: '+4 €', Icon: RoseIcon },
    { id: 'royal', label: 'Gratitudine Regală', amount: 7, sub: '+7 €', Icon: CrownIcon },
    { id: 'custom', label: 'Altă Sumă', amount: 0, sub: 'Personalizat', Icon: Edit3 },
  ] : [
    { id: 'none', label: 'Fără bacșiș', amount: 0, sub: '0 RON', Icon: null },
    { id: 'coffee', label: 'Cafea Florar', amount: 10, sub: '+10 RON', Icon: CoffeeIcon },
    { id: 'artisan', label: 'Apreciere Artizan', amount: 20, sub: '+20 RON', Icon: RoseIcon },
    { id: 'royal', label: 'Gratitudine Regală', amount: 35, sub: '+35 RON', Icon: CrownIcon },
    { id: 'custom', label: 'Altă Sumă', amount: 0, sub: 'Personalizat', Icon: Edit3 },
  ];

  const handleSelectTip = (tip) => {
    setSelectedTipId(tip.id);
    if (tip.id === 'custom') {
      const val = Number(customTipInput) || 0;
      setTipAmount(val);
    } else {
      setTipAmount(tip.amount);
      if (tip.amount > 0) {
        playLuxuryChime();
      }
    }
  };

  const handleCustomTipChange = (e) => {
    const val = Number(e.target.value) || 0;
    setCustomTipInput(e.target.value);
    setTipAmount(val);
  };

  // Calculate Live ETA Arrival Window (Task 33)
  const calculateETA = () => {
    const zone = zoneInfo;
    if (zone.id === 'national') {
      return {
        window: 'Următoarea zi lucrătoare (09:00 - 12:00)',
        traffic: 'Traseu Național Securizat',
        vehicle: 'Transport Special Climatizat Anti-Șoc',
        isExpress: false
      };
    }

    const now = new Date();
    const currentHour = now.getHours();

    if (deliveryType === 'express_today') {
      if (currentHour >= 9 && currentHour < 20) {
        const departureTime = new Date(now.getTime() + 30 * 60000);
        const arrivalStart = new Date(departureTime.getTime() + zone.transitMin * 60000);
        const arrivalEnd = new Date(arrivalStart.getTime() + 35 * 60000);

        const formatTime = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        return {
          window: `${formatTime(arrivalStart)} – ${formatTime(arrivalEnd)}`,
          traffic: `Trafic Fluid pe Traseu (~${zone.transitMin} min)`,
          vehicle: 'Mașină Climatizată Atelier (18°C constant)',
          isExpress: true
        };
      } else {
        return {
          window: 'Azi / Mâine Dimineață (10:00 – 11:30)',
          traffic: 'Pregătire Matinală Prioritară',
          vehicle: 'Mașină Climatizată Atelier (18°C constant)',
          isExpress: true
        };
      }
    } else {
      const slotParts = timeSlot.split(' - ');
      const slotStart = slotParts[0] || '14:00';
      return {
        window: `${deliveryDate || 'Data aleasă'} • Interval ${timeSlot} (Estimare vârf: ${slotStart})`,
        traffic: 'Curier Dedicat Rezervat',
        vehicle: 'Mașină Climatizată Atelier (18°C constant)',
        isExpress: false
      };
    }
  };

  const etaInfo = calculateETA();

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedAddonsDetails = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean);

    const hasRibbonAddon = selectedAddons.includes('panglica-caligrafica');
    const hasVelvetBoxAddon = selectedAddons.includes('cutie-catifea-gravata');

    const orderData = {
      orderId: `SD-${Date.now().toString().slice(-6)}`,
      bouquet: currentBouquet.name,
      color: selectedColor,
      addons: selectedAddonsDetails,
      ribbonDetails: hasRibbonAddon ? {
        text: ribbonConfig.text,
        fabric: ribbonConfig.fabricName || 'Noir Onyx Satin',
        foil: ribbonConfig.foilName || 'Folie Aur 24K Lucios'
      } : null,
      velvetBoxDetails: hasVelvetBoxAddon ? {
        shape: boxConfig.shapeName || 'Cutie Rotundă Grand Hatbox',
        color: boxConfig.colorName || 'Catifea Bordeaux Imperial',
        metal: boxConfig.metalName || 'Alamă Aurită Șlefuită (24K Gold)',
        line1: boxConfig.line1,
        line2: boxConfig.line2,
        line3: boxConfig.line3
      } : null,
      deliveryType: deliveryType === 'express_today' ? 'Express Azi (2-4h)' : 'Programat în Avans',
      deliveryZone: zoneInfo.name,
      deliveryETA: etaInfo.window,
      notifyOnMorning,
      date: deliveryDate,
      timeSlot,
      isSecretDelivery,
      secretDeliveryDetails: isSecretDelivery ? {
        isAnonymous: true,
        hint: secretHint,
        safeguard: 'AWB Fără Nume Expeditor • Livrare 100% Confidențială'
      } : null,
      videoQrDetails: videoQrEnabled ? {
        url: videoQrUrl,
        usePin: videoQrUsePin,
        pin: videoQrPin,
        cardTheme,
        platform: getVideoPlatform(videoQrUrl).name
      } : null,
      fragrance: selectedFragrance?.name || 'Trandafir Damascen & Bujor Imperial',
      senderName,
      senderPhone,
      recipientName: recipientName || senderName,
      recipientAddress,
      cardMessage: cardMessage || 'Fără mesaj scris',
      deliveryFee: formatPrice(deliveryFee),
      tipAmount: Number(tipAmount || 0),
      tipFormatted: tipAmount > 0 ? formatPrice(tipAmount) : null,
      total: formatPrice(finalTotal),
      timestamp: new Date().toISOString()
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem('stardust_orders') || '[]');
    orders.unshift(orderData);
    localStorage.setItem('stardust_orders', JSON.stringify(orders));

    // Save & dispatch lead către Webhook
    dispatchLead({
      name: senderName,
      phone: senderPhone,
      total: orderData.total,
      bouquet: orderData.bouquet,
      source: 'checkout_completion'
    });

    setPlacedOrderData(orderData);
    setOrderModalOpen(true);
    launchLuxuryConfetti();
  };

  const handleSendWhatsapp = () => {
    if (!placedOrderData) return;

    const waText = 
      `*COMANDĂ NOUĂ STARDUST FLORALS (#${placedOrderData.orderId})*\n\n` +
      `• Buchet: ${placedOrderData.bouquet}\n` +
      `• Culoare: ${placedOrderData.color}\n` +
      (placedOrderData.fragrance ? `• Parfum Ambalaj Atelier: ${placedOrderData.fragrance}\n` : '') +
      (placedOrderData.addons.length > 0 ? `• Cadouri extra: ${placedOrderData.addons.join(', ')}\n` : '') +
      (placedOrderData.velvetBoxDetails ? `• Cutie Catifea + Plăcuță Gravată Laser: "${placedOrderData.velvetBoxDetails.line1} • ${placedOrderData.velvetBoxDetails.line2}" (${placedOrderData.velvetBoxDetails.color}, ${placedOrderData.velvetBoxDetails.metal})\n` : '') +
      (placedOrderData.ribbonDetails ? `• Panglică Satinată Caligrafiată Auriu 24K: "${placedOrderData.ribbonDetails.text}" (${placedOrderData.ribbonDetails.fabric}, ${placedOrderData.ribbonDetails.foil})\n` : '') +
      `• Mod livrare: ${placedOrderData.deliveryType}\n` +
      `• Zonă & Rută: ${placedOrderData.deliveryZone}\n` +
      `• Fereastră Sosire Estimată (ETA): ${placedOrderData.deliveryETA}\n` +
      `• Dată & Interval: ${placedOrderData.date} (${placedOrderData.timeSlot})\n` +
      (placedOrderData.notifyOnMorning ? `• Confirmare Foto WhatsApp Înainte de Plecare: DA\n` : '') +
      (placedOrderData.isSecretDelivery ? `• LIVRARE SURPRIZĂ ANONIMĂ: DA (Indiciu: "${placedOrderData.secretDeliveryDetails?.hint || 'De la un admirator secret'}")\n` : '') +
      (placedOrderData.videoQrDetails ? `• FELICITARE COD QR VIDEO: ${placedOrderData.videoQrDetails.url} ${placedOrderData.videoQrDetails.usePin ? `(Cod PIN: ${placedOrderData.videoQrDetails.pin})` : '(Fără PIN)'}\n` : '') +
      (placedOrderData.tipAmount > 0 ? `• Bacșiș Meșteșugar Florar: ${formatPrice(placedOrderData.tipAmount)} (Apreciere meșteșug manual!)\n` : '') +
      `• Mesaj Felicitare Text:\n"${placedOrderData.cardMessage}"\n\n` +
      `• Total de Plată: ${placedOrderData.total} (Livrare: ${placedOrderData.deliveryFee})\n\n` +
      `• Expeditor: ${placedOrderData.senderName} (${placedOrderData.senderPhone})\n` +
      `• Destinatar & Adresă: ${placedOrderData.recipientName} — ${placedOrderData.recipientAddress}`;

    window.open(`https://wa.me/40733814871?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section style={{ padding: '50px 0 30px', background: 'radial-gradient(circle at 50% 20%, rgba(225, 29, 72, 0.08), transparent 70%)', textAlign: 'center' }}>
        <div className="container">
          <span className="tag-badge">CHECKOUT RAPID & SECURIZAT</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', margin: '14px 0 12px' }}>
            Finalizează <span className="highlight-rose">Comanda Ta Magică</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Completează datele de livrare. Pregătim buchetul manual și îl livrăm cu maximă discreție și eleganță.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <div className="container" style={{ maxWidth: '1060px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '36px', alignItems: 'start' }}>
          {/* Left Column: Form Fields */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* Step 1: Bouquet & Color */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>1</span>
                <h3 style={{ fontSize: '1.3rem' }}>Aranjament & Culoare</h3>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label htmlFor="select-bouquet" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Buchet Selectat</label>
                <select 
                  id="select-bouquet"
                  name="bouquetId"
                  value={selectedBouquetId}
                  onChange={(e) => setSelectedBouquetId(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', background: 'var(--bg-card)', outline: 'none', fontWeight: 600, color: 'var(--text-main)' }}
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.rosesCount} trandafiri) — {formatPrice(p.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Nuanță Trandafiri & Sclipici</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {COLOR_OPTIONS.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSelectedColor(col.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: selectedColor === col.name ? '2px solid var(--rose-600)' : '1px solid var(--border-light)',
                        background: selectedColor === col.name ? 'var(--rose-50)' : 'var(--bg-surface)',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.84rem',
                        fontWeight: 600
                      }}
                    >
                      <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: col.hex, border: '1px solid #ccc', flexShrink: 0 }} />
                      <span>{col.name.split('+')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Micro-LED Included Perk & Simulator Launcher (Task 53) */}
              <div 
                id="checkout-micro-led-banner"
                style={{
                  marginTop: '18px',
                  background: 'linear-gradient(135deg, rgba(28, 6, 20, 0.95), rgba(12, 2, 8, 0.98))',
                  border: '1.5px solid rgba(245, 158, 11, 0.45)',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  flexWrap: 'wrap',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #b45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 14px rgba(245, 158, 11, 0.5)' }}>
                    <FairyLightsIcon size={20} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fef08a' }}>Ghirlandă Micro-LED Inclusă Gratuit</span>
                      <span style={{ fontSize: '0.7rem', background: '#059669', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>CADOU</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#fda4af', margin: '3px 0 0', lineHeight: 1.35 }}>
                      16 micro-LED-uri pe fir invizibil cu 3 moduri de strălucire (licurici, pulsare, static).
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-checkout-test-led-simulator"
                  onClick={onOpenLedSimulator || (() => window.dispatchEvent(new CustomEvent('open-micro-led-simulator')))}
                  className="btn btn-gold btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                  title="Deschide simulatorul de luminițe în atelier"
                >
                  <Eye size={14} />
                  <span>Testează Efectul Noaptea</span>
                </button>
              </div>
            </div>

            {/* Step 2: Extras / Add-ons */}
            <div style={{ marginBottom: '32px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>2</span>
                <h3 style={{ fontSize: '1.3rem' }}>Cadouri Suplimentare (Opțional)</h3>
              </div>

              {/* Bundle Discount Incentive Banner */}
              <div style={{ background: selectedAddons.length >= 2 ? '#ecfdf5' : '#fff1f2', border: `1px solid ${selectedAddons.length >= 2 ? '#a7f3d0' : '#fecdd3'}`, borderRadius: '12px', padding: '10px 14px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SparkleIcon size={18} color={selectedAddons.length >= 2 ? '#059669' : '#e11d48'} />
                  <span>
                    {selectedAddons.length >= 2 ? (
                      <strong style={{ color: '#047857' }}>
                        Pachet Cadou VIP activat! Economisești {formatPrice(bundleDiscount)}!
                      </strong>
                    ) : (
                      <span style={{ color: '#9f1239' }}>
                        Adaugă <strong>{2 - selectedAddons.length} cadou{selectedAddons.length === 1 ? '' : 'uri'}</strong> pentru o reducere automată de 15 RON!
                      </span>
                    )}
                  </span>
                </div>
                {selectedAddons.length >= 2 && (
                  <span style={{ background: '#059669', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '0.74rem', fontWeight: 800 }}>
                    -{formatPrice(bundleDiscount)}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const isRibbon = addon.id === 'panglica-caligrafica';
                  const isVelvetBox = addon.id === 'cutie-catifea-gravata';
                  const isGourmet = addon.id === 'pachet-gourmet-moet-capsuni';
                  const isAudioEngraving = addon.id === 'gravura-audio-spectrograma';
                  const isPopUpCard = addon.id === 'felicitare-popup-3d-petale';
                  const isMusicBox = addon.id === 'cutie-muzicala-mecanica';
                  const isUnboxing = addon.id === 'royal-unboxing-experience';
                  const isLaserPetal = addon.id === 'gravura-laser-petala';
                  const isCareKit = addon.id === 'kit-ingrijire-longevitate';
                  const isAromaMedallion = addon.id === 'medalion-ceramic-parfum';
                  const isHoloCard = addon.id === 'felicitare-holografica-3d';
                  const isSecretDrawer = addon.id === 'cutie-secret-sertar-glisant';
                  const isSmokeCascade = addon.id === 'efect-fum-cascada-dry-ice';
                  const isCosmicLocket = addon.id === 'pandantiv-capsula-diamant-cosmic';
                  let displayPrice = addon.price;
                  if (isCosmicLocket && cosmicLocketConfig && cosmicLocketConfig.totalPrice !== undefined) {
                    displayPrice = cosmicLocketConfig.totalPrice;
                  } else if (isSmokeCascade && smokeCascadeConfig && smokeCascadeConfig.totalPrice !== undefined) {
                    displayPrice = smokeCascadeConfig.totalPrice;
                  } else if (isSecretDrawer && secretDrawerConfig && secretDrawerConfig.totalPrice !== undefined) {
                    displayPrice = secretDrawerConfig.totalPrice;
                  } else if (isHoloCard && holoCardConfig && holoCardConfig.totalPrice !== undefined) {
                    displayPrice = holoCardConfig.totalPrice;
                  } else if (isAromaMedallion && aromaMedallionConfig && aromaMedallionConfig.totalPrice !== undefined) {
                    displayPrice = aromaMedallionConfig.totalPrice;
                  } else if (isCareKit && careKitConfig && careKitConfig.totalPrice !== undefined) {
                    displayPrice = careKitConfig.totalPrice;
                  } else if (isLaserPetal && petalLaserConfig && petalLaserConfig.totalPrice !== undefined) {
                    displayPrice = petalLaserConfig.totalPrice;
                  } else if (isGourmet && gourmetConfig && gourmetConfig.totalPrice !== undefined) {
                    displayPrice = gourmetConfig.totalPrice;
                  } else if (isAudioEngraving && audioEngravingConfig && audioEngravingConfig.totalPrice !== undefined) {
                    displayPrice = audioEngravingConfig.totalPrice;
                  } else if (isPopUpCard && popUpCardConfig && popUpCardConfig.totalPrice !== undefined) {
                    displayPrice = popUpCardConfig.totalPrice;
                  } else if (isMusicBox && musicBoxConfig && musicBoxConfig.totalPrice !== undefined) {
                    displayPrice = musicBoxConfig.totalPrice;
                  } else if (isUnboxing && unboxingConfig && unboxingConfig.totalPrice !== undefined) {
                    displayPrice = unboxingConfig.totalPrice;
                  }

                  return (
                    <div key={addon.id}>
                      <label 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          padding: '12px 16px', 
                          borderRadius: '12px', 
                          border: isChecked ? '1.5px solid var(--rose-600)' : '1px solid var(--border-light)',
                          background: isChecked ? 'var(--rose-50)' : 'var(--bg-surface)',
                          color: 'var(--text-main)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input 
                            type="checkbox" 
                            id={`checkbox-addon-${addon.id}`}
                            checked={isChecked} 
                            onChange={() => {
                              handleToggleAddon(addon.id);
                              if (!isChecked && isRibbon) {
                                setShowRibbonDrawer(true);
                              }
                              if (!isChecked && isVelvetBox) {
                                setShowBoxDrawer(true);
                              }
                              if (!isChecked && isGourmet) {
                                setShowGourmetDrawer(true);
                              }
                              if (!isChecked && isAudioEngraving) {
                                setShowAudioEngravingDrawer(true);
                              }
                              if (!isChecked && isPopUpCard) {
                                setShowPopUpCardDrawer(true);
                              }
                              if (!isChecked && isMusicBox) {
                                setShowMusicBoxDrawer(true);
                              }
                              if (!isChecked && isUnboxing) {
                                setShowUnboxingDrawer(true);
                              }
                              if (!isChecked && isLaserPetal) {
                                setShowPetalLaserDrawer(true);
                              }
                              if (!isChecked && isCareKit) {
                                setShowCareKitDrawer(true);
                              }
                              if (!isChecked && isAromaMedallion) {
                                setShowAromaMedallionDrawer(true);
                              }
                              if (!isChecked && isHoloCard) {
                                setShowHoloCardDrawer(true);
                              }
                              if (!isChecked && isSecretDrawer) {
                                setShowSecretDrawerDrawer(true);
                              }
                              if (!isChecked && isSmokeCascade) {
                                setShowSmokeCascadeDrawer(true);
                              }
                              if (!isChecked && isCosmicLocket) {
                                setShowCosmicLocketDrawer(true);
                              }
                            }}
                            style={{ accentColor: '#e11d48', width: '16px', height: '16px' }}
                          />
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{addon.name}</span>
                            {isCosmicLocket && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fdf2f8', background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)', color: '#9f1239', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f43f5e', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <CosmicLocketIcon size={12} color="#9f1239" />
                                <span>BIJUTERIE SECRETĂ • PANDANTIV DIAMANT COSMIC</span>
                              </span>
                            )}
                            {isSmokeCascade && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fdf2f8', background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)', color: '#9f1239', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f43f5e', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <SmokeCascadeIcon size={12} color="#9f1239" />
                                <span>EFECT TEATRAL • VAPORI RECI CASCADE</span>
                              </span>
                            )}
                            {isSecretDrawer && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fdf2f8', background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)', color: '#9f1239', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f43f5e', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <SecretDrawerIcon size={12} color="#9f1239" />
                                <span>CUTIE SECRETĂ • SERTAR GLISANT BIJUTERIE</span>
                              </span>
                            )}
                            {isHoloCard && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#faf5ff', background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', color: '#7e22ce', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #c084fc', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <HolographicPrismIcon size={12} color="#7e22ce" />
                                <span>FELICITARE HOLOGRAFICĂ 3D • FOLIE LENTICULARĂ</span>
                              </span>
                            )}
                            {isAromaMedallion && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#f0f9ff', background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', color: '#0369a1', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #0284c7', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <CeramicMedallionIcon size={12} color="#0284c7" />
                                <span>MEDALION CERAMIC • PARFUM 30 ZILE</span>
                              </span>
                            )}
                            {isCareKit && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#ecfdf5', background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', color: '#065f46', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #10b981', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <FlowerCareKitIcon size={12} color="#065f46" />
                                <span>KIT ÎNGRIJIRE & NUTRIENȚI 14+ ZILE</span>
                              </span>
                            )}
                            {isLaserPetal && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fdf2f8', background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)', color: '#9f1239', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f43f5e', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <LaserPetalEngraverIcon size={12} color="#9f1239" />
                                <span>GRAVURĂ LASER PE PETALĂ</span>
                              </span>
                            )}
                            {isUnboxing && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fdf2f8', background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)', color: '#9f1239', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f43f5e', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <UnboxingVaultIcon size={12} color="#9f1239" />
                                <span>UNBOXING REGAL 3D</span>
                              </span>
                            )}
                            {isMusicBox && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fef3c7', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#92400e', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f59e0b', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <MusicBoxCrankIcon size={12} color="#92400e" />
                                <span>CUTIE MUZICALĂ VINTAGE</span>
                              </span>
                            )}
                            {isGourmet && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fdf2f8', background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)', color: '#9d174d', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f472b6', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <StrawberryGoldIcon size={12} color="#9d174d" />
                                <span>MOËT & AUR 24K</span>
                              </span>
                            )}
                            {isAudioEngraving && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fef3c7', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#92400e', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f59e0b', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <AudioWaveformIcon size={12} color="#92400e" />
                                <span>SPECTROGRAMĂ 24K</span>
                              </span>
                            )}
                            {isPopUpCard && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fdf2f8', background: 'linear-gradient(135deg, #fdf2f8, #fbcfe8)', color: '#9f1239', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f43f5e', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <PopUpGreetingCardIcon size={12} color="#9f1239" />
                                <span>POP-UP 3D & PETALE</span>
                              </span>
                            )}
                            {isRibbon && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fef08a', background: 'linear-gradient(135deg, #fef08a, #fde047)', color: '#854d0e', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #facc15', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <CrownIcon size={12} color="#854d0e" />
                                <span>RECOMANDAT ATELIER</span>
                              </span>
                            )}
                            {isVelvetBox && (
                              <span style={{ fontSize: '0.72rem', backgroundColor: '#fbcfe8', background: 'linear-gradient(135deg, #fbcfe8, #fda4af)', color: '#881337', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, border: '1px solid #f472b6', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <DiamondIcon size={12} color="#881337" />
                                <span>AMBALAJ REGAL VIP</span>
                              </span>
                            )}
                          </div>
                        </div>
                        <strong style={{ color: 'var(--rose-600)', fontSize: '0.95rem' }}>+{formatPrice(displayPrice)}</strong>
                      </label>

                      {/* Gourmet Champagne & 24K Gold Strawberries Configuration Display */}
                      {isGourmet && isChecked && (
                        <div 
                          id="checkout-gourmet-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #2b0416 0%, #0e0108 100%)',
                            border: '1.5px solid rgba(225, 29, 72, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showGourmetDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fef08a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <ChampagneFlutesIcon size={14} color="#fef08a" />
                                <span>PACHET GOURMET HAUTE COUTURE:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fbcfe8', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {gourmetConfig?.champagne?.name || 'Moët & Chandon Rosé'} + {gourmetConfig?.strawberries?.pieces || 12} Căpșuni cu Aur 24K
                              </div>
                              {gourmetConfig?.message && (
                                <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fef08a', marginTop: '2px' }}>
                                  Inscripție ciocolatier: „{gourmetConfig.message}”
                                </div>
                              )}
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                {gourmetConfig?.glaze?.name?.split(':')[0] || 'Duo Regal Callebaut'} • Pungă izotermă 4-8°C inclusă
                              </span>
                            </div>

                            <button
                              type="button"
                              id="btn-toggle-gourmet-customizer"
                              onClick={() => setShowGourmetDrawer(!showGourmetDrawer)}
                              className="btn btn-gold btn-sm"
                              style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              {showGourmetDrawer ? <span>Ascunde Simulatorul</span> : (
                                <>
                                  <Edit3 size={13} />
                                  <span>Personalizează Șampania & Căpșunile</span>
                                </>
                              )}
                            </button>
                          </div>

                          {showGourmetDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <GourmetChampagneStrawberriesSelector 
                                isEmbedded={true}
                                initialChampagne={gourmetConfig?.champagne?.id || 'moet-rose'}
                                initialStrawberries={gourmetConfig?.strawberries?.id || 'box-12'}
                                initialGlaze={gourmetConfig?.glaze?.id || 'duo-fondant-ruby'}
                                initialMessage={gourmetConfig?.message || 'Te iubesc'}
                                onApplyPackage={(data) => {
                                  setGourmetConfig(data);
                                  setShowGourmetDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Audio Waveform & 24K Gold Spectrogram Engraving Configuration Display */}
                      {isAudioEngraving && isChecked && (
                        <div 
                          id="checkout-audio-engraving-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #20111a 0%, #0a040b 100%)',
                            border: '1.5px solid rgba(245, 158, 11, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showAudioEngravingDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <AudioWaveformIcon size={14} color="#fbbf24" />
                                <span>GRAVURĂ ACUSTICĂ & SPECTROGRAMĂ AURIE 24K:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fef3c7', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {audioEngravingConfig?.stock?.name?.split('(')[0] || 'Carton Mat Noir Onyx'} • Monogramă: „{audioEngravingConfig?.initials || 'A & M'}”
                              </div>
                              {audioEngravingConfig?.subtitle && (
                                <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fde68a', marginTop: '2px' }}>
                                  Inscripție: „{audioEngravingConfig.subtitle}”
                                </div>
                              )}
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Durată: {audioEngravingConfig?.durationSeconds || 14}s audio • Cod QR scanabil de redare pe telefon inclus
                              </span>
                            </div>

                            <button
                              type="button"
                              id="btn-toggle-audio-engraving-customizer"
                              onClick={() => setShowAudioEngravingDrawer(!showAudioEngravingDrawer)}
                              className="btn btn-gold btn-sm"
                              style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              {showAudioEngravingDrawer ? <span>Ascunde Simulatorul</span> : (
                                <>
                                  <Edit3 size={13} />
                                  <span>Personalizează Unda Audio</span>
                                </>
                              )}
                            </button>
                          </div>

                          {showAudioEngravingDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <AudioWaveformEngravingSelector 
                                isEmbedded={true}
                                initialPaperStock={audioEngravingConfig?.stock?.id || 'noir-onyx'}
                                initialPresetId={audioEngravingConfig?.preset?.id || 'dragoste-eterna'}
                                initialInitials={audioEngravingConfig?.initials || 'A & M'}
                                initialSubtitle={audioEngravingConfig?.subtitle || 'Vocea mea este a ta pentru totdeauna'}
                                initialCustomMessage={audioEngravingConfig?.customText || ''}
                                onApplyEngraving={(data) => {
                                  setAudioEngravingConfig(data);
                                  setShowAudioEngravingDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* 3D Pop-Up Greeting Card & Cascading Petals Configuration Display */}
                      {isPopUpCard && isChecked && (
                        <div 
                          id="checkout-popup-card-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #290818 0%, #0c0208 100%)',
                            border: '1.5px solid rgba(244, 63, 94, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showPopUpCardDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <PopUpGreetingCardIcon size={14} color="#fda4af" />
                                <span>FELICITARE POP-UP 3D CU PETALE:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fbcfe8', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {popUpCardConfig?.sculpture?.name?.split('(')[0] || 'Trandafir Imperial 3D'} • {popUpCardConfig?.envelope?.name?.split('&')[0] || 'Plic Roșu Bordeaux'}
                              </div>
                              {popUpCardConfig?.recipient && (
                                <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fde68a', marginTop: '2px' }}>
                                  Pentru: „{popUpCardConfig.recipient}” • Semnătură: „{popUpCardConfig.sender || 'Andrei'}”
                                </div>
                              )}
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Sigiliu de ceară naturală inclus • Petale de trandafir și foiță de aur integrate în plic
                              </span>
                            </div>

                            <button
                              type="button"
                              id="btn-toggle-popup-card-customizer"
                              onClick={() => setShowPopUpCardDrawer(!showPopUpCardDrawer)}
                              className="btn btn-gold btn-sm"
                              style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              {showPopUpCardDrawer ? <span>Ascunde Simulatorul</span> : (
                                <>
                                  <Edit3 size={13} />
                                  <span>Personalizează Felicitarea 3D</span>
                                </>
                              )}
                            </button>
                          </div>

                          {showPopUpCardDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <PopUpCard3DSimulator 
                                isEmbedded={true}
                                initialSculpture={popUpCardConfig?.sculpture?.id || 'rose-sculpture'}
                                initialEnvelope={popUpCardConfig?.envelope?.id || 'bordeaux-wax'}
                                initialMessage={popUpCardConfig?.message || 'Pentru persoana care aduce magie în fiecare clipă din viața mea. Te iubesc din tot sufletul!'}
                                initialRecipient={popUpCardConfig?.recipient || 'Pentru Andreea'}
                                initialSender={popUpCardConfig?.sender || 'Cu dragoste eternă, Andrei'}
                                onApplyCard={(data) => {
                                  setPopUpCardConfig(data);
                                  setShowPopUpCardDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Vintage Mechanical Music Box Configuration Display */}
                      {isMusicBox && isChecked && (
                        <div 
                          id="checkout-music-box-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #261608 0%, #0d0803 100%)',
                            border: '1.5px solid rgba(245, 158, 11, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showMusicBoxDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fde047', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <MusicBoxCrankIcon size={14} color="#fde047" />
                                <span>CUTIE MUZICALĂ MECANICĂ VINTAGE:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fef3c7', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {musicBoxConfig?.melodyTitle || 'Édith Piaf — La Vie En Rose'} • {musicBoxConfig?.finishName?.split('(')[0] || 'Mecanism Elvețian'}
                              </div>
                              {musicBoxConfig?.engravedText && (
                                <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fde68a', marginTop: '2px' }}>
                                  Placă gravată: „{musicBoxConfig.engravedText}”
                                </div>
                              )}
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                {musicBoxConfig?.modeName || 'Senzor la ridicarea capacului'} • Cilindru alamă masivă 24K
                              </span>
                            </div>

                            <button
                              type="button"
                              id="btn-toggle-music-box-customizer"
                              onClick={() => setShowMusicBoxDrawer(!showMusicBoxDrawer)}
                              className="btn btn-gold btn-sm"
                              style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              {showMusicBoxDrawer ? <span>Ascunde Simulatorul</span> : (
                                <>
                                  <Edit3 size={13} />
                                  <span>Personalizează Melodia & Mecanismul</span>
                                </>
                              )}
                            </button>
                          </div>

                          {showMusicBoxDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <VintageMusicBoxConfigurator 
                                isEmbedded={true}
                                initialConfig={musicBoxConfig}
                                onSaveConfig={(data) => {
                                  setMusicBoxConfig(data);
                                  setShowMusicBoxDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Royal Unboxing Experience 4-Layer Configuration Display */}
                      {isUnboxing && isChecked && (
                        <div 
                          id="checkout-unboxing-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #1e0918 0%, #0c0209 100%)',
                            border: '1.5px solid rgba(225, 29, 72, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showUnboxingDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fbcfe8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <UnboxingVaultIcon size={14} color="#f43f5e" />
                                <span>EXPERIENȚĂ REGALĂ DE DESPACHETARE (4 STRATURI):</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fef3c7', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {unboxingConfig?.themeName || 'Noir Onyx & Aur 24K'} • {unboxingConfig?.bouquetName || 'Signature Dual Noir & Rouge'}
                              </div>
                              {unboxingConfig?.ribbonText && (
                                <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fbcfe8', marginTop: '2px' }}>
                                  Panglică brodată: „{unboxingConfig.ribbonText}”
                                </div>
                              )}
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Seif termo-controlat 18°C • Sigiliu cald ceară • Infuzie parfum: {unboxingConfig?.scentName || 'Trandafir Pur de Damasc'}
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                id="btn-checkout-launch-unboxing-modal"
                                onClick={() => {
                                  if (onOpenUnboxing) onOpenUnboxing();
                                  else window.dispatchEvent(new CustomEvent('open-royal-unboxing'));
                                }}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '6px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid #f43f5e' }}
                              >
                                <Eye size={13} color="#f43f5e" />
                                <span>Lansează Simulatorul 3D</span>
                              </button>

                              <button
                                type="button"
                                id="btn-toggle-unboxing-customizer"
                                onClick={() => setShowUnboxingDrawer(!showUnboxingDrawer)}
                                className="btn btn-gold btn-sm"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                {showUnboxingDrawer ? <span>Ascunde Configuratorul</span> : (
                                  <>
                                    <Edit3 size={13} />
                                    <span>Personalizează Pachetul Regal</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {showUnboxingDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <RoyalUnboxingSimulator 
                                isEmbedded={true}
                                initialConfig={unboxingConfig}
                                onApplyConfig={(data) => {
                                  setUnboxingConfig(data);
                                  setShowUnboxingDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Laser Petal Engraving Configuration Display */}
                      {isLaserPetal && isChecked && (
                        <div 
                          id="checkout-laser-engraver-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #1e0915 0%, #0a0208 100%)',
                            border: '1.5px solid rgba(225, 29, 72, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showPetalLaserDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fbcfe8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <LaserPetalEngraverIcon size={14} color="#f43f5e" />
                                <span>GRAVURĂ LASER PE PETALĂ NATURALĂ STABILIZATĂ:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fef3c7', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {petalLaserConfig?.foilName || 'Pulbere de Aur 24K Topită'} • {petalLaserConfig?.styleName || 'Caligrafie Regală Cursivă'}
                              </div>
                              {petalLaserConfig?.text && (
                                <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fb7185', marginTop: '2px' }}>
                                  Mesaj gravat pe petala centrală: „{petalLaserConfig.text}”
                                </div>
                              )}
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Culoare petală: {petalLaserConfig?.colorName || 'Rouge Impérial'} • Micro-laser 0.2W • Rezistență 3-5 ani
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                id="btn-checkout-launch-laser-modal"
                                onClick={onOpenPetalLaser || (() => window.dispatchEvent(new CustomEvent('open-petal-laser-engraver')))}
                                className="btn btn-secondary btn-sm"
                                style={{
                                  border: '1px solid rgba(225, 29, 72, 0.5)',
                                  color: '#fbcfe8',
                                  background: 'rgba(225, 29, 72, 0.15)',
                                  borderRadius: '10px',
                                  padding: '6px 12px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap !important'
                                }}
                              >
                                <Eye size={13} color="#f43f5e" />
                                <span>Lansează Simulatorul Laser</span>
                              </button>

                              <button
                                type="button"
                                id="btn-toggle-laser-engraver-customizer"
                                onClick={() => setShowPetalLaserDrawer(!showPetalLaserDrawer)}
                                className="btn btn-gold btn-sm"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap !important', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                {showPetalLaserDrawer ? <span>Ascunde Configuratorul</span> : (
                                  <>
                                    <Edit3 size={13} />
                                    <span>Personalizează Gravura Petalei</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {showPetalLaserDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <PetalLaserEngraver 
                                isEmbedded={true}
                                initialData={petalLaserConfig}
                                onApplyConfig={(data) => {
                                  setPetalLaserConfig(data);
                                  setShowPetalLaserDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Flower Care & Longevity Kit Configuration Display (Task 60) */}
                      {isCareKit && isChecked && (
                        <div 
                          id="checkout-care-kit-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #062817 0%, #021109 100%)',
                            border: '1.5px solid rgba(16, 185, 129, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showCareKitDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#6ee7b7', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <FlowerCareKitIcon size={14} color="#10b981" />
                                <span>KIT PROFESIONAL DE ÎNGRIJIRE & PRELUNGIRE VIAȚĂ:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#ecfdf5', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {careKitConfig?.kitName || 'Kit Nutrienți Chrysal & Ghid Longevitate'}
                              </div>
                              <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#a7f3d0', marginTop: '2px' }}>
                                Longevitate estimată: ~{careKitConfig?.predictedDays || 14} {careKitConfig?.flowerType === 'preserved' ? 'Ani' : 'Zile'} de prospețime garantată
                              </div>
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Tăiere 45° sub apă • 3x plicuri Chrysal Elite • Ghidul Maestrului Elena • Protecție sclipici
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                id="btn-checkout-launch-care-modal"
                                onClick={onOpenCareGuide || (() => window.dispatchEvent(new CustomEvent('open-care-guide-modal')))}
                                className="btn btn-secondary btn-sm"
                                style={{
                                  border: '1px solid rgba(16, 185, 129, 0.5)',
                                  color: '#a7f3d0',
                                  background: 'rgba(16, 185, 129, 0.15)',
                                  borderRadius: '10px',
                                  padding: '6px 12px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap !important'
                                }}
                              >
                                <Eye size={13} color="#10b981" />
                                <span>Lansează Ghidul Interactiv</span>
                              </button>

                              <button
                                type="button"
                                id="btn-toggle-care-kit-customizer"
                                onClick={() => setShowCareKitDrawer(!showCareKitDrawer)}
                                className="btn btn-gold btn-sm"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap !important', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                {showCareKitDrawer ? <span>Ascunde Configuratorul</span> : (
                                  <>
                                    <Edit3 size={13} />
                                    <span>Personalizează Kitul de Îngrijire</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {showCareKitDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <FlowerCareGuideWidget 
                                isEmbedded={true}
                                initialData={careKitConfig}
                                onApplyConfig={(data) => {
                                  setCareKitConfig(data);
                                  setShowCareKitDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Ceramic Aroma Diffuser Medallion Configuration Display (Task 61) */}
                      {isAromaMedallion && isChecked && (
                        <div 
                          id="checkout-aroma-medallion-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #082f49 0%, #031422 100%)',
                            border: '1.5px solid rgba(2, 132, 199, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(2, 132, 199, 0.25)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showAromaMedallionDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#7dd3fc', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <CeramicMedallionIcon size={14} color="#0284c7" />
                                <span>MEDALION CERAMIC POROS • DIFUZIE CONTINUĂ:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#f0f9ff', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {aromaMedallionConfig?.essenceName || 'Rosa Damascena de Grasse'}
                              </div>
                              <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#bae6fd', marginTop: '2px' }}>
                                Intensitate: {aromaMedallionConfig?.levelLabel || 'Boudoir Regal'} ({aromaMedallionConfig?.drops || 3} picături • rază {aromaMedallionConfig?.radius || '2.5 metri'})
                              </div>
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Ceramică de Limoges în baza cutiei • Include flacon sticlă ambrată 5ml cu pipetă
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                id="btn-checkout-launch-aroma-modal"
                                onClick={onOpenAromaMedallion || (() => window.dispatchEvent(new CustomEvent('open-ceramic-aroma-medallion')))}
                                className="btn btn-secondary btn-sm"
                                style={{
                                  border: '1px solid rgba(2, 132, 199, 0.5)',
                                  color: '#bae6fd',
                                  background: 'rgba(2, 132, 199, 0.15)',
                                  borderRadius: '10px',
                                  padding: '6px 12px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap !important'
                                }}
                              >
                                <Eye size={13} color="#38bdf8" />
                                <span>Lansează Simulatorul</span>
                              </button>

                              <button
                                type="button"
                                id="btn-toggle-aroma-medallion-customizer"
                                onClick={() => setShowAromaMedallionDrawer(!showAromaMedallionDrawer)}
                                className="btn btn-gold btn-sm"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap !important', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                {showAromaMedallionDrawer ? <span>Ascunde Simulatorul</span> : (
                                  <>
                                    <Edit3 size={13} />
                                    <span>Personalizează Difuzorul</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {showAromaMedallionDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <CeramicAromaDiffuserWidget 
                                isEmbedded={true}
                                initialData={aromaMedallionConfig}
                                onApplyConfig={(data) => {
                                  setAromaMedallionConfig(data);
                                  setShowAromaMedallionDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Holographic 3D Greeting Card Configuration Display (Task 62) */}
                      {isHoloCard && isChecked && (
                        <div 
                          id="checkout-holo-card-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #2e1065 0%, #0f051d 100%)',
                            border: '1.5px solid rgba(168, 85, 247, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(168, 85, 247, 0.25)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showHoloCardDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#d8b4fe', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <HolographicPrismIcon size={14} color="#c084fc" />
                                <span>FELICITARE HOLOGRAFICĂ 3D • ADÂNCIME OPTICĂ LENTICULARĂ:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#f5d0fe', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {holoCardConfig?.themeName || 'Constelația Iubirii'} • {holoCardConfig?.foilName || 'Curcubeu Prismatic'}
                              </div>
                              <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#e9d5ff', marginTop: '2px' }}>
                                Dedicație: „{holoCardConfig?.customDedication || 'Pentru sufletul meu drag'}” ({holoCardConfig?.recipientName || 'Elena'})
                              </div>
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Folie lenticulară 70 LPI cu efect prismatic • Monogramă aurită {holoCardConfig?.senderName || 'Andrei'} • Plic sidefat
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                id="btn-checkout-launch-holo-modal"
                                onClick={onOpenHoloCard || (() => window.dispatchEvent(new CustomEvent('open-holographic-card-modal')))}
                                className="btn btn-secondary btn-sm"
                                style={{
                                  border: '1px solid rgba(168, 85, 247, 0.5)',
                                  color: '#e9d5ff',
                                  background: 'rgba(168, 85, 247, 0.15)',
                                  borderRadius: '10px',
                                  padding: '6px 12px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap !important'
                                }}
                              >
                                <Eye size={13} color="#c084fc" />
                                <span>Lansează Simulatorul</span>
                              </button>

                              <button
                                type="button"
                                id="btn-toggle-holo-card-customizer"
                                onClick={() => setShowHoloCardDrawer(!showHoloCardDrawer)}
                                className="btn btn-gold btn-sm"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap !important', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                {showHoloCardDrawer ? <span>Ascunde Simulatorul</span> : (
                                  <>
                                    <Edit3 size={13} />
                                    <span>Personalizează Felicitarea</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {showHoloCardDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <HolographicCard3DSimulator 
                                isEmbedded={true}
                                initialData={holoCardConfig}
                                onApplyConfig={(data) => {
                                  setHoloCardConfig(data);
                                  setShowHoloCardDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Secret Sliding Drawer Box Configuration Display (Task 63) */}
                      {isSecretDrawer && isChecked && (
                        <div 
                          id="checkout-secret-drawer-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #290818 0%, #0c0208 100%)',
                            border: '1.5px solid rgba(244, 63, 94, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(244, 63, 94, 0.25)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showSecretDrawerDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <SecretDrawerIcon size={14} color="#f43f5e" />
                                <span>CUTIE SECRETĂ DUBLU-COMPARTIMENT • SERTAR GLISANT:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fbcfe8', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {secretDrawerConfig?.contentName?.split('(')[0] || 'Slot Inel de Logodnă'} • {secretDrawerConfig?.velvetName || 'Catifea Bordeaux Impérial'}
                              </div>
                              <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fde68a', marginTop: '2px' }}>
                                Plăcuță interioară: „{secretDrawerConfig?.secretMessage || 'Vrei să fii soția mea?'}” • [{secretDrawerConfig?.monogramInitials || 'A & E'}]
                              </div>
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Mecanism pe ghidaj dublu de catifea • Zăvor magnetic invizibil • Trăgaci: {secretDrawerConfig?.handleName || 'Buton Alamă Aurită 24K'}
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                id="btn-checkout-launch-secret-drawer-modal"
                                onClick={onOpenSecretDrawer || (() => window.dispatchEvent(new CustomEvent('open-secret-drawer-modal')))}
                                className="btn btn-secondary btn-sm"
                                style={{
                                  border: '1px solid rgba(244, 63, 94, 0.5)',
                                  color: '#fda4af',
                                  background: 'rgba(244, 63, 94, 0.15)',
                                  borderRadius: '10px',
                                  padding: '6px 12px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap !important'
                                }}
                              >
                                <Eye size={13} color="#f43f5e" />
                                <span>Lansează Simulatorul</span>
                              </button>

                              <button
                                type="button"
                                id="btn-toggle-secret-drawer-customizer"
                                onClick={() => setShowSecretDrawerDrawer(!showSecretDrawerDrawer)}
                                className="btn btn-gold btn-sm"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap !important', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                {showSecretDrawerDrawer ? <span>Ascunde Simulatorul</span> : (
                                  <>
                                    <Edit3 size={13} />
                                    <span>Personalizează Sertarul</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {showSecretDrawerDrawer && (
                            <div 
                              id="checkout-secret-drawer-customizer-drawer"
                              style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}
                            >
                              <SecretDrawerBoxWidget 
                                isEmbedded={true}
                                initialData={secretDrawerConfig}
                                onApplyConfig={(data) => {
                                  setSecretDrawerConfig(data);
                                  setShowSecretDrawerDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Smoke & Dry Ice Theatrical Cascade Configuration Display (Task 64) */}
                      {isSmokeCascade && isChecked && (
                        <div 
                          id="checkout-smoke-cascade-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #200818 0%, #0c0209 100%)',
                            border: '1.5px solid rgba(244, 63, 94, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(244, 63, 94, 0.25)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showSmokeCascadeDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <SmokeCascadeIcon size={14} color="#f43f5e" />
                                <span>EFECT TEATRAL SCENIC • VAPORI RECI DRY ICE:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fbcfe8', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {smokeCascadeConfig?.lightingName?.split('(')[0] || 'Aura Albă Regală'} • {smokeCascadeConfig?.aromaName?.split('(')[0] || 'Apă de Trandafiri'}
                              </div>
                              <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fde68a', marginTop: '2px' }}>
                                Declanșare: {smokeCascadeConfig?.triggerName?.split('(')[0] || 'Automat la Ridicarea Capacului'} • {smokeCascadeConfig?.durationName?.split('(')[0] || '45 secunde flux'}
                              </div>
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Compartiment termo-secundar criogenic • Sigur pentru flori și interior • Experiență WOW garantată
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                id="btn-checkout-launch-smoke-modal"
                                onClick={onOpenSmokeCascade || (() => window.dispatchEvent(new CustomEvent('open-smoke-cascade-modal')))}
                                className="btn btn-secondary btn-sm"
                                style={{
                                  border: '1px solid rgba(244, 63, 94, 0.5)',
                                  color: '#fda4af',
                                  background: 'rgba(244, 63, 94, 0.15)',
                                  borderRadius: '10px',
                                  padding: '6px 12px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap !important'
                                }}
                              >
                                <Eye size={13} color="#f43f5e" />
                                <span>Lansează Simulatorul</span>
                              </button>

                              <button
                                type="button"
                                id="btn-toggle-smoke-cascade-customizer"
                                onClick={() => setShowSmokeCascadeDrawer(!showSmokeCascadeDrawer)}
                                className="btn btn-gold btn-sm"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap !important', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                {showSmokeCascadeDrawer ? <span>Ascunde Simulatorul</span> : (
                                  <>
                                    <Edit3 size={13} />
                                    <span>Personalizează Cascada</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {showSmokeCascadeDrawer && (
                            <div 
                              id="checkout-smoke-cascade-customizer-drawer"
                              style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}
                            >
                              <SmokeCascadeSimulator 
                                isEmbedded={true}
                                initialData={smokeCascadeConfig}
                                onApplyConfig={(data) => {
                                  setSmokeCascadeConfig(data);
                                  setShowSmokeCascadeDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Cosmic Locket Secret Capsule Configuration Display (Task 65) */}
                      {isCosmicLocket && isChecked && (
                        <div 
                          id="checkout-cosmic-locket-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #250920 0%, #0d020c 100%)',
                            border: '1.5px solid rgba(244, 63, 94, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(244, 63, 94, 0.25)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showCosmicLocketDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <CosmicLocketIcon size={14} color="#f43f5e" />
                                <span>BIJUTERIE SECRETĂ • PANDANTIV CU DIAMANT COSMIC:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', color: '#fbcfe8', marginTop: '4px', letterSpacing: '0.5px' }}>
                                {cosmicLocketConfig?.metalName?.split('(')[0] || 'Titan & Aur Roz 18K'} • {cosmicLocketConfig?.dustName?.split('(')[0] || 'Pulbere Diamant Alb Pur'}
                              </div>
                              <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fde68a', marginTop: '2px' }}>
                                Siluetă: {cosmicLocketConfig?.shapeName?.split('(')[0] || 'Picătură de Rouă Cosmică'} • Gravură: „{cosmicLocketConfig?.secretMessage || 'Ești Universul Meu Etern'}”
                              </div>
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                Închidere filet hermetic • Cristal safir 9 Mohs • Include lupă de bijutier 30x pliabilă cadou
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                id="btn-checkout-launch-locket-modal"
                                onClick={onOpenCosmicLocket || (() => window.dispatchEvent(new CustomEvent('open-cosmic-locket-modal')))}
                                className="btn btn-secondary btn-sm"
                                style={{
                                  border: '1px solid rgba(244, 63, 94, 0.5)',
                                  color: '#fda4af',
                                  background: 'rgba(244, 63, 94, 0.15)',
                                  borderRadius: '10px',
                                  padding: '6px 12px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap !important'
                                }}
                              >
                                <Eye size={13} color="#f43f5e" />
                                <span>Lansează Simulatorul</span>
                              </button>

                              <button
                                type="button"
                                id="btn-toggle-cosmic-locket-customizer"
                                onClick={() => setShowCosmicLocketDrawer(!showCosmicLocketDrawer)}
                                className="btn btn-gold btn-sm"
                                style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap !important', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                              >
                                {showCosmicLocketDrawer ? <span>Ascunde Simulatorul</span> : (
                                  <>
                                    <Edit3 size={13} />
                                    <span>Personalizează Pandantivul</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {showCosmicLocketDrawer && (
                            <div 
                              id="checkout-cosmic-locket-customizer-drawer"
                              style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}
                            >
                              <CosmicLocketSimulator 
                                isEmbedded={true}
                                initialData={cosmicLocketConfig}
                                onApplyConfig={(data) => {
                                  setCosmicLocketConfig(data);
                                  setShowCosmicLocketDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Custom Velvet Box & Engraved Metal Plaque Configuration Display */}
                      {isVelvetBox && isChecked && (
                        <div 
                          id="checkout-box-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'radial-gradient(circle at 50% 0%, #200812 0%, #0c0205 100%)',
                            border: '1.5px solid rgba(245, 158, 11, 0.45)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showBoxDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fde047', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <CrownIcon size={14} color="#fde047" />
                                <span>CUTIE DE CATIFEA + PLĂCUȚĂ METALICĂ GRAVATĂ LASER:</span>
                              </div>
                              <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.1rem', color: '#fef08a', textShadow: '0 0 6px rgba(254, 240, 138, 0.6)', marginTop: '4px', letterSpacing: '1px' }}>
                                {boxConfig.line1} • {boxConfig.line2}
                              </div>
                              <div style={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#fbcfe8', marginTop: '2px' }}>
                                „{boxConfig.line3}”
                              </div>
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px', display: 'block' }}>
                                {boxConfig.shapeName} • {boxConfig.colorName} • {boxConfig.metalName}
                              </span>
                            </div>

                            <button
                              type="button"
                              id="btn-toggle-box-customizer"
                              onClick={() => setShowBoxDrawer(!showBoxDrawer)}
                              className="btn btn-gold btn-sm"
                              style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              {showBoxDrawer ? <span>Ascunde Simulatorul</span> : (
                                <>
                                  <Edit3 size={13} />
                                  <span>Personalizează Gravura Laser</span>
                                </>
                              )}
                            </button>
                          </div>

                          {showBoxDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <VelvetBoxEngravingCustomizer 
                                isEmbeddedInCheckout={true}
                                initialData={{
                                  shape: boxConfig.shapeId,
                                  color: boxConfig.colorId,
                                  metal: boxConfig.metalId,
                                  line1: boxConfig.line1,
                                  line2: boxConfig.line2,
                                  line3: boxConfig.line3
                                }}
                                onApplyConfig={(cfg) => {
                                  setBoxConfig({
                                    shapeId: cfg.shape.id,
                                    shapeName: cfg.shape.name,
                                    colorId: cfg.color.id,
                                    colorName: cfg.color.name,
                                    metalId: cfg.metal.id,
                                    metalName: cfg.metal.name,
                                    line1: cfg.line1,
                                    line2: cfg.line2,
                                    line3: cfg.line3
                                  });
                                  setShowBoxDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Custom Ribbon Interactive Drawer / Configuration Display */}
                      {isRibbon && isChecked && (
                        <div 
                          id="checkout-ribbon-preview-card"
                          style={{
                            marginTop: '8px',
                            background: 'linear-gradient(135deg, #1f0b12 0%, #110407 100%)',
                            border: '1.5px solid rgba(225, 29, 72, 0.4)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            color: '#ffffff',
                            boxShadow: '0 8px 24px rgba(225, 29, 72, 0.15)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: showRibbonDrawer ? '16px' : '0' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fbcfe8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <RibbonIcon size={14} color="#fbcfe8" />
                                <span>TEXT CALIGRAFIAT PE PANGLICĂ:</span>
                              </div>
                              <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.15rem', color: '#fef08a', textShadow: '0 0 6px rgba(254, 240, 138, 0.6)', marginTop: '4px' }}>
                                „{ribbonConfig.text}”
                              </div>
                              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px', display: 'block' }}>
                                Țesătură: <strong>{ribbonConfig.fabricName}</strong> • {ribbonConfig.foilName}
                              </span>
                            </div>

                            <button
                              type="button"
                              id="btn-toggle-ribbon-customizer"
                              onClick={() => setShowRibbonDrawer(!showRibbonDrawer)}
                              className="btn btn-gold btn-sm"
                              style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              {showRibbonDrawer ? <span>Ascunde Simulatorul</span> : (
                                <>
                                  <Edit3 size={13} />
                                  <span>Personalizează în Simulator Live</span>
                                </>
                              )}
                            </button>
                          </div>

                          {showRibbonDrawer && (
                            <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                              <CustomRibbonSimulator 
                                isEmbeddedInCheckout={true}
                                initialData={{
                                  text: ribbonConfig.text,
                                  fabric: ribbonConfig.fabricId,
                                  foil: ribbonConfig.foilId
                                }}
                                onApplyRibbon={(cfg) => {
                                  setRibbonConfig({
                                    text: cfg.text,
                                    fabricId: cfg.fabric.id,
                                    fabricName: cfg.fabric.name,
                                    foilId: cfg.foil.id,
                                    foilName: cfg.foil.name
                                  });
                                  setShowRibbonDrawer(false);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Complimentary Inclusion: Atelier Authenticity Certificate & Assigned Serial */}
              <div 
                id="checkout-certificate-perk-card"
                style={{
                  marginTop: '16px',
                  background: 'linear-gradient(135deg, #fefbf6 0%, #fffbf0 100%)',
                  border: '1.5px solid #d97706',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  color: '#451a03',
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.08)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <ScrollDiplomaIcon size={20} color="#b45309" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.74rem', background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, textTransform: 'uppercase' }}>
                          INCLUS GRATUIT ÎN COMANDĂ
                        </span>
                        <span style={{ fontSize: '0.74rem', color: '#047857', background: '#d1fae5', padding: '2px 8px', borderRadius: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} color="#059669" />
                          <span>Serie Unică Alocată</span>
                        </span>
                      </div>
                      <h4 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1rem', fontWeight: 800, color: '#78350f', margin: '4px 0 2px' }}>
                        Certificat Regal de Autenticitate & Sigiliu din Ceară
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: '#78350f', opacity: 0.9, margin: 0 }}>
                        Atestă originea florilor, aplicarea manuală a diamantului cosmetic și garanția de strălucire 3+ ani. Tipărit pe carton satinat 300g.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="btn-checkout-preview-cert"
                    onClick={() => {
                      const data = {
                        recipientName: recipientName || 'Persoana Iubită',
                        bouquetName: currentBouquet.name,
                        rosesCount: currentBouquet.rosesCount,
                        colorName: selectedColor
                      };
                      if (onOpenCertificateModal) onOpenCertificateModal(data);
                      else window.dispatchEvent(new CustomEvent('open-certificate-modal', { detail: data }));
                    }}
                    className="btn btn-gold btn-sm"
                    style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <ScrollDiplomaIcon size={14} color="#78350f" />
                    <span>Previzualizează Certificatul Tău</span>
                  </button>
                </div>
              </div>

              {/* Complimentary Inclusion: Atelier Floral Fragrance Infusion (Task 47) */}
              <div 
                id="checkout-fragrance-perk-card"
                style={{
                  marginTop: '12px',
                  background: 'linear-gradient(135deg, #fdf2f8 0%, #fff1f2 100%)',
                  border: '1.5px solid #ec4899',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  color: '#831843',
                  boxShadow: '0 4px 15px rgba(236, 72, 153, 0.08)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fce7f3', border: '1px solid #fbcfe8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <PerfumeBottleIcon size={20} color="#db2777" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.74rem', background: '#fce7f3', color: '#be185d', border: '1px solid #fbcfe8', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, textTransform: 'uppercase' }}>
                          INCLUS GRATUIT ÎN ATELIER
                        </span>
                        <span style={{ fontSize: '0.74rem', color: '#047857', background: '#d1fae5', padding: '2px 8px', borderRadius: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} color="#059669" />
                          <span>Infuzie Olfactivă Activă</span>
                        </span>
                      </div>
                      <h4 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1rem', fontWeight: 800, color: '#9d174d', margin: '4px 0 2px' }}>
                        Parfum de Nișă Pulverizat pe Ambalaj: {selectedFragrance.name}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: '#9d174d', opacity: 0.9, margin: 0 }}>
                        {selectedFragrance.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="btn-toggle-fragrance-drawer"
                    onClick={() => setShowFragranceDrawer(!showFragranceDrawer)}
                    className="btn btn-secondary btn-sm"
                    style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px', borderColor: '#ec4899', color: '#db2777' }}
                  >
                    <MistSprayIcon size={14} color="#db2777" />
                    <span>{showFragranceDrawer ? 'Ascunde Opțiuni Parfum' : 'Schimbă Parfumul Floral'}</span>
                  </button>
                </div>

                {showFragranceDrawer && (
                  <div style={{ marginTop: '16px', borderTop: '1px solid rgba(236, 72, 153, 0.25)', paddingTop: '16px' }}>
                    <FloralFragranceSelector
                      isEmbeddedInCheckout={true}
                      selectedId={selectedFragrance.id}
                      onSelectFragrance={(fragrance) => {
                        setSelectedFragrance(fragrance);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Complimentary Inclusion: Vintage Love Letter on Parchment with Royal Wax Seal (Task 51) */}
              <div 
                id="checkout-love-letter-perk-card"
                style={{
                  marginTop: '12px',
                  background: 'linear-gradient(135deg, #fefcf3 0%, #fbf3dc 100%)',
                  border: '1.5px solid #b45309',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  color: '#451a03',
                  boxShadow: '0 4px 15px rgba(180, 83, 9, 0.08)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <ParchmentScrollIcon size={20} color="#b45309" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.74rem', background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, textTransform: 'uppercase' }}>
                          ROMANTISM NOSTALGIC • INCLUS
                        </span>
                        <span style={{ fontSize: '0.74rem', color: '#047857', background: '#d1fae5', padding: '2px 8px', borderRadius: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <WaxSealStampIcon size={12} color="#059669" />
                          <span>Sigiliu Ceară Naturală</span>
                        </span>
                      </div>
                      <h4 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1rem', fontWeight: 800, color: '#78350f', margin: '4px 0 2px' }}>
                        Scrisoare de Dragoste pe Pergament cu Margini Arse
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: '#78350f', opacity: 0.9, margin: 0 }}>
                        Caligrafie de atelier pe suport texturat antic, sigilată manual cu ceară roșie rubinie sau aur 24K.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="btn-open-love-letter-modal"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-vintage-love-letter'))}
                    className="btn btn-gold btn-sm"
                    style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <QuillIcon size={14} color="#78350f" />
                    <span>Personalizează Scrisoarea & Sigiliul</span>
                  </button>
                </div>
              </div>

              {/* VIP Anniversary Reminder Integration: "Nu Mai Uita Niciodată Ziua Ei" (Task 52) */}
              <div 
                id="checkout-anniversary-reminder-card"
                style={{
                  marginTop: '12px',
                  background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
                  border: '1.5px solid #e11d48',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  color: '#881337',
                  boxShadow: '0 4px 15px rgba(225, 29, 72, 0.08)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffe4e6', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <CalendarHeartIcon size={20} color="#e11d48" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.74rem', background: '#ffe4e6', color: '#9f1239', border: '1px solid #fecdd3', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, textTransform: 'uppercase' }}>
                          SERVICIU VIP • RECURENȚĂ ANUALĂ
                        </span>
                        <span style={{ fontSize: '0.74rem', color: '#047857', background: '#d1fae5', padding: '2px 8px', borderRadius: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} color="#059669" />
                          <span>15% Reducere Garantată Anul Viitor</span>
                        </span>
                      </div>
                      <h4 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1rem', fontWeight: 800, color: '#881337', margin: '4px 0 2px' }}>
                        Calendar Aniversar „Nu Mai Uita Niciodată Ziua Ei”
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#9f1239', margin: 0, lineHeight: 1.45, maxWidth: '520px' }}>
                        Programează data specială o singură dată. Te contactăm discret pe WhatsApp cu 7 zile înainte, blocăm buchetul favorit în atelier și îți aplicăm codul <strong>ANIVERSARE15</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="btn-checkout-open-anniversary"
                    onClick={onOpenAnniversary || (() => window.dispatchEvent(new CustomEvent('open-anniversary-scheduler')))}
                    className="btn btn-primary btn-sm"
                    style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--rose-gradient)', color: '#ffffff' }}
                  >
                    <CalendarHeartIcon size={14} color="#ffffff" />
                    <span>Setează Reminder VIP</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Details & Dynamic ETA Clock (Task 33 & Task 36) */}
            <div style={{ marginBottom: '32px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>3</span>
                  <h3 style={{ fontSize: '1.3rem' }}>Programare & Calculator Oră Exactă (ETA)</h3>
                </div>
                <span style={{ fontSize: '0.74rem', background: '#dcfce7', color: '#15803d', padding: '3px 9px', borderRadius: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  Curier Dedicat Disponibil
                </span>
              </div>

              {/* Delivery Type Selector (Express Azi vs Programat) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <button
                  type="button"
                  id="btn-delivery-express"
                  onClick={() => {
                    setDeliveryType('express_today');
                    const today = new Date().toISOString().split('T')[0];
                    setDeliveryDate(today);
                  }}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    border: deliveryType === 'express_today' ? '2px solid var(--rose-600)' : '1px solid var(--border-light)',
                    background: deliveryType === 'express_today' ? 'var(--rose-50)' : 'var(--bg-surface)',
                    color: 'var(--text-main)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '0.92rem', color: deliveryType === 'express_today' ? 'var(--rose-600)' : 'inherit', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Zap size={14} color="var(--rose-600)" />
                      <span>Express Astăzi (2-4h)</span>
                    </strong>
                    <span style={{ fontSize: '0.68rem', background: 'var(--rose-600)', color: '#fff', padding: '2px 6px', borderRadius: '8px', fontWeight: 800 }}>
                      URGENȚĂ
                    </span>
                  </div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Pregătire prioritară la atelier & plecare imediată
                  </span>
                </button>

                <button
                  type="button"
                  id="btn-delivery-scheduled"
                  onClick={() => {
                    setDeliveryType('scheduled');
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDeliveryDate(tomorrow.toISOString().split('T')[0]);
                  }}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    border: deliveryType === 'scheduled' ? '2px solid var(--rose-600)' : '1px solid var(--border-light)',
                    background: deliveryType === 'scheduled' ? 'var(--rose-50)' : 'var(--bg-surface)',
                    color: 'var(--text-main)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '0.92rem', color: deliveryType === 'scheduled' ? 'var(--rose-600)' : 'inherit', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} color="#3b82f6" />
                      <span>Programat în Avans</span>
                    </strong>
                    <span style={{ fontSize: '0.68rem', background: '#3b82f6', color: '#fff', padding: '2px 6px', borderRadius: '8px', fontWeight: 800 }}>
                      EVENIMENT
                    </span>
                  </div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Aniversare, zi de naștere sau dată specială
                  </span>
                </button>
              </div>

              {/* Location Zone Selector */}
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="select-delivery-zone" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Alege Sectorul / Județul de Livrare (Pentru Calcul Rută & ETA)
                </label>
                <select
                  id="select-delivery-zone"
                  name="deliveryZone"
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-main)', fontSize: '0.92rem' }}
                >
                  {DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} — {zone.fee === 0 ? 'Livrare Gratuită' : `+${formatPrice(zone.fee)}`} ({zone.tag})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Live Courier ETA Arrival Clock Card (Task 33) */}
              <div 
                id="eta-clock-card"
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  marginBottom: '20px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block', boxShadow: '0 0 6px #16a34a' }} />
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--rose-600)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      CEAS SOSIRE CURIER (LIVE ETA)
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--rose-600)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <SnowflakeIcon size={12} color="var(--rose-600)" />
                    <span>Flotă Climatizată 18°C</span>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                  <Clock size={20} color="var(--rose-600)" style={{ transform: 'translateY(2px)' }} />
                  <strong style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {etaInfo.window}
                  </strong>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <LivePulseDot size={7} color="#16a34a" /> {etaInfo.traffic}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Truck size={13} /> {etaInfo.vehicle}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={13} color="#16a34a" /> Vas hidratant vertical anti-răsturnare
                  </span>
                </div>
              </div>

              {/* Climate-Controlled Transport Live Map & Telemetry Drawer (Task 50) */}
              <div
                id="checkout-climate-drawer-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  border: '1.5px solid rgba(56, 189, 248, 0.35)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  marginBottom: '20px',
                  color: '#ffffff',
                  boxShadow: '0 4px 18px rgba(56, 189, 248, 0.1)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ClimateVanIcon size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.74rem', background: '#38bdf8', color: '#0f172a', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
                          GARANȚIE 18°C
                        </span>
                        <strong style={{ fontSize: '0.92rem', color: '#ffffff' }}>Transport Climatizat Dedicat</strong>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px', display: 'block' }}>
                        Flotă izotermă proprie, senzor anti-șoc 0.02G și urmărire GPS în timp real.
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="btn-checkout-toggle-climate-map"
                    onClick={() => setShowClimateMapDrawer(!showClimateMapDrawer)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      border: '1px solid #38bdf8',
                      color: '#38bdf8',
                      background: showClimateMapDrawer ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                      borderRadius: '12px',
                      padding: '8px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <ThermometerGaugeIcon size={14} color="#38bdf8" />
                    <span>{showClimateMapDrawer ? 'Ascunde Simulatorul GPS' : 'Vezi Simulatorul Traseu Live'}</span>
                  </button>
                </div>

                {showClimateMapDrawer && (
                  <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px' }}>
                    <ClimateDeliveryMapSimulator 
                      embedded={true}
                      orderId="COMANDĂ-NOUĂ"
                      recipientName={recipientName || 'Persoana Iubită'}
                      recipientAddress={recipientAddress || 'București (Sector Selectat)'}
                    />
                  </div>
                )}
              </div>

              {/* Date & Slot selection (when scheduled) */}
              {deliveryType === 'scheduled' && (
                <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <Calendar size={15} color="#3b82f6" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase' }}>
                      Alege Ziua & Fereastra de Livrare
                    </span>
                  </div>

                  {/* Quick Occasion Chips */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {[
                      { label: 'Peste 2 Zile', Icon: CakeIcon, days: 2 },
                      { label: 'Acest Weekend', Icon: PartyIcon, days: 4 },
                      { label: 'Peste 1 Săptămână', Icon: Heart, days: 7 },
                    ].map((chip, idx) => {
                      const ChipIcon = chip.Icon;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            const target = new Date();
                            target.setDate(target.getDate() + chip.days);
                            setDeliveryDate(target.toISOString().split('T')[0]);
                          }}
                          className="btn btn-sm btn-secondary"
                          style={{ fontSize: '0.72rem', padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                        >
                          <ChipIcon size={12} color="var(--rose-600)" />
                          <span>{chip.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label htmlFor="input-delivery-date" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Data Evenimentului
                      </label>
                      <input 
                        id="input-delivery-date"
                        name="deliveryDate"
                        type="date" 
                        required 
                        value={deliveryDate} 
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--border-light)', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label htmlFor="select-time-slot" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Slot Orar Preferat
                      </label>
                      <select 
                        id="select-time-slot"
                        name="timeSlot"
                        value={timeSlot} 
                        onChange={(e) => setTimeSlot(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--border-light)', outline: 'none', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                      >
                        <option value="10:00 - 14:00">Dimineața (10:00 - 14:00)</option>
                        <option value="14:00 - 18:00">După-amiaza (14:00 - 18:00)</option>
                        <option value="18:00 - 21:00">Seara Romantică (18:00 - 21:00)</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo Confirmation on WhatsApp Checkbox */}
                  <label htmlFor="checkbox-notify-morning" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', cursor: 'pointer' }}>
                    <input
                      id="checkbox-notify-morning"
                      name="notifyOnMorning"
                      type="checkbox"
                      checked={notifyOnMorning}
                      onChange={(e) => setNotifyOnMorning(e.target.checked)}
                      style={{ accentColor: '#2563eb', width: '15px', height: '15px' }}
                    />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Camera size={14} color="#2563eb" />
                      <span>Trimite-mi o fotografie cu buchetul pe WhatsApp înainte de plecarea curierului</span>
                    </span>
                  </label>
                </div>
              )}

              {/* Exact Address Field */}
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="input-recipient-address" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Adresă Exactă Livrare (Oraș, Stradă, Număr, Bloc/Apartament, Interfon)
                </label>
                <input 
                  id="input-recipient-address"
                  name="recipientAddress"
                  type="text" 
                  required 
                  placeholder="Ex: Str. Nicolae Caramfil 22, Bl. 14, Sc. B, Ap. 28, Interfon 28" 
                  value={recipientAddress} 
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none' }}
                />
              </div>

              {/* Enhanced Anonymous Surprise Delivery Section (Task 44) */}
              <div 
                id="checkout-anonymous-delivery-section"
                style={{
                  background: isSecretDelivery 
                    ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.08) 0%, rgba(219, 39, 119, 0.08) 100%)' 
                    : 'var(--bg-subtle)',
                  border: isSecretDelivery ? '1.5px solid #a855f7' : '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  transition: 'all 0.3s ease',
                  boxShadow: isSecretDelivery ? '0 4px 16px rgba(168, 85, 247, 0.15)' : 'none'
                }}
              >
                <label htmlFor="checkbox-secret-delivery" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      id="checkbox-secret-delivery"
                      name="isSecretDelivery"
                      type="checkbox" 
                      checked={isSecretDelivery} 
                      onChange={(e) => setIsSecretDelivery(e.target.checked)} 
                      style={{ accentColor: '#9333ea', width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: isSecretDelivery ? '#7e22ce' : 'var(--text-main)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <SecretMaskIcon size={16} color="#9333ea" />
                        <span>Livrare Surpriză 100% Anonimă (Expeditor Secret)</span>
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>
                        Curierul nu dezvăluie identitatea ta, iar AWB-ul nu conține numele tău
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', background: isSecretDelivery ? '#9333ea' : '#e2e8f0', color: isSecretDelivery ? '#fff' : '#475569', padding: '3px 8px', borderRadius: '10px', fontWeight: 800 }}>
                    {isSecretDelivery ? 'ACTIVAT (CONFIDENȚIAL)' : 'OPȚIONAL'}
                  </span>
                </label>

                {isSecretDelivery && (
                  <div id="checkout-secret-delivery-card" style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px dashed rgba(168, 85, 247, 0.3)' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <label htmlFor="select-secret-hint" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7e22ce', display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                        <SecretMaskIcon size={13} color="#7e22ce" />
                        <span>Alege Indiciul Misterios de pe Felicitare:</span>
                      </label>
                      <select
                        id="select-secret-hint"
                        name="secretHint"
                        value={secretHint}
                        onChange={(e) => setSecretHint(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1.5px solid #c084fc',
                          outline: 'none',
                          background: 'var(--bg-card)',
                          color: 'var(--text-main)',
                          fontSize: '0.88rem',
                          fontWeight: 600
                        }}
                      >
                        <option value="De la un admirator secret">„De la un admirator secret”</option>
                        <option value="Ghicește cine sunt...">„Ghicește cine sunt...”</option>
                        <option value="Cu dragoste sinceră și secretă">„Cu dragoste sinceră și secretă”</option>
                        <option value="Un suflet drag care se gândește la tine">„Un suflet drag care se gândește la tine”</option>
                        <option value="Surpriză anonimă — secretul rămâne între noi">„Surpriză anonimă — secretul rămâne între noi”</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.74rem', color: '#6b21a8' }}>
                      <div style={{ background: 'rgba(255,255,255,0.7)', padding: '6px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldCheck size={13} />
                        <span>AWB fără date expeditor</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.7)', padding: '6px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Smartphone size={13} />
                        <span>Alerte SMS doar la tine</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.7)', padding: '6px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={13} />
                        <span>Curier instruit confidențial</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Contact & Live Video QR Greeting Card Generator (Task 44) */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>4</span>
                <h3 style={{ fontSize: '1.3rem' }}>Date Contact & Felicitare Video QR</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label htmlFor="input-sender-name" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Numele Tău (Expeditor)</label>
                  <input 
                    id="input-sender-name"
                    name="senderName"
                    type="text" 
                    required 
                    placeholder="Ex: Andrei Radu" 
                    value={senderName} 
                    onChange={(e) => setSenderName(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label htmlFor="input-sender-phone" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Telefonul Tău (WhatsApp)</label>
                  <input 
                    id="input-sender-phone"
                    name="senderPhone"
                    type="tel" 
                    required 
                    placeholder="07xx xxx xxx" 
                    value={senderPhone} 
                    onChange={(e) => setSenderPhone(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="input-recipient-name" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Numele Destinatarului (Persoana care primește florile)</label>
                <input 
                  id="input-recipient-name"
                  name="recipientName"
                  type="text" 
                  placeholder="Ex: Elena (lăsați liber dacă este pentru dvs.)" 
                  value={recipientName} 
                  onChange={(e) => setRecipientName(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none' }}
                />
              </div>

              {/* LIVE VIDEO QR GREETING CARD GENERATOR (Task 44) */}
              <div 
                id="checkout-video-qr-generator"
                style={{
                  background: 'linear-gradient(135deg, #18090d 0%, #0d0407 100%)',
                  border: '1.5px solid #f59e0b',
                  borderRadius: '18px',
                  padding: '22px',
                  color: '#ffffff',
                  marginBottom: '22px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                      <QrCode size={22} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '1.05rem', color: '#fef08a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>Felicitare Tipărită cu Cod QR Video</span>
                        <Sparkles size={14} color="#f59e0b" />
                      </strong>
                      <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>
                        Transformă orice video într-un cod QR laser tipărit pe carton manual 300g/m²
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.74rem', background: '#16a34a', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontWeight: 800 }}>
                      INCLUS GRATUIT (0 RON)
                    </span>
                    <label htmlFor="toggle-video-qr" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '6px', fontSize: '0.78rem', color: '#fde047' }}>
                      <input 
                        id="toggle-video-qr"
                        name="videoQrEnabled"
                        type="checkbox" 
                        checked={videoQrEnabled} 
                        onChange={(e) => setVideoQrEnabled(e.target.checked)} 
                        style={{ accentColor: '#f59e0b', width: '16px', height: '16px' }}
                      />
                      <span>Activează QR</span>
                    </label>
                  </div>
                </div>

                {videoQrEnabled && (
                  <div>
                    {/* Video URL Input */}
                    <div style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label htmlFor="input-video-qr-url" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fef08a', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <Video size={14} color="#f59e0b" />
                          <span>Link Video (YouTube, TikTok, Loom, Vimeo, Google Drive sau Video Personal):</span>
                        </label>
                        <span 
                          style={{ 
                            fontSize: '0.72rem', 
                            padding: '2px 8px', 
                            borderRadius: '6px', 
                            background: getVideoPlatform(videoQrUrl).color, 
                            color: '#fff', 
                            fontWeight: 800 
                          }}
                        >
                          {getVideoPlatform(videoQrUrl).badge}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          id="input-video-qr-url"
                          name="videoQrUrl"
                          type="url" 
                          placeholder="Ex: https://youtu.be/... sau https://www.tiktok.com/@user/video/..." 
                          value={videoQrUrl} 
                          onChange={(e) => setVideoQrUrl(e.target.value)}
                          style={{
                            flex: 1,
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(245, 158, 11, 0.4)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#ffffff',
                            fontSize: '0.88rem',
                            outline: 'none'
                          }}
                        />
                        <button
                          type="button"
                          id="btn-preview-video-qr"
                          onClick={() => {
                            playWaxSealBreakSound();
                            setTestPinUnlocked(!videoQrUsePin);
                            setTestPinInput(videoQrPin);
                            setVideoTestModalOpen(true);
                          }}
                          className="btn btn-gold btn-sm"
                          style={{ padding: '8px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Play size={14} />
                          <span>Testează Redare</span>
                        </button>
                      </div>

                      {/* Quick platform suggestions */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                        <button 
                          type="button" 
                          onClick={() => setVideoQrUrl('https://youtu.be/dQw4w9WgXcQ')} 
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.7rem', padding: '3px 8px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Play size={11} color="#ef4444" />
                          <span>Demo YouTube</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setVideoQrUrl('https://www.tiktok.com/@stardust.florals/video/73429182')} 
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.7rem', padding: '3px 8px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid #94a3b8', color: '#cbd5e1', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Video size={11} color="#cbd5e1" />
                          <span>Demo TikTok</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setVideoQrUrl('https://www.loom.com/share/stardust-romance-greeting-hd')} 
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.7rem', padding: '3px 8px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid #8b5cf6', color: '#d8b4fe', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Video size={11} color="#d8b4fe" />
                          <span>Demo Loom</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setVideoQrUrl('https://drive.google.com/file/d/1vIdEoStardustRomance/view')} 
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.7rem', padding: '3px 8px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <ExternalLink size={11} color="#6ee7b7" />
                          <span>Demo Google Drive</span>
                        </button>
                      </div>
                    </div>

                    {/* Interactive Greeting Card & Live SVG QR Code Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px', alignItems: 'center' }}>
                      {/* Live SVG QR Code */}
                      <div 
                        id="checkout-live-qr-preview"
                        style={{
                          background: cardTheme === 'noir' ? '#0a0a0c' : cardTheme === 'rose' ? '#fff1f2' : '#ffffff',
                          borderRadius: '12px',
                          padding: '10px',
                          textAlign: 'center',
                          border: '2px solid #f59e0b',
                          boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
                          color: cardTheme === 'noir' ? '#fde047' : '#881337'
                        }}
                      >
                        <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: 'block', margin: '0 auto', maxHeight: '110px' }}>
                          <rect width="100" height="100" fill={cardTheme === 'noir' ? '#000000' : '#ffffff'} rx="4" />
                          {/* Corner Finder Patterns */}
                          <rect x="6" y="6" width="24" height="24" fill="#e11d48" rx="3" />
                          <rect x="10" y="10" width="16" height="16" fill="#ffffff" rx="2" />
                          <rect x="14" y="14" width="8" height="8" fill="#e11d48" rx="1" />

                          <rect x="70" y="6" width="24" height="24" fill="#e11d48" rx="3" />
                          <rect x="74" y="10" width="16" height="16" fill="#ffffff" rx="2" />
                          <rect x="78" y="14" width="8" height="8" fill="#e11d48" rx="1" />

                          <rect x="6" y="70" width="24" height="24" fill="#e11d48" rx="3" />
                          <rect x="10" y="74" width="16" height="16" fill="#ffffff" rx="2" />
                          <rect x="14" y="78" width="8" height="8" fill="#e11d48" rx="1" />

                          {/* Data Matrix Dots */}
                          <circle cx="38" cy="18" r="3" fill="#f59e0b" />
                          <circle cx="48" cy="12" r="2.5" fill="#e11d48" />
                          <circle cx="58" cy="18" r="3" fill="#f59e0b" />
                          <circle cx="18" cy="38" r="3" fill="#f59e0b" />
                          <circle cx="12" cy="48" r="2.5" fill="#e11d48" />
                          <circle cx="18" cy="58" r="3" fill="#f59e0b" />

                          <circle cx="36" cy="36" r="2" fill="#881337" />
                          <circle cx="44" cy="40" r="2" fill="#f59e0b" />
                          <circle cx="64" cy="36" r="2.5" fill="#e11d48" />
                          <circle cx="72" cy="44" r="2" fill="#881337" />
                          <circle cx="40" cy="64" r="2.5" fill="#f59e0b" />
                          <circle cx="48" cy="72" r="2" fill="#e11d48" />
                          <circle cx="68" cy="68" r="3" fill="#e11d48" />
                          <circle cx="82" cy="82" r="3" fill="#f59e0b" />

                          {/* Center Ruby Gem / Flower Emblem */}
                          <rect x="42" y="42" width="16" height="16" fill="#881337" rx="3" />
                          <polygon points="50,45 55,49 55,53 50,56 45,53 45,49" fill="#fde047" stroke="#fbbf24" strokeWidth="0.6" />
                        </svg>
                        <div style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.5px' }}>
                          SCANEAZĂ & REDĂ
                        </div>
                      </div>

                      {/* Card Customization Options */}
                      <div>
                        {/* Theme Chips */}
                        <div style={{ marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                            Design Carton Felicitare:
                          </span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {[
                              { id: 'ivory', label: 'Ivory Clasic', Icon: QuillIcon },
                              { id: 'noir', label: 'Noir Onyx', Icon: DiamondIcon },
                              { id: 'rose', label: 'Roz Romantique', Icon: RoseIcon }
                            ].map(theme => (
                              <button
                                key={theme.id}
                                type="button"
                                onClick={() => setCardTheme(theme.id)}
                                style={{
                                  fontSize: '0.72rem',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  border: cardTheme === theme.id ? '1.5px solid #f59e0b' : '1px solid rgba(255,255,255,0.2)',
                                  background: cardTheme === theme.id ? '#f59e0b' : 'rgba(255,255,255,0.05)',
                                  color: cardTheme === theme.id ? '#000' : '#fff',
                                  fontWeight: cardTheme === theme.id ? 800 : 500,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px'
                                }}
                              >
                                <theme.Icon size={12} color={cardTheme === theme.id ? '#000' : '#f59e0b'} />
                                <span>{theme.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* PIN Security Toggle */}
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <label htmlFor="checkbox-video-pin" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#fef08a' }}>
                              <Lock size={13} color="#f59e0b" />
                              <span>Protecție PIN Secret pentru Redare Video</span>
                            </div>
                            <input 
                              id="checkbox-video-pin"
                              name="videoQrUsePin"
                              type="checkbox" 
                              checked={videoQrUsePin} 
                              onChange={(e) => setVideoQrUsePin(e.target.checked)} 
                              style={{ accentColor: '#f59e0b', width: '15px', height: '15px' }}
                            />
                          </label>

                          {videoQrUsePin && (
                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Cod PIN din 4 cifre:</span>
                              <input 
                                id="input-video-pin"
                                name="videoQrPin"
                                type="text" 
                                maxLength={4} 
                                value={videoQrPin} 
                                onChange={(e) => setVideoQrPin(e.target.value.replace(/\D/g, ''))}
                                style={{
                                  width: '65px',
                                  textAlign: 'center',
                                  padding: '4px 6px',
                                  borderRadius: '6px',
                                  border: '1px solid #f59e0b',
                                  background: '#000',
                                  color: '#fef08a',
                                  fontWeight: 800,
                                  fontSize: '0.85rem',
                                  letterSpacing: '2px',
                                  outline: 'none'
                                }}
                              />
                              <span style={{ fontSize: '0.68rem', color: '#f59e0b' }}>
                                (Doar cine are PIN-ul vede videoclipul)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="textarea-card-message" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Mesaj Tipărit pe Felicitare (Text Caligrafic):
                </label>
                <textarea 
                  id="textarea-card-message"
                  name="cardMessage"
                  rows={3} 
                  placeholder="Scrie aici mesajul romantic care va fi caligrafiat pe felicitarea de lux..." 
                  value={cardMessage} 
                  onChange={(e) => setCardMessage(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', fontFamily: 'inherit' }}
                />

                {/* Quick Inspiration Pills */}
                <div style={{ marginTop: '10px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <SparkleIcon size={12} color="var(--rose-600)" />
                    <span>Sau alege o urare gata redactată:</span>
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setCardMessage('Ești cea mai frumoasă floare din viața mea. Te iubesc mai mult cu fiecare zi!')}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.76rem', padding: '5px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Heart size={13} color="#e11d48" style={{ fill: '#e11d48' }} />
                      <span>Te Iubesc</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardMessage('Vrei să facem fiecare zi din viața noastră la fel de strălucitoare ca acești trandafiri? Vrei să fii soția mea?')}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.76rem', padding: '5px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <RingIcon size={13} color="#f59e0b" />
                      <span>Cerere Căsătorie</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardMessage('La mulți ani, minunea mea! Îți mulțumesc pentru fiecare zâmbet pe care îl aduci în viața mea.')}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.76rem', padding: '5px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <PartyIcon size={13} color="#8b5cf6" />
                      <span>La Mulți Ani</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardMessage('Nu aveam nevoie de o ocazie specială ca să-ți amintesc cât de mult însemni pentru mine. Strălucești!')}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.76rem', padding: '5px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <SparkleIcon size={13} color="#f59e0b" />
                      <span>Meriți Tot</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Gratitude Tip Jar (Task 40) */}
            <div id="checkout-step-5-tip-jar" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--rose-50)', color: 'var(--rose-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>5</span>
                <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Apreciere Meșteșug Manual Florar</span>
                  <span style={{ fontSize: '0.74rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>OPȚIONAL</span>
                </h3>
              </div>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
                Fiecare trandafir este ales, deschis și pudrat manual cu pulbere de diamant de un maestru florar în atelier. 
                Dacă dorești să-i transmiți o apreciere caldă sau o cafea pentru munca depusă:
              </p>

              {/* Tip options buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                {TIP_OPTIONS.map((tip) => (
                  <button
                    key={tip.id}
                    id={`btn-tip-${tip.id}`}
                    type="button"
                    onClick={() => handleSelectTip(tip)}
                    style={{
                      background: selectedTipId === tip.id ? 'var(--rose-600)' : 'var(--bg-surface)',
                      color: selectedTipId === tip.id ? '#ffffff' : 'var(--text-main)',
                      border: selectedTipId === tip.id ? '1.5px solid #be123c' : '1.5px solid var(--border-light)',
                      borderRadius: '16px',
                      padding: '12px 10px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: selectedTipId === tip.id ? '0 4px 14px rgba(225, 29, 72, 0.35)' : 'none'
                    }}
                  >
                    {tip.Icon && <tip.Icon size={18} color={selectedTipId === tip.id ? '#ffffff' : 'var(--rose-600)'} />}
                    <span style={{ fontSize: '0.86rem', fontWeight: 800 }}>{tip.label}</span>
                    <span style={{ fontSize: '0.74rem', opacity: selectedTipId === tip.id ? 0.9 : 0.65 }}>{tip.sub}</span>
                  </button>
                ))}
              </div>

              {/* Custom tip input if selected */}
              {selectedTipId === 'custom' && (
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-subtle)', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                  <label htmlFor="input-custom-tip" style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Introdu suma ({currency}):
                  </label>
                  <input
                    id="input-custom-tip"
                    type="number"
                    min="1"
                    max="500"
                    placeholder="Ex: 25"
                    value={customTipInput}
                    onChange={handleCustomTipChange}
                    style={{ width: '120px', padding: '8px 12px', borderRadius: '10px', border: '1.5px solid var(--border-light)', outline: 'none', fontWeight: 700, fontSize: '0.92rem', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                  />
                </div>
              )}

              {/* Florist Heartfelt Acknowledgement Box */}
              {tipAmount > 0 && (
                <div 
                  id="florist-gratitude-banner"
                  style={{
                    background: 'linear-gradient(135deg, var(--rose-50), var(--bg-subtle))',
                    border: '1.5px solid var(--border-light)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    boxShadow: '0 4px 16px rgba(225, 29, 72, 0.08)'
                  }}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--rose-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)' }}>
                    <RoseIcon size={22} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--rose-600)' }}>Florar Maestru Stardust</strong>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#16a34a', color: '#fff', padding: '2px 8px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <SparkleIcon size={11} color="#ffffff" />
                        <span>Atenție Maximă la Detalii</span>
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.45, fontStyle: 'italic' }}>
                      „Vă mulțumesc din suflet pentru apreciere! Voi pudra cu grijă deosebită fiecare petală cu sclipici diamant și mă voi asigura personal că buchetul dumneavoastră arată desăvârșit!”
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Summary & Checkout */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '30px', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                Sumar Comandă
              </h3>

              <div style={{ background: 'var(--rose-50)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '10px 14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--rose-600)', fontWeight: 700 }}>
                <Flame size={15} color="#e11d48" style={{ flexShrink: 0 }} />
                <span>ATELIER: Numai 3 buchete mai pot fi onorate pentru livrare astăzi!</span>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '18px' }}>
                <img 
                  src={currentBouquet.image} 
                  alt={currentBouquet.name} 
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border-light)' }} 
                />
                <div>
                  <strong style={{ fontSize: '1rem', display: 'block' }}>{currentBouquet.name}</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{selectedColor}</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--rose-600)', marginTop: '2px' }}>{formatPrice(currentBouquet.price)}</div>
                </div>
              </div>

              {selectedAddons.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Extra Adăugate:</span>
                  {selectedAddons.map((id) => {
                    const item = ADDONS.find((a) => a.id === id);
                    if (!item) return null;
                    let price = item.price;
                    if (id === 'pandantiv-capsula-diamant-cosmic' && cosmicLocketConfig && cosmicLocketConfig.totalPrice !== undefined) {
                      price = cosmicLocketConfig.totalPrice;
                    } else if (id === 'efect-fum-cascada-dry-ice' && smokeCascadeConfig && smokeCascadeConfig.totalPrice !== undefined) {
                      price = smokeCascadeConfig.totalPrice;
                    } else if (id === 'cutie-secret-sertar-glisant' && secretDrawerConfig && secretDrawerConfig.totalPrice !== undefined) {
                      price = secretDrawerConfig.totalPrice;
                    } else if (id === 'felicitare-holografica-3d' && holoCardConfig && holoCardConfig.totalPrice !== undefined) {
                      price = holoCardConfig.totalPrice;
                    } else if (id === 'medalion-ceramic-parfum' && aromaMedallionConfig && aromaMedallionConfig.totalPrice !== undefined) {
                      price = aromaMedallionConfig.totalPrice;
                    } else if (id === 'kit-ingrijire-longevitate' && careKitConfig && careKitConfig.totalPrice !== undefined) {
                      price = careKitConfig.totalPrice;
                    } else if (id === 'gravura-laser-petala' && petalLaserConfig && petalLaserConfig.totalPrice !== undefined) {
                      price = petalLaserConfig.totalPrice;
                    } else if (id === 'pachet-gourmet-moet-capsuni' && gourmetConfig && gourmetConfig.totalPrice !== undefined) {
                      price = gourmetConfig.totalPrice;
                    } else if (id === 'gravura-audio-spectrograma' && audioEngravingConfig && audioEngravingConfig.totalPrice !== undefined) {
                      price = audioEngravingConfig.totalPrice;
                    } else if (id === 'felicitare-popup-3d-petale' && popUpCardConfig && popUpCardConfig.totalPrice !== undefined) {
                      price = popUpCardConfig.totalPrice;
                    } else if (id === 'cutie-muzicala-mecanica' && musicBoxConfig && musicBoxConfig.totalPrice !== undefined) {
                      price = musicBoxConfig.totalPrice;
                    } else if (id === 'royal-unboxing-experience' && unboxingConfig && unboxingConfig.totalPrice !== undefined) {
                      price = unboxingConfig.totalPrice;
                    }
                    return (
                      <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                        <span>{item.name}</span>
                        <strong>+{formatPrice(price)}</strong>
                      </div>
                    );
                  })}
                  {selectedAddons.includes('pandantiv-capsula-diamant-cosmic') && (
                    <div style={{ marginTop: '8px', background: 'rgba(244, 63, 94, 0.1)', border: '1px dashed rgba(244, 63, 94, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48' }}>
                        <CosmicLocketIcon size={13} color="#e11d48" />
                        <span>Pandantiv Hermetic & Pulbere Diamant Cosmic:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: '#be123c', display: 'block', marginTop: '2px' }}>
                        {cosmicLocketConfig?.metalName?.split('(')[0]} • {cosmicLocketConfig?.dustName?.split('(')[0]}
                      </span>
                      <span style={{ fontStyle: 'italic', fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                        Siluetă: {cosmicLocketConfig?.shapeName?.split('(')[0]} • Gravură: „{cosmicLocketConfig?.secretMessage}”
                      </span>
                    </div>
                  )}
                  {selectedAddons.includes('efect-fum-cascada-dry-ice') && (
                    <div style={{ marginTop: '8px', background: 'rgba(244, 63, 94, 0.1)', border: '1px dashed rgba(244, 63, 94, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48' }}>
                        <SmokeCascadeIcon size={13} color="#e11d48" />
                        <span>Efect Teatral „Smoke & Dry Ice Cascade”:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: '#be123c', display: 'block', marginTop: '2px' }}>
                        {smokeCascadeConfig?.lightingName?.split('(')[0]} • {smokeCascadeConfig?.aromaName?.split('(')[0]}
                      </span>
                      <span style={{ fontStyle: 'italic', fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                        {smokeCascadeConfig?.triggerName?.split('(')[0]} • {smokeCascadeConfig?.durationName?.split('(')[0]}
                      </span>
                    </div>
                  )}
                  {selectedAddons.includes('cutie-secret-sertar-glisant') && (
                    <div style={{ marginTop: '8px', background: 'rgba(244, 63, 94, 0.1)', border: '1px dashed rgba(244, 63, 94, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48' }}>
                        <SecretDrawerIcon size={13} color="#e11d48" />
                        <span>Cutie Secretă cu Sertar Glisant & Bijuterie:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: '#be123c', display: 'block', marginTop: '2px' }}>
                        {secretDrawerConfig?.contentName?.split('(')[0]} • {secretDrawerConfig?.velvetName}
                      </span>
                      <span style={{ fontStyle: 'italic', fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                        Plăcuță: „{secretDrawerConfig?.secretMessage || 'Vrei să fii soția mea?'}” • [{secretDrawerConfig?.monogramInitials || 'A & E'}]
                      </span>
                    </div>
                  )}
                  {selectedAddons.includes('felicitare-holografica-3d') && (
                    <div style={{ marginTop: '8px', background: 'rgba(168, 85, 247, 0.1)', border: '1px dashed rgba(168, 85, 247, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#9333ea' }}>
                        <HolographicPrismIcon size={13} color="#9333ea" />
                        <span>Felicitare Holografică 3D (Folie Lenticulară):</span>
                      </span>
                      <span style={{ fontWeight: 700, color: '#7e22ce', display: 'block', marginTop: '2px' }}>
                        {holoCardConfig?.themeName || 'Constelația Iubirii'} • {holoCardConfig?.foilName || 'Curcubeu Prismatic'}
                      </span>
                      <span style={{ fontStyle: 'italic', fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                        „{holoCardConfig?.customDedication || 'Pentru sufletul meu drag'}” ({holoCardConfig?.recipientName || 'Elena'})
                      </span>
                    </div>
                  )}
                  {selectedAddons.includes('medalion-ceramic-parfum') && (
                    <div style={{ marginTop: '8px', background: 'rgba(2, 132, 199, 0.1)', border: '1px dashed rgba(2, 132, 199, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7' }}>
                        <CeramicMedallionIcon size={13} color="#0284c7" />
                        <span>Medalion Ceramic Difuzor de Parfum:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: '#0369a1' }}>
                        {aromaMedallionConfig?.essenceName || 'Rosa Damascena de Grasse'} ({aromaMedallionConfig?.levelLabel || 'Boudoir Regal'} • ~{aromaMedallionConfig?.diffusionDays || 30} Zile difuzie)
                      </span>
                    </div>
                  )}
                  {selectedAddons.includes('kit-ingrijire-longevitate') && (
                    <div style={{ marginTop: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px dashed rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                        <FlowerCareKitIcon size={13} color="#059669" />
                        <span>Kit Îngrijire & Nutrienți Longevitate:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: '#047857' }}>
                        {careKitConfig?.kitName || 'Kit Nutrienți Chrysal & Ghid Longevitate'} (~{careKitConfig?.predictedDays || 14} {careKitConfig?.flowerType === 'preserved' ? 'Ani' : 'Zile'} prospețime)
                      </span>
                    </div>
                  )}
                  {selectedAddons.includes('gravura-laser-petala') && (
                    <div style={{ marginTop: '8px', background: 'rgba(225, 29, 72, 0.1)', border: '1px dashed rgba(225, 29, 72, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48' }}>
                        <LaserPetalEngraverIcon size={13} color="#e11d48" />
                        <span>Gravură Laser pe Petală Naturală Stabilizată:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--rose-600)' }}>
                        {petalLaserConfig?.foilName || 'Pulbere de Aur 24K Topită'} • {petalLaserConfig?.styleName || 'Caligrafie Regală Cursivă'}
                      </span>
                      {petalLaserConfig?.text && (
                        <div style={{ fontStyle: 'italic', color: '#b45309', fontSize: '0.74rem', marginTop: '2px' }}>
                          Mesaj secret: „{petalLaserConfig.text}” ({petalLaserConfig?.colorName || 'Rouge Impérial'})
                        </div>
                      )}
                    </div>
                  )}
                  {selectedAddons.includes('royal-unboxing-experience') && (
                    <div style={{ marginTop: '8px', background: 'rgba(225, 29, 72, 0.1)', border: '1px dashed rgba(225, 29, 72, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48' }}>
                        <UnboxingVaultIcon size={13} color="#e11d48" />
                        <span>Experiență Regală de Despachetare (4 Straturi):</span>
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--rose-600)' }}>
                        {unboxingConfig?.themeName || 'Noir Onyx & Aur 24K'} • {unboxingConfig?.scentName || 'Trandafir Pur de Damasc'}
                      </span>
                      {unboxingConfig?.ribbonText && (
                        <div style={{ fontStyle: 'italic', color: '#b45309', fontSize: '0.74rem', marginTop: '2px' }}>
                          Panglică satinată brodată: „{unboxingConfig.ribbonText}”
                        </div>
                      )}
                    </div>
                  )}
                  {selectedAddons.includes('cutie-muzicala-mecanica') && (
                    <div style={{ marginTop: '8px', background: 'rgba(245, 158, 11, 0.12)', border: '1px dashed rgba(245, 158, 11, 0.5)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#b45309' }}>
                        <MusicBoxCrankIcon size={13} color="#b45309" />
                        <span>Cutie Muzicală Mecanică (Bază Aranjament):</span>
                      </span>
                      <span style={{ fontWeight: 700, color: '#f59e0b' }}>
                        {musicBoxConfig?.melodyTitle || 'La Vie En Rose'} • {musicBoxConfig?.finishName?.split('(')[0] || 'Mecanism Elvețian'}
                      </span>
                      {musicBoxConfig?.engravedText && (
                        <div style={{ fontStyle: 'italic', color: '#b45309', fontSize: '0.74rem', marginTop: '2px' }}>
                          Placă gravată: „{musicBoxConfig.engravedText}” ({musicBoxConfig?.modeName?.split('(')[0] || 'Senzor'})
                        </div>
                      )}
                    </div>
                  )}
                  {selectedAddons.includes('felicitare-popup-3d-petale') && (
                    <div style={{ marginTop: '8px', background: 'rgba(225, 29, 72, 0.1)', border: '1px dashed rgba(225, 29, 72, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48' }}>
                        <PopUpGreetingCardIcon size={13} color="#e11d48" />
                        <span>Felicitare Pop-Up 3D & Plic Sigilat:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--rose-600)' }}>
                        {popUpCardConfig?.sculpture?.name?.split('(')[0] || 'Trandafir Imperial 3D'} • {popUpCardConfig?.envelope?.name?.split('&')[0] || 'Plic Roșu Bordeaux'}
                      </span>
                      {popUpCardConfig?.recipient && (
                        <div style={{ fontStyle: 'italic', color: '#f59e0b', fontSize: '0.74rem', marginTop: '2px' }}>
                          Dedicație: „{popUpCardConfig.recipient}” • Semnătură: „{popUpCardConfig.sender || 'Andrei'}”
                        </div>
                      )}
                    </div>
                  )}
                  {selectedAddons.includes('gravura-audio-spectrograma') && (
                    <div style={{ marginTop: '8px', background: 'rgba(245, 158, 11, 0.1)', border: '1px dashed rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#b45309' }}>
                        <AudioWaveformIcon size={13} color="#b45309" />
                        <span>Gravură Audio & Spectrogramă Foiță de Aur 24K:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: '#f59e0b' }}>
                        {audioEngravingConfig?.stock?.name?.split('(')[0] || 'Carton Mat Noir Onyx'} • Monogramă: „{audioEngravingConfig?.initials || 'A & M'}”
                      </span>
                      {audioEngravingConfig?.subtitle && (
                        <div style={{ fontStyle: 'italic', color: '#92400e', fontSize: '0.74rem', marginTop: '2px' }}>
                          „{audioEngravingConfig.subtitle}” ({audioEngravingConfig?.durationSeconds || 14}s audio)
                        </div>
                      )}
                    </div>
                  )}
                  {selectedAddons.includes('pachet-gourmet-moet-capsuni') && (
                    <div style={{ marginTop: '8px', background: 'rgba(225, 29, 72, 0.1)', border: '1px dashed rgba(225, 29, 72, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48' }}>
                        <ChampagneFlutesIcon size={13} color="#e11d48" />
                        <span>Pachet Gourmet Haute Couture:</span>
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--rose-600)' }}>
                        {gourmetConfig?.champagne?.name || 'Moët & Chandon Rosé'} + {gourmetConfig?.strawberries?.pieces || 12} Căpșuni cu Aur 24K
                      </span>
                      {gourmetConfig?.message && (
                        <div style={{ fontStyle: 'italic', color: '#f59e0b', fontSize: '0.74rem', marginTop: '2px' }}>
                          Mesaj: „{gourmetConfig.message}”
                        </div>
                      )}
                    </div>
                  )}
                  {selectedAddons.includes('panglica-caligrafica') && (
                    <div style={{ marginTop: '8px', background: 'var(--bg-subtle)', border: '1px dashed var(--border-light)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--rose-600)' }}>
                        <RibbonIcon size={13} color="var(--rose-600)" />
                        <span>Text Panglică Caligrafiată:</span>
                      </span>
                      <span style={{ fontStyle: 'italic', color: 'var(--rose-600)', fontWeight: 600 }}>„{ribbonConfig.text}”</span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {ribbonConfig.fabricName} • {ribbonConfig.foilName}
                      </div>
                    </div>
                  )}
                  {selectedAddons.includes('cutie-catifea-gravata') && (
                    <div style={{ marginTop: '8px', background: 'rgba(234, 179, 8, 0.1)', border: '1px dashed rgba(234, 179, 8, 0.4)', borderRadius: '10px', padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                      <span style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24' }}>
                        <CrownIcon size={13} color="#fbbf24" />
                        <span>Plăcuță Metalică Gravată Laser:</span>
                      </span>
                      <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, color: '#fbbf24' }}>{boxConfig.line1} • {boxConfig.line2}</span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {boxConfig.shapeName} • {boxConfig.metalName}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Coupon Field */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    id="input-coupon-code"
                    name="couponCode"
                    aria-label="Cod de reducere"
                    type="text" 
                    placeholder="Cod reducere (ex: STARDUST10)" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value)} 
                    style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.85rem', textTransform: 'uppercase', outline: 'none' }}
                  />
                  <button 
                    type="button" 
                    onClick={applyCoupon} 
                    className="btn btn-secondary btn-sm"
                  >
                    Aplică
                  </button>
                </div>
                {discountApplied && (
                  <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                    <CheckCircle2 size={13} color="#16a34a" />
                    <span>{discountPercent}% Reducere aplicată cu succes! (-{formatPrice(couponDiscountAmount)})</span>
                  </span>
                )}
              </div>

              {/* Final Totals */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {bundleDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px', color: '#059669', fontWeight: 700 }}>
                    <span>Reducere Pachet Cadou ({selectedAddons.length} extra):</span>
                    <span>-{formatPrice(bundleDiscount)}</span>
                  </div>
                )}
                {discountApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px', color: '#16a34a' }}>
                    <span>Reducere Cupon ({discountPercent}%):</span>
                    <span>-{formatPrice(couponDiscountAmount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  <span>Felicitare QR Video:</span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>GRATUIT (0 {currency})</span>
                </div>
                <div id="summary-fragrance-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <PerfumeBottleIcon size={13} color="#db2777" />
                    <span>Parfum Ambalaj Atelier ({selectedFragrance?.name ? selectedFragrance.name.split('&')[0].trim() : 'Trandafir Damascen'}):</span>
                  </span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>GRATUIT (0 {currency})</span>
                </div>
                <div id="summary-love-letter-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <ParchmentScrollIcon size={13} color="#92400e" />
                    <span>Scrisoare Pergament Cerată:</span>
                  </span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>GRATUIT (0 {currency})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '14px', color: 'var(--text-muted)' }}>
                  <span>Livrare & Flotă ({zoneInfo.name.split('—')[0].trim()}):</span>
                  <span style={{ color: deliveryFee === 0 ? '#16a34a' : 'var(--text-main)', fontWeight: 700 }}>
                    {deliveryFee === 0 ? `GRATUIT (0 ${currency})` : `+${formatPrice(deliveryFee)}`}
                  </span>
                </div>
                {tipAmount > 0 && (
                  <div id="summary-tip-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '12px', color: 'var(--rose-600)', fontWeight: 700 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Coffee size={15} /> Apreciere Florar (Bacșiș):
                    </span>
                    <span>+{formatPrice(tipAmount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--border-light)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total de Plată:</span>
                  <strong style={{ fontSize: '2rem', color: 'var(--rose-600)', fontWeight: 800 }}>{formatPrice(finalTotal)}</strong>
                </div>

                {/* Real-Time ETA Arrival Pill */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '9px 12px', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#1e293b' }}>
                  <Clock size={15} color="#e11d48" style={{ flexShrink: 0 }} />
                  <span><strong>Sosire Estimată:</strong> {etaInfo.window}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <span>Trimite Comanda pe WhatsApp</span>
                <Send size={18} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.78rem', color: '#9f737c', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Lock size={12} /> Comandă sigură • Plată ramburs sau transfer</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Zap size={12} color="#f59e0b" /> Confirmare imediată pe WhatsApp în 2-3 minute</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Success Luxury Modal */}
      {orderModalOpen && placedOrderData && (
        <div className="modal-overlay">
          <div className="modal-content-luxury" style={{ maxWidth: '560px' }}>
            <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <CheckCircle2 size={36} />
            </div>

            <span className="tag-badge" style={{ marginBottom: '10px' }}>COMANDĂ ÎNREGISTRATĂ (# {placedOrderData.orderId})</span>
            
            <h3 style={{ fontSize: '1.9rem', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span>Comanda Ta a Fost Pregătită!</span>
              <PartyIcon size={24} color="var(--rose-600)" />
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '22px' }}>
              Apasă pe butonul de mai jos pentru a deschide WhatsApp-ul florăriei. Mesajul tău complet cu buchetul ales, culorile și felicitarea este gata redactat!
            </p>

            <div style={{ background: 'var(--rose-50)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '18px', textAlign: 'left', marginBottom: '24px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <RoseIcon size={14} color="var(--rose-600)" />
                  <span>Aranjament:</span>
                </span>
                <strong>{placedOrderData.bouquet}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Palette size={14} color="var(--rose-600)" />
                  <span>Culoare:</span>
                </span>
                <strong>{placedOrderData.color}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={14} color="var(--rose-600)" />
                  <span>Livrare:</span>
                </span>
                <strong>{placedOrderData.deliveryType}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--rose-600)" />
                  <span>Fereastră Sosire:</span>
                </span>
                <strong style={{ color: '#047857' }}>{placedOrderData.deliveryETA}</strong>
              </div>
              {placedOrderData.velvetBoxDetails && (
                <div style={{ background: 'radial-gradient(circle at 50% 0%, #200812 0%, #0c0205 100%)', border: '1.5px solid #f59e0b', borderRadius: '12px', padding: '10px 14px', marginBottom: '8px', color: '#fef08a' }}>
                  <div style={{ fontSize: '0.72rem', color: '#fde047', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CrownIcon size={13} color="#fde047" />
                    <span>CUTIE DE CATIFEA + PLĂCUȚĂ METALICĂ GRAVATĂ LASER:</span>
                  </div>
                  <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: '1.05rem', margin: '3px 0', color: '#fef08a', letterSpacing: '1px' }}>
                    {placedOrderData.velvetBoxDetails.line1} • {placedOrderData.velvetBoxDetails.line2}
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '0.78rem', color: '#fbcfe8' }}>
                    „{placedOrderData.velvetBoxDetails.line3}”
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                    {placedOrderData.velvetBoxDetails.shape} • {placedOrderData.velvetBoxDetails.color} • {placedOrderData.velvetBoxDetails.metal}
                  </div>
                </div>
              )}
              {placedOrderData.ribbonDetails && (
                <div style={{ background: '#1c1917', border: '1px solid #e11d48', borderRadius: '12px', padding: '10px 14px', marginBottom: '8px', color: '#fef08a' }}>
                  <div style={{ fontSize: '0.72rem', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <RibbonIcon size={13} color="#fda4af" />
                    <span>PANGLICĂ CALIGRAFIATĂ AURIE 24K:</span>
                  </div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.05rem', margin: '3px 0', color: '#fef08a' }}>
                    „{placedOrderData.ribbonDetails.text}”
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>
                    {placedOrderData.ribbonDetails.fabric} • {placedOrderData.ribbonDetails.foil}
                  </div>
                </div>
              )}
              {placedOrderData.videoQrDetails && (
                <div style={{ background: '#0f172a', border: '1.5px solid #f59e0b', borderRadius: '12px', padding: '10px 14px', marginBottom: '8px', color: '#fef08a' }}>
                  <div style={{ fontSize: '0.72rem', color: '#fde047', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Video size={13} color="#fde047" />
                    <span>FELICITARE TIPĂRITĂ CU COD QR VIDEO:</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, margin: '2px 0', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{placedOrderData.videoQrDetails.platform}</span>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                      {placedOrderData.videoQrDetails.usePin ? `(PIN: ${placedOrderData.videoQrDetails.pin})` : '(Acces Direct)'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', wordBreak: 'break-all' }}>
                    {placedOrderData.videoQrDetails.url}
                  </div>
                </div>
              )}
              {placedOrderData.secretDeliveryDetails && (
                <div style={{ background: '#2e1065', border: '1.5px solid #a855f7', borderRadius: '12px', padding: '10px 14px', marginBottom: '8px', color: '#f3e8ff' }}>
                  <div style={{ fontSize: '0.72rem', color: '#d8b4fe', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <SecretMaskIcon size={14} color="#d8b4fe" />
                    <span>LIVRARE SURPRIZĂ 100% ANONIMĂ:</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, margin: '2px 0' }}>
                    {placedOrderData.secretDeliveryDetails.hint}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#c084fc' }}>
                    {placedOrderData.secretDeliveryDetails.safeguard}
                  </div>
                </div>
              )}
              {placedOrderData.fragrance && (
                <div id="modal-fragrance-card" style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', borderRadius: '12px', padding: '10px 14px', marginBottom: '8px', color: '#9d174d' }}>
                  <div style={{ fontSize: '0.72rem', color: '#be185d', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PerfumeBottleIcon size={14} color="#db2777" />
                    <span>INFUZIE OLFACTIVĂ PE AMBALAJ:</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, margin: '2px 0', color: '#831843' }}>
                    {placedOrderData.fragrance}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9d174d', opacity: 0.9 }}>
                    Pulverizare artizanală cu esențe naturale de nișă inclusă gratuit în atelier.
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #fecdd3', paddingTop: '8px', marginTop: '8px' }}>
                <span style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <DiamondIcon size={14} color="var(--rose-600)" />
                  <span>Total:</span>
                </span>
                <strong style={{ color: 'var(--rose-600)', fontSize: '1.1rem' }}>{placedOrderData.total}</strong>
              </div>
            </div>

            {placedOrderData.tipAmount > 0 && (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '10px 14px', marginBottom: '18px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#047857' }}>
                <Heart size={18} color="#059669" style={{ fill: '#059669', flexShrink: 0 }} />
                <span><strong>Florarul este notificat:</strong> Îți mulțumim din suflet pentru apreciere! Comanda ta a primit atenție prioritară de atelier.</span>
              </div>
            )}

            <button onClick={handleSendWhatsapp} className="btn btn-whatsapp btn-lg" style={{ width: '100%', marginBottom: '10px' }}>
              <span>Deschide WhatsApp & Confirmă Comanda</span>
              <Send size={18} />
            </button>

            <button onClick={() => navigate(`/urmarire-comanda?id=${placedOrderData.orderId}`)} className="btn btn-primary btn-md" style={{ width: '100%', marginBottom: '10px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} />
                <span>Urmărește Traseul Comenzii în Timp Real</span>
              </span>
            </button>

            <button 
              type="button"
              id="btn-checkout-view-certificate"
              onClick={() => {
                const serial = `SF-2026-${(placedOrderData.orderId || '').replace(/[^0-9]/g, '').slice(-4) || '0849'}`;
                const data = {
                  recipientName: placedOrderData.recipientName || recipientName || 'Persoana Iubită',
                  bouquetName: placedOrderData.bouquet,
                  rosesCount: currentBouquet.rosesCount,
                  colorName: selectedColor,
                  serialNumber: serial,
                  orderId: placedOrderData.orderId,
                  orderDate: placedOrderData.date
                };
                if (onOpenCertificateModal) onOpenCertificateModal(data);
                else window.dispatchEvent(new CustomEvent('open-certificate-modal', { detail: data }));
              }} 
              className="btn btn-gold btn-md" 
              style={{ width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <ScrollDiplomaIcon size={18} color="#78350f" />
              <span>Descarcă / Printează Certificatul de Autenticitate</span>
            </button>

            {/* Post-Order UGC Review & 20% Coupon Prompt (Task 48) */}
            <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1.5px solid rgba(245, 158, 11, 0.35)', borderRadius: '16px', padding: '14px 16px', marginBottom: '12px', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CameraPlusIcon size={22} color="#f59e0b" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fef08a' }}>
                    Primește 20% reducere la primirea comenzii!
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
                    Trimite o poză de la despachetare și deblochezi instant cuponul VIP.
                  </div>
                </div>
              </div>
              <button
                type="button"
                id="btn-checkout-modal-open-review"
                onClick={() => {
                  const data = {
                    orderId: placedOrderData.orderId,
                    recipientName: placedOrderData.recipientName || recipientName,
                    bouquetName: placedOrderData.bouquet,
                    city: 'București'
                  };
                  if (onOpenReviewModal) onOpenReviewModal(data);
                  else window.dispatchEvent(new CustomEvent('open-post-order-review', { detail: data }));
                }}
                className="btn btn-secondary btn-sm"
                style={{ borderColor: '#f59e0b', color: '#fef08a', whiteSpace: 'nowrap', fontSize: '0.74rem', background: 'rgba(245, 158, 11, 0.15)' }}
              >
                Lasă Recenzie Foto
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <button 
                type="button" 
                onClick={launchLuxuryConfetti} 
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.78rem', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                <Sparkles size={13} color="#e11d48" />
                <span>Mai aruncă petale!</span>
              </button>
              <button onClick={() => navigate('/')} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem', padding: '8px' }}>
                Pagina Principală
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Video QR Test Simulator Modal (Task 44) */}
      {videoTestModalOpen && (
        <div className="modal-overlay" id="modal-video-qr-test" onClick={() => setVideoTestModalOpen(false)}>
          <div 
            className="modal-content-luxury" 
            style={{ maxWidth: '480px', background: '#0a0a0c', color: '#fff', border: '2px solid #f59e0b', padding: '28px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={20} color="#f59e0b" />
                <strong style={{ fontSize: '1.05rem', color: '#fef08a' }}>Simulator Scanare QR Felicitare</strong>
              </div>
              <button 
                type="button"
                id="btn-close-video-test-modal"
                onClick={() => setVideoTestModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px' }}
                aria-label="Închide previzualizare"
              >
                <X size={18} />
              </button>
            </div>

            {/* Simulates Destinatar Greeting Envelope */}
            <div style={{ background: cardTheme === 'noir' ? '#18090d' : cardTheme === 'rose' ? '#fff1f2' : '#ffffff', color: cardTheme === 'noir' ? '#fff' : '#000', borderRadius: '16px', padding: '18px', border: '2px solid #f59e0b', marginBottom: '18px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
              <span style={{ fontSize: '0.72rem', letterSpacing: '2px', color: '#e11d48', fontWeight: 800, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <SparkleIcon size={11} color="#e11d48" />
                <span>FELICITARE TIPĂRITĂ STARDUST</span>
                <SparkleIcon size={11} color="#e11d48" />
              </span>
              <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.15rem', margin: '10px 0', color: cardTheme === 'noir' ? '#fef08a' : '#881337' }}>
                „{cardMessage || 'Ești cea mai frumoasă floare din viața mea. Te iubesc enorm!'}”
              </div>
              <div style={{ fontSize: '0.78rem', color: cardTheme === 'noir' ? '#94a3b8' : '#64748b' }}>
                {isSecretDelivery ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <SecretMaskIcon size={12} color="inherit" />
                    <span>{secretHint}</span>
                  </span>
                ) : (
                  `Cu dragoste, ${senderName || 'Expeditor'}`
                )}
              </div>
            </div>

            {/* If PIN Protected, ask for PIN */}
            {videoQrUsePin && !testPinUnlocked ? (
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '16px', textAlign: 'center', border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: '14px' }}>
                <Lock size={28} color="#f59e0b" style={{ margin: '0 auto 8px' }} />
                <h4 style={{ fontSize: '1rem', color: '#fef08a', marginBottom: '4px' }}>Videoclip Securizat cu PIN</h4>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Introdu codul din 4 cifre pentru a debloca mesajul video secret:
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                  <input
                    id="input-simulator-pin"
                    type="text"
                    maxLength={4}
                    value={testPinInput}
                    onChange={(e) => setTestPinInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="PIN"
                    style={{ width: '100px', textAlign: 'center', padding: '8px', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '4px', borderRadius: '8px', border: '1.5px solid #f59e0b', background: '#000', color: '#fef08a' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (testPinInput === videoQrPin) {
                        playLuxuryChime();
                        setTestPinUnlocked(true);
                      } else {
                        alert(`PIN Incorect! Hint: PIN-ul setat este ${videoQrPin}`);
                      }
                    }}
                    className="btn btn-gold btn-sm"
                  >
                    Deblochează
                  </button>
                </div>
              </div>
            ) : (
              /* Simulated Video Player */
              <div style={{ background: '#000', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '14px' }}>
                <div style={{ position: 'relative', width: '100%', height: '200px', background: 'radial-gradient(circle at 50% 50%, #2a0b14, #000)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 20px rgba(225, 29, 72, 0.6)', cursor: 'pointer' }}>
                    <Play size={24} style={{ transform: 'translateX(2px)' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#fef08a', marginTop: '12px', fontWeight: 700 }}>
                    ▶ Redare Video Personalizat
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>
                    {getVideoPlatform(videoQrUrl).name}: {videoQrUrl}
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setVideoTestModalOpen(false)}
              className="btn btn-secondary btn-md"
              style={{ width: '100%' }}
            >
              Închide Simulatorul
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
