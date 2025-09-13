import Logo from '@/assets/logo.svg'
import { LinkForm } from './LinkForm';
import { LinkList } from './LinkList';

export function Home() {
    return (
        <div className="h-dvh flex justify-center">
            <div className="flex flex-col gap-5 w-full max-w-7xl px-4 lg:px-0 items-stretch">
                <div className="mt-12 lg:mt-24 w-full flex justify-center lg:justify-start">
                    <img src={Logo} alt="Brev" className="w-24 h-6" />
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-12">
                    <LinkForm />
                    
                    <LinkList />
                </div>
            </div>
        </div>
    )
}