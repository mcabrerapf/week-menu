/* eslint-disable import/prefer-default-export */
import {
  FaBowlFood,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaBrain,
  FaCartShopping,
  FaClock,
  FaXmark,
  FaCopy,
  FaTrash,
  FaPencil,
  FaEye,
  FaInfo,
  FaEgg,
  FaList,
  FaRegCalendar,
  FaSliders,
  FaUtensils,
  FaMinus,
  FaUsers,
  FaPlus,
  FaFloppyDisk,
  FaShuffle,
  FaStar,
  FaCarrot,
  FaFish,
  FaAppleWhole,
  FaDrumstickBite,
  FaWineGlass,
  FaCubesStacked,
  FaEllipsis,
  FaBottleDroplet,
  FaMugHot,
  FaBowlRice,
  FaBurger,
} from 'react-icons/fa6';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'arrow-u':
      return FaArrowUp;
    case 'arrow-d':
      return FaArrowDown;
    case 'arrow-l':
      return FaArrowLeft;
    case 'arrow-r':
      return FaArrowRight;
    case 'brain':
      return FaBrain;
    case 'breakfast':
      return FaMugHot;
    case 'calendar':
      return FaRegCalendar;
    case 'cart':
      return FaCartShopping;
    case 'clock':
      return FaClock;
    case 'copy':
      return FaCopy;
    case 'close':
      return FaXmark;
    case 'dish':
      return FaBowlFood;
    case 'dinner':
      return FaBurger;
    case 'delete':
      return FaTrash;
    case 'edit':
      return FaPencil;
    case 'eye':
      return FaEye;
    case 'fish':
      return FaFish;
    case 'fruit':
      return FaAppleWhole;
    case 'ingredient':
      return FaEgg;
    case 'info':
      return FaInfo;
    case 'liquor':
      return FaWineGlass;
    case 'list':
      return FaList;
    case 'lunch':
      return FaBowlRice;
    case 'meat':
      return FaDrumstickBite;
    case 'menu':
      return FaUtensils;
    case 'minus':
      return FaMinus;
    case 'other':
      return FaEllipsis;
    case 'people':
      return FaUsers;
    case 'plus':
      return FaPlus;
    case 'sauce':
      return FaBottleDroplet;
    case 'save':
      return FaFloppyDisk;
    case 'settings':
      return FaSliders;
    case 'shuffle':
      return FaShuffle;
    case 'spice':
      return FaCubesStacked;
    case 'star':
      return FaStar;
    case 'vegetable':
      return FaCarrot;
    default:
      return FaBowlFood;
  }
};

export { getIcon };
