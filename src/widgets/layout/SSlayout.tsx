import React, {ReactNode, useState} from 'react';

interface SSlayoutProps {
    children: ReactNode;
}

const SSlayout: React.FC<SSlayoutProps> = ({children}) => {
    // TODO: 모바일 pc 분기 처리


    const [isMobile, setIsMobile] = useState(
        /iPhone|iPad|webOS|iPod|Android/i.test(navigator.userAgent),
    )


    /*
    * 1. pc 인지 모바일인지
    *
    * pc> side bar 형태 타입
    *
    *
    *
    * 모바일 > 상단 메뉴 or 하단 메뉴
    *
    * 2. 각각 화면 크기에 따른 전환 버튼 추가
    *
    * */


    return (
        <div
            className={' p-1 w-1'}
        >
            {children}
        </div>
    );
};

export default SSlayout;