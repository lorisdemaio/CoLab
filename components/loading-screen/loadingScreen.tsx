import Image from "next/image";
import './loadingScreen.css';

import logo from '@/public/logo_colab.webp';

export default function LoadingScreen() {
    
    return(
        <div className="loading-container">
            <div className="loading-image">
                <Image
                    src={logo}
                    alt="logo"
                    height={150}
                    width={150}
                    decoding="async"
                />
            </div>
        </div>
    );
}