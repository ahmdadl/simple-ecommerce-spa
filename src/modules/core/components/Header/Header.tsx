import TopMenu from './TopMenu';

export default function Header() {
    const mainNavbarHeight = 70; // px

    return (
        <div className='sticky top-0 left-0 right-0 z-50 print:hidden'>
            <div
                className='z-10'
                style={{
                    height: `${mainNavbarHeight}px`,
                }}
            >
                <TopMenu />
            </div>
        </div>
    );
}
