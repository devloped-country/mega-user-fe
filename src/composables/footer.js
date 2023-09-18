import homeImg from '@/assets/images/home.svg';
import noticeImg from '@/assets/images/notice.svg';
import qrImg from '@/assets/images/qr.svg';
import curriculumImg from '@/assets/images/curriculum.svg';
import mypageImg from '@/assets/images/mypage.svg';

export function useFooter() {
  const info = [
    {
      img: homeImg,
      title: '홈',
      route: 'HomeView',
    },
    {
      img: noticeImg,
      title: '공지사항',
      route: 'NoticeView',
    },
    {
      img: qrImg,
      title: 'QR',
      route: 'QrReaderView',
    },
    {
      img: curriculumImg,
      title: '커리큘럼',
      route: 'CurriculumView',
    },
    {
      img: mypageImg,
      title: '마이페이지',
      route: 'MyPageView',
    },
  ];

  return { info };
}
